import Link from "next/link";
import { MarketingPage } from "@/components/site-chrome";
import { findWilayaByName, getWilayas, searchDestinations } from "@/lib/destinations-catalog";
import { redirect } from "next/navigation";
import wilayaImages from "@/lib/wilaya-images.generated.json";
import { countKey, createTranslator, localeOrDefault, pathFor } from "@/lib/i18n";

type SearchParams = Promise<{ wilaya?: string; place?: string; q?: string }>;

const features = [
  ["header.explore", "destinations.f1", "/search"],
  ["header.destinations", "destinations.f2", "/destinations"],
  ["common.view360", "destinations.f3", "/explore-360"],
  ["header.stays", "destinations.f4", "/stays"],
  ["header.thingsToDo", "destinations.f5", "/experiences"],
  ["header.planner", "destinations.f6", "/planner"],
  ["home.f6t", "destinations.f7", "/tripyai"],
  ["header.guide", "destinations.f8", "/guide"],
] as const;

export default async function DestinationsPage({ searchParams, locale }: { searchParams: SearchParams; locale?: string }) {
  const active = localeOrDefault(locale);
  const t = createTranslator(active);
  const params = await searchParams;
  const wilayaParam = params.wilaya?.trim();
  const placeParam = params.place?.trim();
  const query = params.q?.trim() || "";

  if (wilayaParam) {
    const match = findWilayaByName(wilayaParam);
    if (match) {
      const target = placeParam
        ? pathFor(`/destinations/${match.slug}?place=${encodeURIComponent(placeParam)}`, active)
        : pathFor(`/destinations/${match.slug}`, active);
      redirect(target);
    }
  }

  if (placeParam && !wilayaParam) {
    const match = findWilayaByName(placeParam) || getWilayas().find((item) =>
      item.name.toLocaleLowerCase().includes(placeParam.toLocaleLowerCase()),
    );
    if (match) redirect(pathFor(`/destinations/${match.slug}?place=${encodeURIComponent(placeParam)}`, active));
  }

  const wilayas = query ? searchDestinations(query) : getWilayas();

  return (
    <MarketingPage
      eyebrow={t("destinations.eyebrow")}
      title={t("destinations.title")}
      intro={t("destinations.intro")}
      artTheme="destinations"
    >
      <form className="filter-panel destination-filter" action={pathFor("/destinations", active)} method="get">
        <input name="q" defaultValue={query} placeholder={t("destinations.placeholder")} aria-label={t("destinations.searchLabel")} />
        <button type="submit">{t("destinations.submit")}</button>
      </form>

      <div className="search-results-heading">
        <h2>{query ? t("destinations.resultsFor", { q: query }) : t("destinations.all")}</h2>
        <p>{countKey(t, "destinations.countOne", "destinations.count", wilayas.length)}</p>
      </div>

      {wilayas.length === 0 ? (
        <p className="search-empty">{t("destinations.empty")}</p>
      ) : (
        <div className="catalog-grid destination-grid">
          {wilayas.map((wilaya) => (
            <article className="catalog-card" key={wilaya.slug}>
              <div
                className="catalog-image"
                style={(wilayaImages as Record<string, { url: string }>)[wilaya.slug] ? { backgroundImage: `url("${(wilayaImages as Record<string, { url: string }>)[wilaya.slug].url}")`, backgroundSize: "cover", backgroundPosition: "center" } : undefined}
              >
                <span>{t("destinations.wilayaCode", { code: wilaya.code })}</span>
              </div>
              <div className="catalog-copy">
                <p>{t("destinations.placesInCatalog", { count: wilaya.placeCount })}</p>
                <h2>{wilaya.name}</h2>
                <p className="catalog-detail">{t("destinations.cardDetail")}</p>
                <div className="destination-card-actions">
                  <Link href={pathFor(`/destinations/${wilaya.slug}`, active)}>{t("common.openDestination")}</Link>
                  <Link href={pathFor(`/explore-360?destination=${wilaya.slug}`, active)}>{t("common.view360")}</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <section className="feature-channel" aria-label={t("destinations.featuresTitle")}>
        <h2>{t("destinations.featuresTitle")}</h2>
        <div className="feature-channel-grid">
          {features.map(([titleKey, detailKey, href]) => (
            <Link href={pathFor(href, active)} key={titleKey}><strong>{t(titleKey)}</strong><span>{t(detailKey)}</span></Link>
          ))}
        </div>
      </section>
    </MarketingPage>
  );
}
