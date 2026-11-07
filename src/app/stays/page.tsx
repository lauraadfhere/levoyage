import Link from "next/link";
import { MarketingPage } from "@/components/site-chrome";
import { getHotelCatalog } from "@/lib/hotel-catalog";
import { getPublishedProperties } from "@/lib/published-properties";
import { findWilayaByName } from "@/lib/destinations-catalog";

type SearchParams = Promise<{ city?: string; q?: string }>;

export default async function StaysPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const city = params.city?.trim() || "";
  const q = params.q?.trim() || "";
  const term = (q || city).toLocaleLowerCase();
  const [hotels, publishedProperties] = await Promise.all([
    Promise.resolve(getHotelCatalog().filter((hotel) => {
      if (!term) return true;
      return `${hotel.name} ${hotel.city} ${hotel.nearby} ${hotel.propertyType}`.toLocaleLowerCase().includes(term);
    })),
    getPublishedProperties(),
  ]);
  const properties = publishedProperties.filter((property) => !term || `${property.name || ""} ${property.destinationName} ${property.type || ""} ${property.description || ""}`.toLocaleLowerCase().includes(term));
  const wilaya = city ? findWilayaByName(city) : null;

  return (
    <MarketingPage
      eyebrow="STAYS IN ALGERIA"
      title={city ? `Stays near ${city}` : "Stay where your journey begins."}
      intro="Browse partner listings approved for the marketplace, or explore the clearly labeled seed catalog for destination inspiration. Booking requests are available only for approved listings."
    >
      <form className="filter-panel destination-filter" action="/stays" method="get">
        <input name="q" defaultValue={q || city} placeholder="City or hotel — Algiers, Oran, Djanet…" aria-label="Search stays" />
        <button type="submit">Search stays</button>
      </form>

      {wilaya ? (
        <nav className="destination-actions" aria-label="Related destination">
          <Link href={`/destinations/${wilaya.slug}`}>Open {wilaya.name}</Link>
          <Link href={`/explore-360?destination=${wilaya.slug}`}>360° / VR</Link>
          <Link href={`/search?destination=${encodeURIComponent(wilaya.name)}`}>Full search</Link>
        </nav>
      ) : null}

      <div className="search-results-heading">
        <h2>{term ? `Approved listings matching “${q || city}”` : "Approved partner properties"}</h2>
        <p>{properties.length} bookable listing{properties.length === 1 ? "" : "s"}</p>
      </div>

      {properties.length ? <div className="offers-grid">
        {properties.slice(0, 24).map((property) => <article className="offer-card" key={property.objectId}>
          <div className="offer-image">{property.destinationName.slice(0, 1)}</div><div>
            <p className="offer-type">{property.type || "Accommodation"} · {property.destinationName}</p><h3>{property.name}</h3><p className="agency">Provided by {property.businessName}</p>
            <div className="destination-card-actions"><Link href={`/properties/${property.slug}`}>View details & request →</Link></div>
          </div>
        </article>)}
      </div> : <p className="search-empty">No approved partner listings are currently available for this search. Catalog inspiration below is not bookable inventory.</p>}

      <div className="search-results-heading" style={{ marginTop: 42 }}>
        <h2>Destination inspiration · not bookable</h2>
        <p>{hotels.length} seed propert{hotels.length === 1 ? "y" : "ies"}</p>
      </div>

      {hotels.length === 0 ? (
        <p className="search-empty">No stays matched. Try another city from the destinations catalog.</p>
      ) : (
        <div className="offers-grid">
          {hotels.slice(0, 24).map((hotel) => {
            const related = findWilayaByName(hotel.city);
            return (
              <article className="offer-card" key={`${hotel.city}-${hotel.name}`}>
                <div className="offer-image">{hotel.city[0]}</div>
                <div>
                  <p className="offer-type">Seed catalog · {hotel.propertyType} · {hotel.city}</p>
                  <h3>{hotel.name}</h3>
                  <p className="agency">{hotel.nearby}</p>
                  <p className="agency">Inventory, rates and availability have not been verified for booking.</p>
                  <div className="destination-card-actions">
                    {related ? <Link href={`/destinations/${related.slug}`}>Destination</Link> : null}
                    {related ? <Link href={`/explore-360?destination=${related.slug}`}>360°</Link> : <Link href={`/search?destination=${encodeURIComponent(hotel.city)}`}>Search</Link>}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </MarketingPage>
  );
}
