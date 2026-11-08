import Link from "next/link";
import { DashboardChrome } from "@/components/dashboard-chrome";
import { createTranslator, localeOrDefault, pathFor } from "@/lib/i18n";

const offers = [
  ["Sahara journey", "Djanet & Tassili n’Ajjer", "dashboard.o1d", "home.offer1price"],
  ["Capital & coast", "Algiers, Tipaza & Cherchell", "dashboard.o2d", "dashboard.o2p"],
  ["Western escape", "Oran & the Mediterranean", "dashboard.o3d", "dashboard.o3p"],
  ["Hoggar discovery", "Tamanrasset & Assekrem", "dashboard.o4d", "dashboard.o4p"],
  ["Kabylia weekend", "Béjaïa & the coast", "dashboard.o5d", "dashboard.o5p"],
  ["Roman heritage", "Constantine & Timgad", "dashboard.o6d", "dashboard.o6p"],
] as const;

export default function DashboardOffersPage({ locale }: { locale?: string }) {
  const active = localeOrDefault(locale);
  const t = createTranslator(active);
  return (
    <DashboardChrome activeHref="/dashboard/offers">
      <section className="dashboard-shell dashboard-tool-page">
        <p className="dashboard-eyebrow">{t("dashboard.offersEyebrow")}</p>
        <h1>{t("dashboard.offersTitle")}</h1>
        <p className="dashboard-lead">{t("dashboard.offersLead")}</p>
        <div className="dashboard-offers-grid">
          {offers.map(([type, title, detailKey, priceKey]) => (
            <article key={title}>
              <p>{type}</p>
              <h2>{title}</h2>
              <span>{t(detailKey)}</span>
              <strong>{t(priceKey)}</strong>
              <Link href={pathFor("/planner", active)}>{t("dashboard.planTrip")}</Link>
            </article>
          ))}
        </div>
      </section>
    </DashboardChrome>
  );
}
