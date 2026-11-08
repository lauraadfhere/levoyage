import { MarketingPage } from "@/components/site-chrome";
import { createTranslator } from "@/lib/i18n";

export default function PrivacyPage({ locale }: { locale?: string }) {
  const t = createTranslator(locale);
  return (
    <MarketingPage eyebrow={t("legal.eyebrow")} title={t("legal.privacyTitle")} intro={t("privacy.intro")} artTheme="explore">
      <section className="prose">
        <h2>{t("privacy.h2")}</h2>
        <p>{t("privacy.p")}</p>
      </section>
    </MarketingPage>
  );
}
