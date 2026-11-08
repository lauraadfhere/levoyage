import Link from "next/link";
import { MarketingPage } from "@/components/site-chrome";
import { createTranslator, localeOrDefault, pathFor } from "@/lib/i18n";

const guides = [
  { title: "guide.g1t", meta: "guide.g1m", detail: "guide.g1d", slug: "algiers" },
  { title: "guide.g2t", meta: "guide.g2m", detail: "guide.g2d", slug: "djanet" },
  { title: "guide.g3t", meta: "guide.g3m", detail: "guide.g3d", slug: "oran" },
] as const;

export default function GuidePage({ locale }: { locale?: string }) {
  const active = localeOrDefault(locale);
  const t = createTranslator(active);
  return (
    <MarketingPage
      eyebrow={t("guide.eyebrow")}
      title={t("guide.title")}
      intro={t("guide.intro")}
      artTheme="guide"
    >
      <div className="catalog-grid">
        {guides.map((guide) => (
          <article className="catalog-card" key={guide.title}>
            <div className="catalog-image"><span>{t("guide.badge")}</span></div>
            <div className="catalog-copy">
              <p>{t(guide.meta)}</p>
              <h2>{t(guide.title)}</h2>
              <p className="catalog-detail">{t(guide.detail)}</p>
              <div className="destination-card-actions">
                <Link href={pathFor(`/destinations/${guide.slug}`, active)}>{t("common.openDestination")}</Link>
                <Link href={pathFor(`/explore-360?destination=${guide.slug}`, active)}>360°</Link>
                <Link href={pathFor(`/planner?destination=${guide.slug}`, active)}>{t("common.plan")}</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </MarketingPage>
  );
}
