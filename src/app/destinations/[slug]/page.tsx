import Link from "next/link";
import { notFound } from "next/navigation";
import { PanoramaViewer } from "@/components/panorama-viewer";
import { MarketingPage } from "@/components/site-chrome";
import { getScenesForDestination } from "@/lib/destination-360";
import { getDestinationBySlug } from "@/lib/destinations-catalog";
import { slugify } from "@/lib/slug";
import { createTranslator, localeOrDefault, pathFor } from "@/lib/i18n";

type Params = Promise<{ slug: string }>;
type SearchParams = Promise<{ place?: string; scene?: string }>;

export default async function DestinationDetail({
  params,
  searchParams,
  locale,
}: {
  params: Params;
  searchParams: SearchParams;
  locale?: string;
}) {
  const active = localeOrDefault(locale);
  const t = createTranslator(active);
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
      eyebrow={t("destination.wilayaEyebrow", { code: destination.code })}
      title={focusedPlace ? `${focusedPlace.name}, ${destination.name}` : destination.name}
      intro={focusedPlace
        ? t("destination.introForPlace", { place: focusedPlace.name, wilaya: destination.name })
        : t("destination.intro", { places: destination.places.length, stays: destination.hotels.length, wilaya: destination.name })}
      artTheme="destinations"
    >
      <nav className="destination-actions" aria-label={t("destination.actionsAria")}>
        <Link href={pathFor(`/search?destination=${encodeURIComponent(destination.name)}`, active)}>{t("common.searchStays")}</Link>
        <Link href={pathFor(`/explore-360?destination=${destination.slug}${placeFocus ? `&place=${encodeURIComponent(placeFocus)}` : ""}`, active)}>{t("destination.fullHub")}</Link>
        <Link href={pathFor(`/stays?city=${encodeURIComponent(destination.name)}`, active)}>{t("destination.browseStays")}</Link>
        <Link href={pathFor(`/planner?destination=${encodeURIComponent(destination.name)}`, active)}>{t("destination.planTrip")}</Link>
        <Link href={pathFor("/destinations", active)}>{t("destination.backToAll")}</Link>
      </nav>

      {activeScene ? (
        <PanoramaViewer title={activeScene.title} description={activeScene.description} imageUrl={activeScene.imageUrl} />
      ) : null}

      {scenes.length > 1 ? (
        <section className="scene-picker" aria-label={t("destination.scenesAria")}>
          <h2>{t("destination.scenesHeading", { name: destination.name })}</h2>
          <div className="scene-picker-list">
            {scenes.map((scene) => (
              <Link
                key={scene.id}
                className={scene.id === activeScene?.id ? "active" : ""}
                href={pathFor(`/destinations/${destination.slug}?scene=${encodeURIComponent(scene.id)}${scene.placeName ? `&place=${encodeURIComponent(scene.placeName)}` : ""}`, active)}
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
          <h2>{t("destination.catalogHeading")}</h2>
          <p>{t("destination.catalogIntro", { name: destination.name })}</p>
          {destination.places.length === 0 ? (
            <p className="search-empty">{t("destination.noPlacesYet")}</p>
          ) : (
            <ul className="place-list destination-place-list">
              {destination.places.map((place) => (
                <li key={place.name}>
                  <Link href={pathFor(`/destinations/${destination.slug}?place=${encodeURIComponent(place.name)}`, active)}>
                    <span>{place.name}</span>
                    <b>360° →</b>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
        <aside>
          <b>{t("destination.blocks")}</b>
          <span>{t("destination.blocksSummary", { places: destination.places.length, stays: destination.hotels.length })}</span>
          <Link className="primary-link" href={pathFor(`/explore-360?destination=${destination.slug}`, active)}>{t("destination.openVR")}</Link>
          <Link className="primary-link" href={pathFor("/tripyai", active)}>{t("destination.ask", { name: destination.name })}</Link>
        </aside>
      </div>

      <section className="destination-stays">
        <div className="search-results-heading">
          <h2>{t("destination.stayIdeas", { name: destination.name })}</h2>
          <p>{t("destination.fromCatalog", { count: destination.hotels.length })}</p>
        </div>
        {destination.hotels.length === 0 ? (
          <p className="search-empty">{t("destination.noHotels")}</p>
        ) : (
          <div className="offers-grid">
            {destination.hotels.slice(0, 6).map((hotel) => (
              <article className="offer-card" key={`${hotel.city}-${hotel.name}`}>
                <div className="offer-image">{hotel.city[0]}</div>
                <div>
                  <p className="offer-type">{hotel.propertyType}</p>
                  <h3>{hotel.name}</h3>
                  <p className="agency">{hotel.city} · {hotel.nearby}</p>
                  <strong>{hotel.rooms[0] || t("destination.roomsAvailable")}</strong>
                  <Link href={pathFor(`/stays?city=${encodeURIComponent(hotel.city)}`, active)}>{t("search.viewStays")}</Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </MarketingPage>
  );
}
