import { DashboardChrome } from "@/components/dashboard-chrome";
import { TripyaiChat } from "@/components/tripyai-chat";
import { createTranslator, dirFor, localeOrDefault } from "@/lib/i18n";

export default function TripyaiPage({ locale }: { locale?: string }) {
  const active = localeOrDefault(locale);
  const t = createTranslator(active);
  return (
    <DashboardChrome activeHref="">
      <section className="dashboard-shell dashboard-tool-page tripyai-page" dir={dirFor(active)}>
        <p className="dashboard-eyebrow">{t("tripyai.dashEyebrow")}</p>
        <h1>{t("tripyai.h1")}</h1>
        <p className="dashboard-lead">{t("tripyai.lead")}</p>
        <TripyaiChat />
      </section>
    </DashboardChrome>
  );
}
