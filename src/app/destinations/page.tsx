import Link from "next/link";
import { MarketingPage } from "@/components/site-chrome";
import { findWilayaByName, getWilayas, searchDestinations } from "@/lib/destinations-catalog";
import { redirect } from "next/navigation";

type SearchParams = Promise<{ wilaya?: string; place?: string; q?: string }>;

export default async function DestinationsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const wilayaParam = params.wilaya?.trim();
  const placeParam = params.place?.trim();
  const query = params.q?.trim() || "";

  if (wilayaParam) {
    const match = findWilayaByName(wilayaParam);
    if (match) {
      const target = placeParam
        ? `/destinations/${match.slug}?place=${encodeURIComponent(placeParam)}`
        : `/destinations/${match.slug}`;
      redirect(target);
    }
  }

  if (placeParam && !wilayaParam) {
    const match = findWilayaByName(placeParam) || getWilayas().find((item) =>
      item.name.toLocaleLowerCase().includes(placeParam.toLocaleLowerCase()),
    );
    if (match) redirect(`/destinations/${match.slug}?place=${encodeURIComponent(placeParam)}`);
  }

  const wilayas = query ? searchDestinations(query) : getWilayas();

  return (
    <MarketingPage
      eyebrow="DESTINATION DISCOVERY"
      title="Choose a destination, then explore it."
      intro="All 69 wilayas from the Piolian tourism catalog. Open a destination page to browse places, stays and 360° / VR previews."
    >
      <form className="filter-panel destination-filter" action="/destinations" method="get">
        <input name="q" defaultValue={query} placeholder="Search wilaya or place — Algiers, Djanet, Tipaza…" aria-label="Search destinations" />
        <button type="submit">Find destinations</button>
      </form>

      <div className="search-results-heading">
        <h2>{query ? `Results for “${query}”` : "All destinations"}</h2>
        <p>{wilayas.length} wilaya{wilayas.length === 1 ? "" : "s"}</p>
      </div>

      {wilayas.length === 0 ? (
        <p className="search-empty">No destinations matched. Try another wilaya or place name.</p>
      ) : (
        <div className="catalog-grid destination-grid">
          {wilayas.map((wilaya) => (
            <article className="catalog-card" key={wilaya.slug}>
              <div className="catalog-image">
                <span>WILAYA {wilaya.code}</span>
              </div>
              <div className="catalog-copy">
                <p>{wilaya.placeCount} places in catalog</p>
                <h2>{wilaya.name}</h2>
                <p className="catalog-detail">Open the destination page for places, stays and immersive 360° / VR views.</p>
                <div className="destination-card-actions">
                  <Link href={`/destinations/${wilaya.slug}`}>Open destination</Link>
                  <Link href={`/explore-360?destination=${wilaya.slug}`}>360° / VR</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <section className="feature-channel" aria-label="Core travel features">
        <h2>Core features channelled for every destination</h2>
        <div className="feature-channel-grid">
          <Link href="/search"><strong>Search</strong><span>Find places and hotels from the Algeria catalog.</span></Link>
          <Link href="/destinations"><strong>Destinations</strong><span>Pick a wilaya and open its detail page.</span></Link>
          <Link href="/explore-360"><strong>360° / VR</strong><span>Look around scenes before you travel.</span></Link>
          <Link href="/stays"><strong>Stays</strong><span>Compare hotels and camps near attractions.</span></Link>
          <Link href="/experiences"><strong>Things to do</strong><span>Activities and local experiences.</span></Link>
          <Link href="/planner"><strong>AI Planner</strong><span>Turn a destination into a trip draft.</span></Link>
          <Link href="/tripyai"><strong>TRRIPYAI</strong><span>Ask about places across the database.</span></Link>
          <Link href="/guide"><strong>Travel guide</strong><span>Practical ideas for coast and Sahara.</span></Link>
        </div>
      </section>
    </MarketingPage>
  );
}
