import Link from "next/link";
import { MarketingPage } from "@/components/site-chrome";
import { getPublishedProperties } from "@/lib/published-properties";
import { findWilayaByName } from "@/lib/destinations-catalog";
import { getHotelCatalog } from "@/lib/hotel-catalog";
import { getTourismDirectory } from "@/lib/tourism-directory";
import { slugify } from "@/lib/slug";
import { countKey, createTranslator, localeOrDefault, pathFor } from "@/lib/i18n";

type SearchParams = Promise<{ destination?: string; checkIn?: string; checkOut?: string; guests?: string }>;

export default async function SearchPage({ searchParams, locale }: { searchParams: SearchParams; locale?: string }) {
  const active = localeOrDefault(locale);
  const t = createTranslator(active);
  const params = await searchParams;
  const destination = (params.destination || "").trim();
  const checkIn = params.checkIn || "";
  const checkOut = params.checkOut || "";
  const guests = params.guests || t("search.guests2");
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
      eyebrow={t("search.eyebrow")}
      title={destination ? t("search.titleFor", { q: destination }) : t("search.title")}
      intro={t("search.intro")}
      artTheme="explore"
      className="search-page"
    >
      <form className="filter-panel" action={pathFor("/search", active)} method="get">
        <input
          name="destination"
          aria-label={t("search.destinationLabel")}
          defaultValue={destination}
          placeholder={t("search.destinationPlaceholder")}
        />
        <input name="checkIn" aria-label={t("search.checkIn")} type="date" defaultValue={checkIn} />
        <input name="checkOut" aria-label={t("search.checkOut")} type="date" defaultValue={checkOut} />
        <select name="guests" aria-label={t("search.guests")} defaultValue={guests}>
          <option>{t("search.guests2")}</option>
          <option>{t("search.guests1")}</option>
          <option>{t("search.guests4")}</option>
        </select>
        <button type="submit">{t("common.searchStays")}</button>
      </form>

      <section className="search-results" aria-live="polite">
        <div className="search-results-heading">
          <h2>{destination ? t("search.matching") : t("search.popular")}</h2>
          <p>
            {countKey(t, "search.resultCountOne", "search.resultCount", places.length)}
            {destination ? ` · ${destination}` : ""}
            {checkIn && checkOut ? ` · ${checkIn} → ${checkOut}` : ""}
            {` · ${guests}`}
          </p>
        </div>

        {places.length === 0 ? (
          <p className="search-empty">{t("search.resultEmpty")}</p>
        ) : (
          <div className="catalog-grid">
            {places.map((place) => (
              <article className="catalog-card" key={`${place.type}-${place.code}-${place.name}`}>
                <div className="catalog-image">
                  <span>{t(place.type === "Wilaya" ? "search.typeWilaya" : "search.typePlace")}</span>
                </div>
                <div className="catalog-copy">
                  <p>{place.wilaya}</p>
                  <h2>{place.name}</h2>
                  <p className="catalog-detail">{t("search.cardDetail", { place: place.name })}</p>
                  <div className="destination-card-actions">
                    <Link href={pathFor(`/destinations/${slugify(place.wilaya)}?place=${encodeURIComponent(place.name)}`, active)}>
                      {t("common.openDestination")}
                    </Link>
                    <Link href={pathFor(`/explore-360?destination=${slugify(place.wilaya)}&place=${encodeURIComponent(place.name)}`, active)}>
                      {t("common.view360")}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="search-results-heading" style={{ marginTop: 42 }}>
          <h2>{t("search.approvedHeading")}</h2>
          <p>{countKey(t, "search.approvedCountOne", "search.approvedCount", publishedProperties.length)}</p>
        </div>

        {publishedProperties.length ? <div className="offers-grid">{publishedProperties.map((property) => <article className="offer-card" key={property.objectId}><div className="offer-image">{property.destinationName.slice(0, 1)}</div><div><p className="offer-type">{property.type || t("common.stays")} · {property.destinationName}</p><h3>{property.name}</h3><p className="agency">{t("search.providedBy", { name: property.businessName })}</p><Link href={`/properties/${property.slug}`}>{t("common.viewDetails")}</Link></div></article>)}</div> : <p className="search-empty">{t("search.approvedEmpty")}</p>}

        <div className="search-results-heading" style={{ marginTop: 42 }}>
          <h2>{t("search.catalogHeading")}</h2>
          <p>{t("search.catalogCount", { count: hotels.length })}</p>
        </div>

        {hotels.length === 0 ? (
          <p className="search-empty">{t("search.catalogEmpty")}</p>
        ) : (
          <div className="offers-grid">
            {hotels.map((hotel) => {
              const related = findWilayaByName(hotel.city);
              return (
                <article className="offer-card" key={`${hotel.city}-${hotel.name}`}>
                  <div className="offer-image">{hotel.city[0]}</div>
                  <div>
                    <p className="offer-type">{t("search.seedMeta", { type: hotel.propertyType })}</p>
                    <h3>{hotel.name}</h3>
                    <p className="agency">{hotel.city} · {hotel.nearby}</p>
                    <p className="agency">{t("search.unverified")}</p>
                    <div className="destination-card-actions">
                      <Link href={`/stays?city=${encodeURIComponent(hotel.city)}`}>{t("search.viewStays")}</Link>
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
