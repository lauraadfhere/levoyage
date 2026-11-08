import { MarketingPage } from "@/components/site-chrome";
import { createTranslator } from "@/lib/i18n";

export default function TermsPage({ locale }: { locale?: string }) {
  const t = createTranslator(locale);
  return (
    <MarketingPage eyebrow={t("legal.eyebrow")} title={t("legal.termsTitle")} intro={t("terms.intro")} artTheme="explore">
      <section className="prose">
        <h2>{t("terms.h2")}</h2>
        <p>{t("terms.p")}</p>
      </section>
    </MarketingPage>
  );
}
