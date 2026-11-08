import { TravelerBookings } from "@/components/traveler-bookings";
import { MarketingPage } from "@/components/site-chrome";
import { createTranslator } from "@/lib/i18n";

export default function BookingsPage({ locale }: { locale?: string }) {
  const t = createTranslator(locale);
  return (
    <MarketingPage eyebrow={t("bookings.eyebrow")} title={t("bookings.manageTitle")} intro={t("bookings.manageIntro")} artTheme="explore">
      <TravelerBookings />
    </MarketingPage>
  );
}
