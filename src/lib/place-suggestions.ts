import { createParseRecord, pointer, queryParse, updateParseRecord, type ParseRecord } from "@/lib/parse-tourism";

// A traveller's suggested review or shared view of a place or hotel.
// Stored in the Parse class "PlaceSuggestion". Only "published" rows are public.
export type PlaceSuggestionKind = "review" | "view";
export type PlaceSuggestionStatus = "pending" | "published" | "rejected";

export type PlaceSuggestion = ParseRecord & {
  kind?: PlaceSuggestionKind;
  placeName?: string;
  placeType?: "place" | "hotel";
  propertyId?: string;
  rating?: number;
  body?: string;
  mediaObjectId?: string;
  displayName?: string;
  status?: PlaceSuggestionStatus;
  traveler?: { objectId?: string };
};

export const MAX_BODY_LENGTH = 1000;

export async function listPublishedSuggestions(placeName: string, limit = 50) {
  try {
    return await queryParse<PlaceSuggestion>("PlaceSuggestion", { placeName, status: "published" }, limit);
  } catch {
    return [];
  }
}

export async function listPendingSuggestions(limit = 100) {
  return queryParse<PlaceSuggestion>("PlaceSuggestion", { status: "pending" }, limit);
}

export async function createSuggestion(input: {
  travelerId: string;
  kind: PlaceSuggestionKind;
  placeName: string;
  placeType: "place" | "hotel";
  propertyId?: string;
  rating?: number;
  body: string;
  mediaObjectId?: string;
  displayName: string;
}) {
  return createParseRecord<PlaceSuggestion>("PlaceSuggestion", {
    traveler: pointer("_User", input.travelerId),
    kind: input.kind,
    placeName: input.placeName,
    placeType: input.placeType,
    propertyId: input.propertyId || "",
    rating: input.rating ?? null,
    body: input.body,
    mediaObjectId: input.mediaObjectId || "",
    displayName: input.displayName,
    status: "pending",
  });
}

export async function decideSuggestion(suggestionId: string, status: "published" | "rejected", reason = "") {
  return updateParseRecord<PlaceSuggestion>("PlaceSuggestion", suggestionId, { status, moderationReason: reason });
}
