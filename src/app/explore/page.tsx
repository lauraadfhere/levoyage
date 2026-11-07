import Link from "next/link";
import { CatalogGrid } from "@/components/catalog";
import { MarketingPage } from "@/components/site-chrome";
import { getWilayas } from "@/lib/destinations-catalog";

const cards = [
  { title: "Stays across Algeria", meta: "HOTELS · APARTMENTS · CAMPS", detail: "Find places to stay from the hotel catalog, then open destination pages.", href: "/stays" },
  { title: "360° / VR explore", meta: "IMMERSIVE PREVIEWS", detail: "Look around destinations before you travel. Drag to explore, Enter VR on mobile.", href: "/explore-360", badge: "360°" },
  { title: "Destination guides", meta: "69 WILAYAS", detail: "Open any wilaya page: places, stays and immersive scenes from the database.", href: "/destinations" },
];

export default function ExplorePage() {
  const featured = getWilayas().filter((item) => ["16", "31", "56", "25", "42"].includes(item.code)).slice(0, 5);

  return (
    <MarketingPage
      eyebrow="DISCOVERY STARTS HERE"
      title="Explore Algeria, your way."
      intro="Choose a destination, open its page, then use 360° / VR, stays and TRRIPYAI — all wired to the tourism catalog."
    >
      <CatalogGrid cards={cards} />

      <section className="feature-channel" aria-label="Feature channels">
        <h2>Complete core journey</h2>
        <div className="feature-channel-grid">
          <Link href="/destinations"><strong>1. Choose destination</strong><span>Browse all wilayas from the catalog.</span></Link>
          <Link href="/destinations/algiers"><strong>2. Open destination page</strong><span>Places, stays and immersive preview.</span></Link>
          <Link href="/explore-360?destination=algiers"><strong>3. 360° / VR view</strong><span>Look around before you book.</span></Link>
          <Link href="/stays?city=Algiers"><strong>4. Compare stays</strong><span>Hotels and camps near attractions.</span></Link>
          <Link href="/planner?destination=Algiers"><strong>5. Plan the trip</strong><span>Draft an itinerary from catalog places.</span></Link>
          <Link href="/tripyai"><strong>6. Ask TRRIPYAI</strong><span>Query places across the database.</span></Link>
        </div>
      </section>

      {featured.length ? (
        <section className="scene-picker" aria-label="Featured destinations">
          <h2>Featured destinations</h2>
          <div className="scene-picker-list">
            {featured.map((wilaya) => (
              <Link key={wilaya.slug} href={`/destinations/${wilaya.slug}`}>
                <strong>{wilaya.name}</strong>
                <span>{wilaya.placeCount} places · Open page</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </MarketingPage>
  );
}
