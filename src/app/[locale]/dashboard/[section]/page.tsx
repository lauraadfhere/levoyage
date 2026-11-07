import { notFound } from "next/navigation";
import TouristCircuitPage from "@/app/dashboard/circuit-touristique/page";
import ExploreAlgeriaPage from "@/app/dashboard/explore-algerie/page";
import TouristMapPage from "@/app/dashboard/map-touristique/page";
export default async function LocalDashboardSection({ params }: { params: Promise<{ section: string }> }) { const { section } = await params; if (section === "map-touristique") return <TouristMapPage />; if (section === "explore-algerie") return <ExploreAlgeriaPage />; if (section === "circuit-touristique") return <TouristCircuitPage />; notFound(); }
