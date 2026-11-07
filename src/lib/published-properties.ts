import "server-only";
import { pointer, queryParse, type ParseRecord } from "@/lib/parse-tourism";

type Pointer = { objectId?: string };
export type PublishedProperty = ParseRecord & {
  name?: string;
  slug?: string;
  type?: string;
  description?: string;
  address?: string;
  facilities?: string[];
  rating?: number;
  reviewCount?: number;
  business?: Pointer;
  destination?: Pointer;
};
type PublicLabel = ParseRecord & { name?: string; wilaya?: string; city?: string; verificationStatus?: string };
export type PublicPropertyCard = PublishedProperty & { destinationName: string; businessName: string };
export type PublishedReview = ParseRecord & { rating?: number; body?: string; displayName?: string; booking?: Pointer };

export async function getPublishedProperties(): Promise<PublicPropertyCard[]> {
  try {
    const properties = await queryParse<PublishedProperty>("Property", { status: "published" }, 100);
    return Promise.all(properties.map(async (property) => {
      const [destination, business] = await Promise.all([
        property.destination?.objectId ? queryParse<PublicLabel>("Destination", { objectId: property.destination.objectId }, 1).then((rows) => rows[0]) : undefined,
        property.business?.objectId ? queryParse<PublicLabel>("Business", { objectId: property.business.objectId }, 1).then((rows) => rows[0]) : undefined,
      ]);
      return {
        ...property,
        destinationName: destination?.wilaya || destination?.city || destination?.name || "Algeria",
        businessName: business?.name || "Verified tourism partner",
      };
    }));
  } catch {
    return [];
  }
}

export async function getPublishedPropertyBySlug(slug: string) {
  const properties = await getPublishedProperties();
  return properties.find((property) => property.slug === slug) || null;
}

export async function getApprovedPropertyReviews(propertyId: string) {
  try {
    const [property] = await queryParse<PublishedProperty>("Property", { objectId: propertyId, status: "published" }, 1);
    if (!property) return [];
    return queryParse<PublishedReview>("Review", { entityType: "property", entityId: property.objectId, status: "published" }, 100);
  } catch {
    return [];
  }
}

export async function getReviewForBooking(bookingId: string, travelerId: string) {
  try {
    const [review] = await queryParse<PublishedReview & { status?: string }>("Review", { booking: pointer("Booking", bookingId), traveler: pointer("_User", travelerId) }, 1);
    return review || null;
  } catch {
    return null;
  }
}
