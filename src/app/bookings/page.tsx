import { TravelerBookings } from "@/components/traveler-bookings";
import { TripTracker } from "@/components/trip-tracker";
import { MarketingPage } from "@/components/site-chrome";
import { createTranslator } from "@/lib/i18n";

export default function BookingsPage({ locale }: { locale?: string }) {
  const t = createTranslator(locale);
  return (
    <MarketingPage eyebrow={t("bookings.eyebrow")} title={t("bookings.manageTitle")} intro={t("bookings.manageIntro")} artTheme="explore">
      <TravelerBookings />
      <div id="live-tracking"><TripTracker /></div>
    </MarketingPage>
  );
}
