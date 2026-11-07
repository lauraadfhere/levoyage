import Link from "next/link";
import { notFound } from "next/navigation";
import { PanoramaViewer } from "@/components/panorama-viewer";
import { MarketingPage } from "@/components/site-chrome";
import { getScenesForDestination } from "@/lib/destination-360";
import { getDestinationBySlug } from "@/lib/destinations-catalog";
import { slugify } from "@/lib/slug";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ place?: string; scene?: string }>;

export default async function DestinationDetail({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { slug } = await params;
  const query = await searchParams;
  const destination = getDestinationBySlug(slug);
  if (!destination) notFound();

  const placeFocus = query.place?.trim();
  const scenes = getScenesForDestination(destination.slug, placeFocus);
  const activeScene =
    scenes.find((scene) => scene.id === query.scene)
    || (placeFocus ? scenes.find((scene) => scene.placeName && slugify(scene.placeName) === slugify(placeFocus)) : null)
    || scenes[0];

  const focusedPlace = placeFocus
    ? destination.places.find((place) => slugify(place.name) === slugify(placeFocus) || place.name.toLocaleLowerCase() === placeFocus.toLocaleLowerCase())
    : null;

  return (
    <MarketingPage
      eyebrow={`WILAYA ${destination.code}`}
      title={focusedPlace ? `${focusedPlace.name}, ${destination.name}` : destination.name}
      intro={
        focusedPlace
          ? `Explore ${focusedPlace.name} inside ${destination.name}: catalog places, nearby stays and 360° / VR preview.`
          : `Discover ${destination.places.length} catalog places and ${destination.hotels.length} stay ideas in ${destination.name}, then open immersive 360° / VR.`
      }
    >
      <nav className="destination-actions" aria-label="Destination actions">
        <Link href={`/search?destination=${encodeURIComponent(destination.name)}`}>Search stays</Link>
        <Link href={`/explore-360?destination=${destination.slug}${placeFocus ? `&place=${encodeURIComponent(placeFocus)}` : ""}`}>Full 360° hub</Link>
        <Link href={`/stays?city=${encodeURIComponent(destination.name)}`}>Browse stays</Link>
        <Link href={`/planner?destination=${encodeURIComponent(destination.name)}`}>Plan this trip</Link>
        <Link href="/destinations">All destinations</Link>
      </nav>

      {activeScene ? (
        <PanoramaViewer title={activeScene.title} description={activeScene.description} imageUrl={activeScene.imageUrl} />
      ) : null}

      {scenes.length > 1 ? (
        <section className="scene-picker" aria-label="360 scenes">
          <h2>Scenes in {destination.name}</h2>
          <div className="scene-picker-list">
            {scenes.map((scene) => (
              <Link
                key={scene.id}
                className={scene.id === activeScene?.id ? "active" : ""}
                href={`/destinations/${destination.slug}?scene=${encodeURIComponent(scene.id)}${scene.placeName ? `&place=${encodeURIComponent(scene.placeName)}` : ""}`}
              >
                <strong>{scene.title}</strong>
                <span>{scene.kind}</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <div className="detail-layout destination-detail">
        <section>
          <h2>Places in the catalog</h2>
          <p>These places come from the Algeria tourism master catalog for {destination.name}.</p>
          {destination.places.length === 0 ? (
            <p className="search-empty">No individual places listed yet for this wilaya.</p>
          ) : (
            <ul className="place-list destination-place-list">
              {destination.places.map((place) => (
                <li key={place.name}>
                  <Link href={`/destinations/${destination.slug}?place=${encodeURIComponent(place.name)}`}>
                    <span>{place.name}</span>
                    <b>360° →</b>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
        <aside>
          <b>Trip building blocks</b>
          <span>{destination.places.length} places · {destination.hotels.length} stays · 360° / VR ready</span>
          <Link className="primary-link" href={`/explore-360?destination=${destination.slug}`}>Open VR explorer →</Link>
          <Link className="primary-link" href={`/tripyai`}>Ask TRRIPYAI about {destination.name} →</Link>
        </aside>
      </div>

      <section className="destination-stays">
        <div className="search-results-heading">
          <h2>Stay ideas near {destination.name}</h2>
          <p>{destination.hotels.length} from hotel catalog</p>
        </div>
        {destination.hotels.length === 0 ? (
          <p className="search-empty">No seeded hotels matched this wilaya yet. Use search to explore nearby cities.</p>
        ) : (
          <div className="offers-grid">
            {destination.hotels.slice(0, 6).map((hotel) => (
              <article className="offer-card" key={`${hotel.city}-${hotel.name}`}>
                <div className="offer-image">{hotel.city[0]}</div>
                <div>
                  <p className="offer-type">{hotel.propertyType}</p>
                  <h3>{hotel.name}</h3>
                  <p className="agency">{hotel.city} · {hotel.nearby}</p>
                  <strong>{hotel.rooms[0] || "Rooms available"}</strong>
                  <Link href={`/stays?city=${encodeURIComponent(hotel.city)}`}>View stays</Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </MarketingPage>
  );
}
