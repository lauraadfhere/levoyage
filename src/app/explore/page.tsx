import Link from "next/link";
import { CatalogGrid } from "@/components/catalog";
import { MarketingPage } from "@/components/site-chrome";
import { getWilayas } from "@/lib/destinations-catalog";
import { createTranslator, localeOrDefault, pathFor } from "@/lib/i18n";

export default function ExplorePage({ locale }: { locale?: string }) {
  const active = localeOrDefault(locale);
  const t = createTranslator(active);
  const cards = [
    { title: t("explore.c1t"), meta: t("explore.c1m"), detail: t("explore.c1d"), href: pathFor("/stays", active) },
    { title: t("explore.c2t"), meta: t("explore.c2m"), detail: t("explore.c2d"), href: pathFor("/explore-360", active), badge: "360°" },
    { title: t("explore.c3t"), meta: t("explore.c3m"), detail: t("explore.c3d"), href: pathFor("/destinations", active) },
  ];
  const journey = [
    ["explore.j1t", "explore.j1d", pathFor("/destinations", active)],
    ["explore.j2t", "explore.j2d", pathFor("/destinations/algiers", active)],
    ["explore.j3t", "explore.j3d", pathFor("/explore-360?destination=algiers", active)],
    ["explore.j4t", "explore.j4d", pathFor("/stays?city=Algiers", active)],
    ["explore.j5t", "explore.j5d", pathFor("/planner?destination=Algiers", active)],
    ["explore.j6t", "explore.j6d", pathFor("/tripyai", active)],
  ] as const;
  const featured = getWilayas().filter((item) => ["16", "31", "56", "25", "42"].includes(item.code)).slice(0, 5);

  return (
    <MarketingPage
      eyebrow={t("explore.eyebrow")}
      title={t("explore.title")}
      intro={t("explore.intro")}
      artTheme="explore"
    >
      <CatalogGrid cards={cards} />

      <section className="feature-channel" aria-label={t("explore.journeyTitle")}>
        <h2>{t("explore.journeyTitle")}</h2>
        <div className="feature-channel-grid">
          {journey.map(([titleKey, detailKey, href]) => (
            <Link href={href} key={titleKey}><strong>{t(titleKey)}</strong><span>{t(detailKey)}</span></Link>
          ))}
        </div>
      </section>

      {featured.length ? (
        <section className="scene-picker" aria-label={t("explore.featured")}>
          <h2>{t("explore.featured")}</h2>
          <div className="scene-picker-list">
            {featured.map((wilaya) => (
              <Link key={wilaya.slug} href={pathFor(`/destinations/${wilaya.slug}`, active)}>
                <strong>{wilaya.name}</strong>
                <span>{t("explore.openPage", { count: wilaya.placeCount })}</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </MarketingPage>
  );
}
