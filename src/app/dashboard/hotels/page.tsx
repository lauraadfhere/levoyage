import { DashboardChrome } from "@/components/dashboard-chrome";
import { DashboardHotels } from "@/components/dashboard-hotels";
import { getHotelCatalog } from "@/lib/hotel-catalog";

export default function HotelsPage() {
  return <DashboardChrome activeHref="/dashboard/hotels"><section className="dashboard-shell dashboard-content dashboard-hotels-page"><DashboardHotels hotels={getHotelCatalog()} /></section></DashboardChrome>;
}
