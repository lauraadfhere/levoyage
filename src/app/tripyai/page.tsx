import { DashboardChrome } from "@/components/dashboard-chrome";
import { TripyaiChat } from "@/components/tripyai-chat";
import { createTranslator, dirFor, localeOrDefault } from "@/lib/i18n";

export default function TripyaiPage({ locale }: { locale?: string }) {
  const active = localeOrDefault(locale);
  const t = createTranslator(active);
  return (
    <DashboardChrome activeHref="">
      <section className="dashboard-shell dashboard-tool-page tripyai-page" dir={dirFor(active)}>
        <svg className="tripyai-art" viewBox="0 0 340 150" aria-hidden="true" focusable="false">
          <circle cx="262" cy="46" r="26" fill="#FBBF01" />
          <path d="M0 120 Q80 84 160 112 T340 104 V150 H0 Z" fill="#3A3A3A" fillOpacity=".7" />
          <path d="M0 138 Q120 118 240 136 T340 130 V150 H0 Z" fill="#141414" />
          <path d="M40 92 Q120 40 200 92" fill="none" stroke="#FBBF01" strokeWidth="2.5" strokeDasharray="2 8" strokeLinecap="round" />
        </svg>
        <div className="tripyai-art-band" aria-hidden="true"><span /><span /><span /></div>
        <p className="dashboard-eyebrow">{t("tripyai.dashEyebrow")}</p>
        <h1>{t("tripyai.h1")}</h1>
        <p className="dashboard-lead">{t("tripyai.lead")}</p>
        <TripyaiChat />
      </section>
    </DashboardChrome>
  );
}
