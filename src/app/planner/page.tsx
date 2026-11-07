import Link from "next/link";
import { MarketingPage } from "@/components/site-chrome";
import { getDestinationBySlug, getWilayas, searchDestinations } from "@/lib/destinations-catalog";
import { slugify } from "@/lib/slug";

type SearchParams = Promise<{ destination?: string }>;

export default async function PlannerPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const destinationName = params.destination?.trim() || "";
  const matched = destinationName ? searchDestinations(destinationName)[0] : null;
  const destination = destinationName
    ? getDestinationBySlug(slugify(destinationName)) || (matched ? getDestinationBySlug(matched.slug) : null)
    : null;

  const defaultText = destination
    ? `Plan 4 days in ${destination.name}: mix of places like ${destination.places.slice(0, 3).map((place) => place.name).join(", ") || destination.name}, with stays and a 360° preview before booking.`
    : "For example: Four days with my family, beaches and good food, under 120,000 DZD.";

  return (
    <MarketingPage
      eyebrow="AI TRIP PLANNER"
      title={destination ? `Plan ${destination.name}` : "Tell us the journey you imagine."}
      intro="Describe your dates, budget and interests. Suggestions connect to catalog destinations, stays and 360° explore."
    >
      {destination ? (
        <nav className="destination-actions" aria-label="Planner destination links">
          <Link href={`/destinations/${destination.slug}`}>Destination page</Link>
          <Link href={`/explore-360?destination=${destination.slug}`}>360° / VR</Link>
          <Link href={`/stays?city=${encodeURIComponent(destination.name)}`}>Stays</Link>
          <Link href="/tripyai">Ask TRRIPYAI</Link>
        </nav>
      ) : null}

      <section className="planner-card">
        <label htmlFor="trip-request">What would you like to do in Algeria?</label>
        <textarea id="trip-request" name="q" defaultValue={defaultText} placeholder={defaultText} readOnly={false} />
        <div className="destination-card-actions" style={{ marginTop: 12 }}>
          <Link className="primary-link" href={destination ? `/destinations/${destination.slug}` : "/destinations"}>
            {destination ? `Open ${destination.name} →` : "Choose a destination →"}
          </Link>
          <Link className="primary-link" href="/tripyai">Continue with TRRIPYAI →</Link>
        </div>
        <p>Planning suggestions are not bookings. You choose what to save and reserve.</p>
      </section>

      <section className="scene-picker" aria-label="Planner suggestions">
        <h2>{destination ? `Catalog places in ${destination.name}` : "Start from a destination"}</h2>
        <div className="scene-picker-list">
          {destination
            ? destination.places.slice(0, 10).map((place) => (
                <Link key={place.name} href={`/destinations/${destination.slug}?place=${encodeURIComponent(place.name)}`}>
                  <strong>{place.name}</strong>
                  <span>Open with 360° preview</span>
                </Link>
              ))
            : getWilayas().slice(0, 12).map((wilaya) => (
                <Link key={wilaya.slug} href={`/planner?destination=${encodeURIComponent(wilaya.name)}`}>
                  <strong>{wilaya.name}</strong>
                  <span>{wilaya.placeCount} places · Plan here</span>
                </Link>
              ))}
        </div>
      </section>
    </MarketingPage>
  );
}
