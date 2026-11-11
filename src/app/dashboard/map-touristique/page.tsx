import Link from "next/link";
import { DashboardChrome } from "@/components/dashboard-chrome";
import { DestinationMap, type MapMarker } from "@/components/destination-map";
import { findWilayaByName } from "@/lib/destinations-catalog";

const places: { name: string; lat: number; lng: number }[] = [
  { name: "Algiers", lat: 36.75, lng: 3.06 },
  { name: "Oran", lat: 35.7, lng: -0.63 },
  { name: "Constantine", lat: 36.37, lng: 6.61 },
  { name: "Ghardaïa", lat: 32.49, lng: 3.67 },
  { name: "Tamanrasset", lat: 22.79, lng: 5.52 },
  { name: "Béjaïa", lat: 36.75, lng: 5.06 },
];

const mapMarkers: MapMarker[] = places.map((place) => {
  const wilaya = findWilayaByName(place.name);
  return {
    ...place,
    href: wilaya ? `/destinations/${wilaya.slug}` : `/destinations?place=${encodeURIComponent(place.name)}`,
  };
});

export default function TouristMapPage() {
  return (
    <DashboardChrome activeHref="/dashboard/map-touristique">
      <section className="dashboard-shell dashboard-tool-page">
        <p className="dashboard-eyebrow">DISCOVER ALGERIA</p>
        <h1>Map Touristique</h1>
        <p className="dashboard-lead">Choose a destination, open its page, then explore in 360° / VR.</p>
        <div className="tourist-map">
          <DestinationMap className="map-outline" markers={mapMarkers} />
          <aside>
            <h2>Choose a destination</h2>
            <p>Open the destination page for places, stays and immersive views.</p>
            <div className="place-list">
              {mapMarkers.map((place) => (
                <Link href={place.href || "/destinations"} key={place.name}>
                  {place.name}
                  <span>→</span>
                </Link>
              ))}
            </div>
            <p style={{ marginTop: 18 }}>
              <Link href="/explore-360">Open 360° / VR hub →</Link>
            </p>
          </aside>
        </div>
      </section>
    </DashboardChrome>
  );
}
