import { MarketingPage } from "@/components/site-chrome";
import { createTranslator } from "@/lib/i18n";

export default function AboutPage({ locale }: { locale?: string }) {
  const t = createTranslator(locale);
  return (
    <MarketingPage eyebrow={t("about.eyebrow")} title={t("aboutPage.title")} intro={t("aboutPage.intro")} artTheme="explore">
      <section className="prose">
        <h2>{t("aboutPage.h2")}</h2>
        <p>{t("aboutPage.p")}</p>
      </section>
    </MarketingPage>
  );
}
