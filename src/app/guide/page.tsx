import Link from "next/link";
import { MarketingPage } from "@/components/site-chrome";
import { DestinationPicture, type DestinationPictureKind } from "@/components/destination-picture";
import { createTranslator, localeOrDefault, pathFor } from "@/lib/i18n";

const guides = [
  { title: "guide.g1t", meta: "guide.g1m", detail: "guide.g1d", slug: "algiers", kind: "sea" as DestinationPictureKind },
  { title: "guide.g2t", meta: "guide.g2m", detail: "guide.g2d", slug: "djanet", kind: "desert" as DestinationPictureKind },
  { title: "guide.g3t", meta: "guide.g3m", detail: "guide.g3d", slug: "oran", kind: "sea" as DestinationPictureKind },
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
      <p className="guide-alphabet" aria-hidden="true">
        <span lang="ar">أ ب ت ث ج ح خ</span>
        <span>ⴰ ⴱ ⴲ ⴳ ⴴ ⴵ ⴶ</span>
      </p>
      <div className="catalog-grid">
        {guides.map((guide) => (
          <article className="catalog-card" key={guide.title}>
            <DestinationPicture kind={guide.kind} label={t(guide.title)} />
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
