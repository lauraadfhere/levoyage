import { NextResponse } from "next/server";
import { isSameOriginRequest, requireApprovedPartner, requireViewer } from "@/lib/api-access";
import { pointer, queryParse, updateParseRecord, type ParseRecord } from "@/lib/parse-tourism";

export const runtime = "nodejs";
type Property = ParseRecord & { name?: string; business?: { objectId?: string } };
type Booking = ParseRecord & { property?: { objectId?: string }; status?: string; bookingReference?: string; checkIn?: string; checkOut?: string; guests?: number; guestName?: string; guestEmail?: string; guestMessage?: string; totalMinor?: number; currency?: string; paymentStatus?: string };

async function partnerProperties(businessId: string) {
  return queryParse<Property>("Property", { business: pointer("Business", businessId) });
}

export async function GET() {
  try {
    const auth = await requireViewer();
    if ("response" in auth) return auth.response;
    const access = await requireApprovedPartner(auth.viewer.objectId);
    if ("response" in access) return access.response;
    const properties = await partnerProperties(access.business.objectId);
    const bookings = (await Promise.all(properties.map(async (property) => {
      const rows = await queryParse<Booking>("Booking", { property: pointer("Property", property.objectId) });
      return rows.map((booking) => ({ bookingReference: booking.bookingReference, status: booking.status, checkIn: booking.checkIn, checkOut: booking.checkOut, guests: booking.guests, guestName: booking.guestName, guestEmail: booking.guestEmail, guestMessage: booking.guestMessage, totalMinor: booking.totalMinor, createdAt: booking.createdAt, propertyName: property.name || "Property" }));
    }))).flat().sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
    return NextResponse.json({ bookings }, { headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return NextResponse.json({ error: "Could not load partner reservations." }, { status: 503 });
  }
}

export async function PATCH(request: Request) {
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: "Request origin could not be verified." }, { status: 403 });
  try {
    const auth = await requireViewer();
    if ("response" in auth) return auth.response;
    const access = await requireApprovedPartner(auth.viewer.objectId);
    if ("response" in access) return access.response;
    const body = await request.json().catch(() => null) as Record<string, unknown> | null;
    const bookingReference = typeof body?.bookingReference === "string" ? body.bookingReference.trim() : "";
    const action = body?.action;
    const totalDzd = Number(body?.totalDzd);
    const propertyIds = (await partnerProperties(access.business.objectId)).map((item) => item.objectId);
    const bookings = (await Promise.all(propertyIds.map((propertyId) => queryParse<Booking>("Booking", { bookingReference, property: pointer("Property", propertyId) }, 1)))).flat();
    const booking = bookings[0];
    if (!booking) return NextResponse.json({ error: "Reservation not found for your business." }, { status: 404 });
    const completing = action === "complete" && booking.status === "confirmed";
    if (completing) {
      const checkOut = booking.checkOut ? new Date(booking.checkOut).toISOString().slice(0, 10) : "";
      if (!checkOut || checkOut > new Date().toISOString().slice(0, 10)) return NextResponse.json({ error: "A stay can be marked complete only after its check-out date." }, { status: 409 });
      await updateParseRecord("Booking", booking.objectId, { status: "completed", respondedAt: { __type: "Date", iso: new Date().toISOString() }, respondedBy: pointer("_User", auth.viewer.objectId) });
      return NextResponse.json({ ok: true, status: "completed" }, { headers: { "Cache-Control": "private, no-store" } });
    }
    if (booking.status !== "pending" || !["offer", "reject"].includes(String(action))) return NextResponse.json({ error: "Only pending booking requests can receive a quote or be rejected." }, { status: 409 });
    if (action === "offer" && (!Number.isSafeInteger(totalDzd) || totalDzd < 1 || totalDzd > 100_000_000)) return NextResponse.json({ error: "Enter the total price in DZD before sending an offer." }, { status: 400 });
    await updateParseRecord("Booking", booking.objectId, {
      status: action === "offer" ? "quote_offered" : "rejected",
      ...(action === "offer" ? { totalMinor: totalDzd * 100, quoteOfferedAt: { __type: "Date", iso: new Date().toISOString() } } : {}),
      respondedAt: { __type: "Date", iso: new Date().toISOString() },
      respondedBy: pointer("_User", auth.viewer.objectId),
      ...(action === "reject" ? { rejectionReason: typeof body?.reason === "string" ? body.reason.trim().slice(0, 500) : "Not available" } : {}),
    });
    return NextResponse.json({ ok: true, status: action === "offer" ? "quote_offered" : "rejected" }, { headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return NextResponse.json({ error: "Could not update the booking request." }, { status: 503 });
  }
}
