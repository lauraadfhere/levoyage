import Link from "next/link";
import { PartnerOnboarding } from "@/components/partner-onboarding";
import { MarketingPage } from "@/components/site-chrome";
import { createTranslator, localeOrDefault, pathFor } from "@/lib/i18n";

export default function PartnerPage({ locale }: { locale?: string }) {
  const active = localeOrDefault(locale);
  const t = createTranslator(active);
  return (
    <MarketingPage eyebrow={t("partner.eyebrow")} title={t("partnerPage.title")} intro={t("partnerPage.intro")} artTheme="explore">
      <PartnerOnboarding />
      <nav className="destination-actions" aria-label={t("partner.toolsAria")}>
        <Link href={pathFor("/partner/properties", active)}>{t("partner.properties")}</Link>
        <Link href={pathFor("/partner/reservations", active)}>{t("partner.reservations")}</Link>
        <Link href={pathFor("/partner/studio", active)}>{t("partner.studio")}</Link>
      </nav>
    </MarketingPage>
  );
}
