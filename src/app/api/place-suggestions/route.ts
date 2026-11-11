import { NextResponse } from "next/server";
import { isSameOriginRequest, requireViewer } from "@/lib/api-access";
import { findMediaById } from "@/lib/parse-tourism";
import {
  createSuggestion,
  listPublishedSuggestions,
  MAX_BODY_LENGTH,
  type PlaceSuggestionKind,
} from "@/lib/place-suggestions";

export const runtime = "nodejs";

const PRIVATE = { "Cache-Control": "private, no-store" };

// GET /api/place-suggestions?placeName=Tipaza
// Public: returns only moderated (published) suggestions for a place.
export async function GET(request: Request) {
  const placeName = new URL(request.url).searchParams.get("placeName")?.trim() || "";
  if (!placeName || placeName.length > 120) {
    return NextResponse.json({ error: "A place name is required." }, { status: 400 });
  }
  const rows = await listPublishedSuggestions(placeName);
  return NextResponse.json({
    suggestions: rows.map((row) => ({
      objectId: row.objectId,
      kind: row.kind || "review",
      rating: row.rating ?? null,
      body: row.body || "",
      displayName: row.displayName || "Traveler",
      mediaObjectId: row.mediaObjectId || "",
      createdAt: row.createdAt,
    })),
  });
}

// POST /api/place-suggestions
// Body: { kind: "review" | "view", placeName, placeType: "place" | "hotel", propertyId?, rating?, body, mediaObjectId? }
export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Request origin could not be verified." }, { status: 403 });
  }
  try {
    const auth = await requireViewer();
    if ("response" in auth) return auth.response;

    const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
    const kind = body?.kind === "view" ? "view" : body?.kind === "review" ? "review" : "";
    const placeName = typeof body?.placeName === "string" ? body.placeName.trim() : "";
    const placeType = body?.placeType === "hotel" ? "hotel" : "place";
    const text = typeof body?.body === "string" ? body.body.trim() : "";
    const rating = body?.rating === undefined || body?.rating === null ? null : Number(body.rating);
    const propertyId = typeof body?.propertyId === "string" ? body.propertyId.trim() : "";
    const mediaObjectId = typeof body?.mediaObjectId === "string" ? body.mediaObjectId.trim() : "";

    if (!kind || !placeName || placeName.length > 120) {
      return NextResponse.json({ error: "Choose a review or a view and name the place." }, { status: 400 });
    }
    if (text.length > MAX_BODY_LENGTH) {
      return NextResponse.json({ error: `Keep your text under ${MAX_BODY_LENGTH} characters.` }, { status: 400 });
    }
    if (kind === "review" && (!Number.isInteger(rating) || (rating as number) < 1 || (rating as number) > 5)) {
      return NextResponse.json({ error: "Choose a 1–5 star rating for a review." }, { status: 400 });
    }
    if (kind === "view" && !mediaObjectId) {
      return NextResponse.json({ error: "Upload a photo to share your view." }, { status: 400 });
    }
    if (kind === "view" && text.length === 0 && !mediaObjectId) {
      return NextResponse.json({ error: "Add a photo or a short description." }, { status: 400 });
    }

    // The photo must be one this viewer uploaded, so one traveller cannot attach someone else's media.
    if (mediaObjectId) {
      const media = await findMediaById(mediaObjectId).catch(() => null);
      if (!media || media.ownerId !== auth.viewer.objectId) {
        return NextResponse.json({ error: "That photo could not be attached to your share." }, { status: 403 });
      }
    }

    const displayName = auth.viewer.fullName || "Verified traveler";
    const created = await createSuggestion({
      travelerId: auth.viewer.objectId,
      kind: kind as PlaceSuggestionKind,
      placeName,
      placeType,
      propertyId: propertyId || undefined,
      rating: kind === "review" ? (rating as number) : undefined,
      body: text,
      mediaObjectId: mediaObjectId || undefined,
      displayName,
    });

    return NextResponse.json({ suggestion: { objectId: created.objectId, status: "pending" } }, { status: 201, headers: PRIVATE });
  } catch {
    return NextResponse.json({ error: "Could not submit your suggestion." }, { status: 503 });
  }
}
