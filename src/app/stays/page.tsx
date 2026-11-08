import Link from "next/link";
import { MarketingPage } from "@/components/site-chrome";
import { getHotelCatalog } from "@/lib/hotel-catalog";
import { getPublishedProperties } from "@/lib/published-properties";
import { findWilayaByName } from "@/lib/destinations-catalog";
import { countKey, createTranslator, localeOrDefault, pathFor } from "@/lib/i18n";

type SearchParams = Promise<{ city?: string; q?: string }>;

export default async function StaysPage({ searchParams, locale }: { searchParams: SearchParams; locale?: string }) {
  const active = localeOrDefault(locale);
  const t = createTranslator(active);
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
      eyebrow={t("stays.eyebrow")}
      title={city ? t("stays.titleCity", { city }) : t("stays.title")}
      intro={t("stays.intro")}
      artTheme="stays"
    >
      <form className="filter-panel destination-filter" action={pathFor("/stays", active)} method="get">
        <input name="q" defaultValue={q || city} placeholder={t("stays.placeholder")} aria-label={t("common.searchStays")} />
        <button type="submit">{t("common.searchStays")}</button>
      </form>

      {wilaya ? (
        <nav className="destination-actions" aria-label={t("stays.relatedAria")}>
          <Link href={pathFor(`/destinations/${wilaya.slug}`, active)}>{t("stays.openWilaya", { name: wilaya.name })}</Link>
          <Link href={pathFor(`/explore-360?destination=${wilaya.slug}`, active)}>{t("common.view360")}</Link>
          <Link href={pathFor(`/search?destination=${encodeURIComponent(wilaya.name)}`, active)}>{t("stays.fullSearch")}</Link>
        </nav>
      ) : null}

      <div className="search-results-heading">
        <h2>{term ? t("stays.approvedHeadingFor", { q: q || city }) : t("stays.approvedHeading")}</h2>
        <p>{countKey(t, "stays.approvedCountOne", "stays.approvedCount", properties.length)}</p>
      </div>

      {properties.length ? <div className="offers-grid">
        {properties.slice(0, 24).map((property) => <article className="offer-card" key={property.objectId}>
          <div className="offer-image">{property.destinationName.slice(0, 1)}</div><div>
            <p className="offer-type">{property.type || t("common.stays")} · {property.destinationName}</p><h3>{property.name}</h3><p className="agency">{t("search.providedBy", { name: property.businessName })}</p>
            <div className="destination-card-actions"><Link href={`/properties/${property.slug}`}>{t("common.viewDetails")}</Link></div>
          </div>
        </article>)}
      </div> : <p className="search-empty">{t("stays.approvedEmpty")}</p>}

      <div className="search-results-heading" style={{ marginTop: 42 }}>
        <h2>{t("stays.inspirationHeading")}</h2>
        <p>{countKey(t, "stays.inspirationCountOne", "stays.inspirationCount", hotels.length)}</p>
      </div>

      {hotels.length === 0 ? (
        <p className="search-empty">{t("stays.inspirationEmpty")}</p>
      ) : (
        <div className="offers-grid">
          {hotels.slice(0, 24).map((hotel) => {
            const related = findWilayaByName(hotel.city);
            return (
              <article className="offer-card" key={`${hotel.city}-${hotel.name}`}>
                <div className="offer-image">{hotel.city[0]}</div>
                <div>
                  <p className="offer-type">{t("stays.seedMeta", { type: hotel.propertyType, city: hotel.city })}</p>
                  <h3>{hotel.name}</h3>
                  <p className="agency">{hotel.nearby}</p>
                  <p className="agency">{t("stays.unverified")}</p>
                  <div className="destination-card-actions">
                    {related ? <Link href={pathFor(`/destinations/${related.slug}`, active)}>{t("common.destination")}</Link> : null}
                    {related ? <Link href={pathFor(`/explore-360?destination=${related.slug}`, active)}>360°</Link> : <Link href={pathFor(`/search?destination=${encodeURIComponent(hotel.city)}`, active)}>{t("common.search")}</Link>}
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
