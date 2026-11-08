import Link from "next/link";
import { MarketingPage } from "@/components/site-chrome";
import { createTranslator, localeOrDefault, pathFor } from "@/lib/i18n";

const experiences = [
  { title: "experiences.e1t", meta: "experiences.e1m", detail: "experiences.e1d", priceKey: "experiences.price1", slug: "djanet" },
  { title: "experiences.e2t", meta: "experiences.e2m", detail: "experiences.e2d", priceKey: "experiences.price2", slug: "algiers" },
  { title: "experiences.e3t", meta: "experiences.e3m", detail: "experiences.e3d", priceKey: "experiences.price3", slug: "oran" },
  { title: "experiences.e4t", meta: "experiences.e4m", detail: "experiences.e4d", priceKey: "experiences.price4", slug: "tipaza" },
  { title: "experiences.e5t", meta: "experiences.e5m", detail: "experiences.e5d", priceKey: "experiences.price5", slug: "constantine" },
  { title: "experiences.e6t", meta: "experiences.e6m", detail: "experiences.e6d", priceKey: "experiences.price6", slug: "ghardaia" },
] as const;

export default function ExperiencesPage({ locale }: { locale?: string }) {
  const active = localeOrDefault(locale);
  const t = createTranslator(active);
  return (
    <MarketingPage
      eyebrow={t("experiences.eyebrow")}
      title={t("experiences.title")}
      intro={t("experiences.intro")}
      artTheme="experiences"
    >
      <div className="offers-grid">
        {experiences.map((item) => (
          <article className="offer-card" key={item.title}>
            <div className="offer-image">{item.slug[0].toUpperCase()}</div>
            <div>
              <p className="offer-type">{t(item.meta)}</p>
              <h3>{t(item.title)}</h3>
              <p className="agency">{t(item.detail)}</p>
              <strong>{t(item.priceKey)}</strong>
              <div className="place-card-actions">
                <Link href={pathFor(`/destinations/${item.slug}`, active)}>{t("common.destination")}</Link>
                <Link href={pathFor(`/explore-360?destination=${item.slug}`, active)}>{t("common.view360")}</Link>
                <Link href={pathFor(`/planner?destination=${encodeURIComponent(item.slug)}`, active)}>{t("experiences.addToPlan")}</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </MarketingPage>
  );
}
