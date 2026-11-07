import Link from "next/link";
import { DashboardChrome } from "@/components/dashboard-chrome";
import { findWilayaByName } from "@/lib/destinations-catalog";

const places = ["Algiers", "Oran", "Constantine", "Ghardaïa", "Tamanrasset", "Béjaïa"];

export default function TouristMapPage() {
  return (
    <DashboardChrome activeHref="/dashboard/map-touristique">
      <section className="dashboard-shell dashboard-tool-page">
        <p className="dashboard-eyebrow">DISCOVER ALGERIA</p>
        <h1>Map Touristique</h1>
        <p className="dashboard-lead">Choose a destination, open its page, then explore in 360° / VR.</p>
        <div className="tourist-map">
          <div className="map-outline" aria-hidden="true">
            <i className="map-pin pin-alger" />
            <i className="map-pin pin-oran" />
            <i className="map-pin pin-constantine" />
            <i className="map-pin pin-ghardaia" />
            <i className="map-pin pin-tamanrasset" />
          </div>
          <aside>
            <h2>Choose a destination</h2>
            <p>Open the destination page for places, stays and immersive views.</p>
            <div className="place-list">
              {places.map((place) => {
                const wilaya = findWilayaByName(place);
                const href = wilaya ? `/destinations/${wilaya.slug}` : `/destinations?place=${encodeURIComponent(place)}`;
                return (
                  <Link href={href} key={place}>
                    {place}
                    <span>→</span>
                  </Link>
                );
              })}
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
