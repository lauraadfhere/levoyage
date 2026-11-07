import { NextResponse } from "next/server";
import { isSameOriginRequest, requireViewer } from "@/lib/api-access";
import { createParseRecord, pointer, queryParse, type ParseRecord } from "@/lib/parse-tourism";

export const runtime = "nodejs";
type Property = ParseRecord & { status?: string };
type Review = ParseRecord & { traveler?: { objectId?: string }; booking?: { objectId?: string }; entityId?: string; rating?: number; body?: string; displayName?: string; status?: string };

export async function GET(request: Request) {
  try {
    const propertyId = new URL(request.url).searchParams.get("propertyId")?.trim() || "";
    if (!propertyId) return NextResponse.json({ error: "Property is required." }, { status: 400 });
    const property = await queryParse<Property>("Property", { objectId: propertyId, status: "published" }, 1).then((rows) => rows[0]);
    if (!property) return NextResponse.json({ error: "Property not found." }, { status: 404 });
    const reviews = await queryParse<Review>("Review", { entityType: "property", entityId: property.objectId, status: "published" }, 100);
    return NextResponse.json({ reviews: reviews.map((review) => ({ rating: review.rating, body: review.body || "", displayName: review.displayName || "Verified traveler", createdAt: review.createdAt })) }, { headers: { "Cache-Control": "public, max-age=60" } });
  } catch {
    return NextResponse.json({ error: "Could not load approved reviews." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: "Request origin could not be verified." }, { status: 403 });
  try {
    const auth = await requireViewer();
    if ("response" in auth) return auth.response;
    const body = await request.json().catch(() => null) as Record<string, unknown> | null;
    const bookingReference = typeof body?.bookingReference === "string" ? body.bookingReference.trim() : "";
    const rating = Number(body?.rating);
    const reviewBody = typeof body?.body === "string" ? body.body.trim() : "";
    if (!/^LV-[A-F0-9]{12}$/.test(bookingReference) || !Number.isInteger(rating) || rating < 1 || rating > 5 || reviewBody.length > 2000) return NextResponse.json({ error: "Choose a 1–5 star rating and keep the review under 2,000 characters." }, { status: 400 });
    const booking = await queryParse<ParseRecord & { traveler?: { objectId?: string }; property?: { objectId?: string }; status?: string }>("Booking", { bookingReference, traveler: pointer("_User", auth.viewer.objectId), status: "completed" }, 1).then((rows) => rows[0]);
    if (!booking?.property?.objectId) return NextResponse.json({ error: "A review can only be submitted for your own completed property booking." }, { status: 403 });
    const existing = await queryParse<Review>("Review", { booking: pointer("Booking", booking.objectId), traveler: pointer("_User", auth.viewer.objectId) }, 1);
    if (existing.length) return NextResponse.json({ error: "You have already submitted a review for this booking." }, { status: 409 });
    const [profile] = await queryParse<ParseRecord & { fullName?: string }>("UserProfile", { user: pointer("_User", auth.viewer.objectId) }, 1);
    const review = await createParseRecord<Review>("Review", {
      traveler: pointer("_User", auth.viewer.objectId), booking: pointer("Booking", booking.objectId),
      entityType: "property", entityId: booking.property.objectId, rating, body: reviewBody,
      displayName: profile?.fullName || auth.viewer.fullName || "Verified traveler", status: "pending",
    });
    return NextResponse.json({ review: { objectId: review.objectId, status: "pending" } }, { status: 201, headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return NextResponse.json({ error: "Could not submit your review." }, { status: 503 });
  }
}
