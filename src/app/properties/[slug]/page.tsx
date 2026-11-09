import { notFound } from "next/navigation";
import { BookingRequestForm } from "@/components/booking-request-form";
import { DestinationMap } from "@/components/destination-map";
import { MarketingPage } from "@/components/site-chrome";
import { getApprovedPropertyReviews, getPublishedPropertyBySlug } from "@/lib/published-properties";
import { slugify } from "@/lib/slug";
import { createTranslator, localeOrDefault, pathFor } from "@/lib/i18n";

export default async function PropertyPage({ params, locale }: { params: Promise<{ slug: string }>; locale?: string }) {
  const active = localeOrDefault(locale);
  const t = createTranslator(active);
  const { slug } = await params;
  const property = await getPublishedPropertyBySlug(slug);
  if (!property) notFound();
  const reviews = await getApprovedPropertyReviews(property.objectId);
  const propertyName = property.name || t("properties.fallbackName");
  return <MarketingPage
    eyebrow={t("properties.listingEyebrow")}
    title={propertyName}
    intro={t("properties.intro", { type: property.type || t("properties.fallbackType"), place: property.destinationName })}
    artTheme="stays"
  >
    <div className="property-layout">
      <section className="published-property-details">
        <p className="property-provider">{t("properties.providedBy", { name: property.businessName })}</p>
        <p>{property.description || t("properties.contactProvider")}</p>
        {property.address && <p><strong>{t("properties.area")}</strong> {property.address}</p>}
        {property.facilities?.length ? <><h2>{t("properties.facilities")}</h2><ul>{property.facilities.map((facility) => <li key={facility}>{facility}</li>)}</ul></> : null}
        {typeof property.latitude === "number" && typeof property.longitude === "number" && (
          <DestinationMap className="property-map" markers={[{ name: propertyName, lat: property.latitude, lng: property.longitude }]} />
        )}
        <p className="availability-note">{t("properties.availabilityNote")}</p>
      </section>
      <aside className="booking-box">
        <p>{t("properties.requestToBook")}</p>
        <strong>{t("properties.providerConfirmation")}</strong>
        {property.nightlyPrice ? <p><strong>{property.nightlyPrice.toLocaleString("en-US")} DZD</strong> per night</p> : null}
        <small>{t("properties.priceNote")}</small>
        <BookingRequestForm propertySlug={property.slug || slug} propertyName={propertyName} />
        <a href={pathFor(`/explore-360?destination=${encodeURIComponent(slugify(property.destinationName))}`, active)}>{t("properties.explore360")}</a>
      </aside>
    </div>
    <section className="published-reviews">
      <div className="search-results-heading">
        <h2>{t("properties.reviewsTitle")}</h2>
        <p>{t("properties.approvedCount", { count: reviews.length })}</p>
      </div>
      {reviews.length ? <div className="booking-list">{reviews.map((review) => <article className="booking-card" key={review.objectId}><p aria-label={`${review.rating || 0} / 5`}>{"★".repeat(review.rating || 0)}{"☆".repeat(5 - (review.rating || 0))}</p><strong>{review.displayName || t("properties.verifiedTraveler")}</strong>{review.body && <p>{review.body}</p>}</article>)}</div> : <p className="search-empty">{t("properties.noReviews")}</p>}
    </section>
  </MarketingPage>;
}
