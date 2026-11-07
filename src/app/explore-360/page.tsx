import Link from "next/link";
import { PanoramaViewer } from "@/components/panorama-viewer";
import { MarketingPage } from "@/components/site-chrome";
import { getScenesForDestination, listFeatured360Scenes } from "@/lib/destination-360";
import { findWilayaByName, getDestinationBySlug } from "@/lib/destinations-catalog";
import { slugify } from "@/lib/slug";

type SearchParams = Promise<{ destination?: string; place?: string; scene?: string }>;

export default async function Explore360Page({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const destinationParam = params.destination?.trim() || "";
  const placeParam = params.place?.trim();
  const sceneParam = params.scene?.trim();

  const named = destinationParam ? findWilayaByName(destinationParam) : null;
  const destination = destinationParam
    ? getDestinationBySlug(slugify(destinationParam)) || (named ? getDestinationBySlug(named.slug) : null)
    : null;

  const scenes = destination
    ? getScenesForDestination(destination.slug, placeParam)
    : listFeatured360Scenes(12);

  const activeScene =
    scenes.find((scene) => scene.id === sceneParam)
    || (placeParam ? scenes.find((scene) => scene.placeName && slugify(scene.placeName) === slugify(placeParam)) : null)
    || scenes[0];

  return (
    <MarketingPage
      eyebrow="IMMERSIVE ALGERIA"
      title={destination ? `360° / VR · ${destination.name}` : "Explore before you go."}
      intro={
        destination
          ? `Look around ${destination.name} in 360°. Enter VR on supported phones, then continue to stays or the destination page.`
          : "Choose a destination scene, drag to look around, and open VR mode. Every scene links back to catalog places and stays."
      }
    >
      {!destination ? (
        <form className="filter-panel destination-filter" action="/explore-360" method="get">
          <input name="destination" placeholder="Wilaya or destination slug — algiers, oran, djanet…" aria-label="Destination for 360" />
          <button type="submit">Open 360° / VR</button>
        </form>
      ) : (
        <nav className="destination-actions" aria-label="360 destination links">
          <Link href={`/destinations/${destination.slug}`}>Destination page</Link>
          <Link href={`/search?destination=${encodeURIComponent(destination.name)}`}>Search stays</Link>
          <Link href={`/stays?city=${encodeURIComponent(destination.name)}`}>Stays</Link>
          <Link href="/explore-360">All 360 scenes</Link>
        </nav>
      )}

      {activeScene ? (
        <PanoramaViewer title={activeScene.title} description={activeScene.description} imageUrl={activeScene.imageUrl} />
      ) : (
        <p className="search-empty">No immersive scenes available yet for this destination.</p>
      )}

      <section className="scene-picker" aria-label="Available 360 scenes">
        <h2>{destination ? `Scenes in ${destination.name}` : "Featured 360° destinations"}</h2>
        <div className="scene-picker-list">
          {scenes.map((scene) => (
            <Link
              key={scene.id}
              className={scene.id === activeScene?.id ? "active" : ""}
              href={
                destination
                  ? `/explore-360?destination=${destination.slug}&scene=${encodeURIComponent(scene.id)}${scene.placeName ? `&place=${encodeURIComponent(scene.placeName)}` : ""}`
                  : `/explore-360?destination=${scene.wilayaSlug}&scene=${encodeURIComponent(scene.id)}`
              }
            >
              <strong>{scene.title}</strong>
              <span>{scene.wilayaName} · {scene.kind}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="callout">
        <div>
          <h2>Are you a tourism business?</h2>
          <p>Use the partner 360° Studio checklist to prepare scenes, hotspots and publish-ready tours for your property.</p>
        </div>
        <Link href="/partner/studio">Open studio</Link>
      </section>
    </MarketingPage>
  );
}
