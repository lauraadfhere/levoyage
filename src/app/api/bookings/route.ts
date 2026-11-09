import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { isSameOriginRequest, requireViewer } from "@/lib/api-access";
import { createParseRecord, pointer, queryParse, type ParseRecord } from "@/lib/parse-tourism";
import { sendReservationAlert } from "@/lib/trip-intelligence";

export const runtime = "nodejs";
type Booking = ParseRecord & { traveler?: { objectId?: string }; property?: { objectId?: string; __type?: string }; status?: string; checkIn?: string; checkOut?: string; guests?: number; totalMinor?: number; currency?: string; paymentStatus?: string; guestName?: string; guestEmail?: string; bookingReference?: string; createdAt?: string };
type Property = ParseRecord & { name?: string; slug?: string; type?: string; status?: string; business?: { objectId?: string; __type?: string } };
const validDate = (value: unknown): value is string => {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
};
const allowedTransitions: Record<string, string[]> = { pending: ["cancelled"], quote_offered: ["cancelled"], confirmed: [], completed: [], rejected: [], cancelled: [] };

export async function GET() {
  try {
    const auth = await requireViewer();
    if ("response" in auth) return auth.response;
    const bookings = await queryParse<Booking>("Booking", { traveler: pointer("_User", auth.viewer.objectId) });
    const propertyIds = [...new Set(bookings.map((booking) => booking.property?.objectId).filter((id): id is string => Boolean(id)))];
    const properties = await Promise.all(propertyIds.map((objectId) => queryParse<Property>("Property", { objectId }, 1).then((rows) => rows[0]).catch(() => null)));
    const names = new Map(properties.filter((item): item is Property => Boolean(item)).map((property) => [property.objectId, property.name || "Accommodation"]));
    const reviews = await Promise.all(bookings.filter((booking) => booking.status === "completed").map((booking) => queryParse<ParseRecord & { status?: string }>("Review", { booking: pointer("Booking", booking.objectId), traveler: pointer("_User", auth.viewer.objectId) }, 1).then((rows) => rows[0] || null)));
    const reviewStatusByBooking = new Map(bookings.filter((booking) => booking.status === "completed").map((booking, index) => [booking.objectId, reviews[index]?.status || null]));
    return NextResponse.json({ bookings: bookings.map((booking) => ({ bookingReference: booking.bookingReference, propertyName: booking.property?.objectId ? names.get(booking.property.objectId) || "Accommodation" : "Travel experience", status: booking.status, checkIn: booking.checkIn, checkOut: booking.checkOut, guests: booking.guests, totalMinor: booking.totalMinor, currency: booking.currency, paymentStatus: booking.paymentStatus, reviewStatus: reviewStatusByBooking.get(booking.objectId) || null })) }, { headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return NextResponse.json({ error: "Could not load your reservations." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: "Request origin could not be verified." }, { status: 403 });
  try {
    const auth = await requireViewer();
    if ("response" in auth) return auth.response;
    const body = await request.json().catch(() => null) as Record<string, unknown> | null;
    const propertySlug = typeof body?.propertySlug === "string" ? body.propertySlug.trim() : "";
    const guests = Number(body?.guests);
    const checkIn = body?.checkIn;
    const checkOut = body?.checkOut;
    const guestName = typeof body?.guestName === "string" ? body.guestName.trim().slice(0, 120) : "";
    const guestEmail = typeof body?.guestEmail === "string" ? body.guestEmail.trim().toLowerCase() : "";
    if (!propertySlug || !Number.isInteger(guests) || guests < 1 || guests > 20 || !validDate(checkIn) || !validDate(checkOut) || checkOut <= checkIn || !guestName || !/^\S+@\S+\.\S+$/.test(guestEmail)) {
      return NextResponse.json({ error: "Enter a valid property, guest count, email and stay dates." }, { status: 400 });
    }
    if (checkIn < new Date().toISOString().slice(0, 10)) return NextResponse.json({ error: "Check-in must be today or a future date." }, { status: 400 });
    const property = await queryParse<Property>("Property", { slug: propertySlug, status: "published" }, 1).then((rows) => rows[0]);
    if (!property) return NextResponse.json({ error: "This property is not currently bookable." }, { status: 404 });
    const reference = `LV-${randomBytes(6).toString("hex").toUpperCase()}`;
    const booking = await createParseRecord<Booking>("Booking", {
      traveler: pointer("_User", auth.viewer.objectId),
      property: pointer("Property", property.objectId),
      bookingReference: reference,
      status: "pending", paymentStatus: "not_required_request",
      checkIn: { __type: "Date", iso: `${checkIn}T00:00:00.000Z` },
      checkOut: { __type: "Date", iso: `${checkOut}T00:00:00.000Z` },
      guests, totalMinor: 0, currency: "DZD", guestName, guestEmail,
      guestMessage: typeof body?.guestMessage === "string" ? body.guestMessage.trim().slice(0, 1500) : "",
      bookingType: "request_to_book",
    });
    await sendReservationAlert({ travelerId: String(auth.viewer.objectId), email: guestEmail, bookingReference: reference, propertyName: property.name || "Accommodation", checkIn });
    return NextResponse.json({ booking: { bookingReference: reference, status: booking.status, paymentStatus: booking.paymentStatus, propertyName: property.name || "Accommodation" } }, { status: 201, headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return NextResponse.json({ error: "Could not submit the booking request. Please try again." }, { status: 503 });
  }
}

export async function PATCH(request: Request) {
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: "Request origin could not be verified." }, { status: 403 });
  try {
    const auth = await requireViewer();
    if ("response" in auth) return auth.response;
    const body = await request.json().catch(() => null) as Record<string, unknown> | null;
    const bookingReference = typeof body?.bookingReference === "string" ? body.bookingReference.trim() : "";
    const reason = typeof body?.reason === "string" ? body.reason.trim().slice(0, 500) : "";
    const action = body?.action;
    if (!/^LV-[A-F0-9]{12}$/.test(bookingReference)) return NextResponse.json({ error: "A valid booking reference is required." }, { status: 400 });
    const booking = await queryParse<Booking>("Booking", { bookingReference, traveler: pointer("_User", auth.viewer.objectId) }, 1).then((rows) => rows[0]);
    if (!booking) return NextResponse.json({ error: "Reservation not found." }, { status: 404 });
    const { updateParseRecord } = await import("@/lib/parse-tourism");
    if (booking.status === "quote_offered" && ["accept_quote", "decline_quote"].includes(String(action))) {
      const accepted = action === "accept_quote";
      await updateParseRecord("Booking", booking.objectId, {
        status: accepted ? "confirmed" : "cancelled",
        ...(accepted ? { paymentStatus: "manual_payment_required", acceptedQuoteAt: { __type: "Date", iso: new Date().toISOString() } } : { cancellationReason: reason || "Traveler declined provider quote", cancelledBy: pointer("_User", auth.viewer.objectId), cancelledAt: { __type: "Date", iso: new Date().toISOString() } }),
      });
      return NextResponse.json({ ok: true, status: accepted ? "confirmed" : "cancelled" }, { headers: { "Cache-Control": "private, no-store" } });
    }
    if (!allowedTransitions[booking.status || ""]?.includes("cancelled")) return NextResponse.json({ error: "This reservation can no longer be cancelled here. Contact support for help." }, { status: 409 });
    await updateParseRecord("Booking", booking.objectId, { status: "cancelled", cancellationReason: reason || "Cancelled by traveler", cancelledBy: pointer("_User", auth.viewer.objectId), cancelledAt: { __type: "Date", iso: new Date().toISOString() } });
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return NextResponse.json({ error: "Could not cancel the reservation. Please try again." }, { status: 503 });
  }
}
