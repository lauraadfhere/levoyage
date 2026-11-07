import { DashboardChrome } from "@/components/dashboard-chrome";
import { DashboardHomeContent } from "@/components/dashboard-home-content";
import { DashboardHotels } from "@/components/dashboard-hotels";
import { getHotelCatalog } from "@/lib/hotel-catalog";
import { getTourismDirectory } from "@/lib/tourism-directory";
export default function DashboardPage() { return <DashboardChrome activeHref=""><section className="dashboard-shell dashboard-content" id="bookings"><DashboardHomeContent items={getTourismDirectory()} /><DashboardHotels hotels={getHotelCatalog()} /></section></DashboardChrome>; }
