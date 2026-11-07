import { notFound } from "next/navigation";
import { BookingRequestForm } from "@/components/booking-request-form";
import { MarketingPage } from "@/components/site-chrome";
import { getApprovedPropertyReviews, getPublishedPropertyBySlug } from "@/lib/published-properties";
import { slugify } from "@/lib/slug";

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = await getPublishedPropertyBySlug(slug);
  if (!property) notFound();
  const reviews = await getApprovedPropertyReviews(property.objectId);
  return <MarketingPage eyebrow="APPROVED PARTNER LISTING" title={property.name || "Algeria accommodation"} intro={`${property.type || "Accommodation"} in ${property.destinationName}. This listing was approved by the platform; dates and booking requests still require provider confirmation.`}>
    <div className="property-layout"><section className="published-property-details"><p className="property-provider">Provided by {property.businessName}</p><p>{property.description || "Contact the provider for current property details."}</p>{property.address && <p><strong>Area:</strong> {property.address}</p>}{property.facilities?.length ? <><h2>Facilities</h2><ul>{property.facilities.map((facility) => <li key={facility}>{facility}</li>)}</ul></> : null}<p className="availability-note">Availability and final price are confirmed directly by the provider after your request. No online payment is collected here.</p></section><aside className="booking-box"><p>REQUEST TO BOOK</p><strong>Provider confirmation</strong><small>Price and availability are not guaranteed until confirmed.</small><BookingRequestForm propertySlug={property.slug || slug} propertyName={property.name || "Accommodation"} /><a href={`/explore-360?destination=${encodeURIComponent(slugify(property.destinationName))}`}>Explore destination in 360° →</a></aside></div>
    <section className="published-reviews"><div className="search-results-heading"><h2>Verified booking reviews</h2><p>{reviews.length} approved</p></div>{reviews.length ? <div className="booking-list">{reviews.map((review) => <article className="booking-card" key={review.objectId}><p aria-label={`${review.rating || 0} out of 5 stars`}>{"★".repeat(review.rating || 0)}{"☆".repeat(5 - (review.rating || 0))}</p><strong>{review.displayName || "Verified traveler"}</strong>{review.body && <p>{review.body}</p>}</article>)}</div> : <p className="search-empty">No approved guest reviews yet. Only travelers with a completed stay can submit a review.</p>}</section>
  </MarketingPage>;
}
