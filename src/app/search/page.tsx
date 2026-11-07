import Link from "next/link";
import { MarketingPage } from "@/components/site-chrome";
import { getPublishedProperties } from "@/lib/published-properties";
import { findWilayaByName } from "@/lib/destinations-catalog";
import { getHotelCatalog } from "@/lib/hotel-catalog";
import { getTourismDirectory } from "@/lib/tourism-directory";
import { slugify } from "@/lib/slug";

type SearchParams = Promise<{ destination?: string; checkIn?: string; checkOut?: string; guests?: string }>;

export default async function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const destination = (params.destination || "").trim();
  const checkIn = params.checkIn || "";
  const checkOut = params.checkOut || "";
  const guests = params.guests || "2 guests · 1 room";
  const term = destination.toLocaleLowerCase();
  const publishedProperties = (await getPublishedProperties()).filter((property) => !term || `${property.name || ""} ${property.destinationName} ${property.type || ""} ${property.description || ""}`.toLocaleLowerCase().includes(term));

  const places = getTourismDirectory()
    .filter((item) => !term || `${item.name} ${item.wilaya}`.toLocaleLowerCase().includes(term))
    .slice(0, 12);

  const hotels = getHotelCatalog()
    .filter((item) => !term || `${item.name} ${item.city} ${item.nearby}`.toLocaleLowerCase().includes(term))
    .slice(0, 9);

  return (
    <MarketingPage
      eyebrow="SEARCH ALGERIA"
      title={destination ? `Results for “${destination}”` : "Choose a place, then make it yours."}
      intro="Search connects destination, dates and guests to Algeria stays and places. Adjust your filters below to refine the list."
    >
      <form className="filter-panel" action="/search" method="get">
        <input
          name="destination"
          aria-label="Destination"
          defaultValue={destination}
          placeholder="Destination, property or experience"
        />
        <input name="checkIn" aria-label="Check in" type="date" defaultValue={checkIn} />
        <input name="checkOut" aria-label="Check out" type="date" defaultValue={checkOut} />
        <select name="guests" aria-label="Guests" defaultValue={guests}>
          <option>2 guests · 1 room</option>
          <option>1 guest · 1 room</option>
          <option>4 guests · 2 rooms</option>
        </select>
        <button type="submit">Search stays</button>
      </form>

      <section className="search-results" aria-live="polite">
        <div className="search-results-heading">
          <h2>{destination ? "Matching places" : "Popular places to start"}</h2>
          <p>
            {places.length} place{places.length === 1 ? "" : "s"}
            {destination ? ` for “${destination}”` : ""}
            {checkIn && checkOut ? ` · ${checkIn} → ${checkOut}` : ""}
            {` · ${guests}`}
          </p>
        </div>

        {places.length === 0 ? (
          <p className="search-empty">No places matched that search. Try a wilaya or city such as Algiers, Oran, Djanet or Tipaza.</p>
        ) : (
          <div className="catalog-grid">
            {places.map((place) => (
              <article className="catalog-card" key={`${place.type}-${place.code}-${place.name}`}>
                <div className="catalog-image">
                  <span>{place.type.toUpperCase()}</span>
                </div>
                <div className="catalog-copy">
                  <p>{place.wilaya}</p>
                  <h2>{place.name}</h2>
                  <p className="catalog-detail">Explore stays and things to do around {place.name}.</p>
                  <div className="destination-card-actions">
                    <Link href={`/destinations/${slugify(place.wilaya)}?place=${encodeURIComponent(place.name)}`}>
                      Open destination
                    </Link>
                    <Link href={`/explore-360?destination=${slugify(place.wilaya)}&place=${encodeURIComponent(place.name)}`}>
                      360° / VR
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="search-results-heading" style={{ marginTop: 42 }}>
          <h2>Approved partner stays</h2>
          <p>{publishedProperties.length} approved listing{publishedProperties.length === 1 ? "" : "s"}</p>
        </div>

        {publishedProperties.length ? <div className="offers-grid">{publishedProperties.map((property) => <article className="offer-card" key={property.objectId}><div className="offer-image">{property.destinationName.slice(0, 1)}</div><div><p className="offer-type">{property.type || "Accommodation"} · {property.destinationName}</p><h3>{property.name}</h3><p className="agency">Provided by {property.businessName}</p><Link href={`/properties/${property.slug}`}>View details & request →</Link></div></article>)}</div> : <p className="search-empty">No approved partner stays match yet. Requests are available only for published properties.</p>}

        <div className="search-results-heading" style={{ marginTop: 42 }}>
          <h2>Catalog inspiration · not bookable</h2>
          <p>{hotels.length} seed entries</p>
        </div>

        {hotels.length === 0 ? (
          <p className="search-empty">No hotels matched yet. Broaden the destination name and search again.</p>
        ) : (
          <div className="offers-grid">
            {hotels.map((hotel) => {
              const related = findWilayaByName(hotel.city);
              return (
                <article className="offer-card" key={`${hotel.city}-${hotel.name}`}>
                  <div className="offer-image">{hotel.city[0]}</div>
                  <div>
                    <p className="offer-type">Seed catalog · {hotel.propertyType}</p>
                    <h3>{hotel.name}</h3>
                    <p className="agency">{hotel.city} · {hotel.nearby}</p>
                    <p className="agency">Availability and rates have not been verified.</p>
                    <div className="destination-card-actions">
                      <Link href={`/stays?city=${encodeURIComponent(hotel.city)}`}>View stays</Link>
                      {related ? <Link href={`/explore-360?destination=${related.slug}`}>360°</Link> : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </MarketingPage>
  );
}
