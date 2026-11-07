import { TravelerBookings } from "@/components/traveler-bookings";
import { MarketingPage } from "@/components/site-chrome";
export default function BookingsPage() { return <MarketingPage eyebrow="MY TRAVEL · RESERVATIONS" title="Manage your booking requests." intro="View reservations tied to your account, check provider responses and cancel pending requests. A booking is confirmed only after the provider responds."><TravelerBookings /></MarketingPage>; }
