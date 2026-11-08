import Link from "next/link";
import { PanoramaViewer } from "@/components/panorama-viewer";
import { MarketingPage } from "@/components/site-chrome";
import { getScenesForDestination, listFeatured360Scenes } from "@/lib/destination-360";
import { findWilayaByName, getDestinationBySlug } from "@/lib/destinations-catalog";
import { slugify } from "@/lib/slug";
import { createTranslator, localeOrDefault, pathFor } from "@/lib/i18n";

type SearchParams = Promise<{ destination?: string; place?: string; scene?: string }>;

export default async function Explore360Page({ searchParams, locale }: { searchParams: SearchParams; locale?: string }) {
  const active = localeOrDefault(locale);
  const t = createTranslator(active);
  const params = await searchParams;
  const destinationParam = params.destination?.trim() || "";
  const placeParam = params.place?.trim();
  const sceneParam = params.scene?.trim();

  const named = destinationParam ? findWilayaByName(destinationParam) : null;
  const destination = destinationParam
    ? getDestinationBySlug(slugify(destinationParam)) || (named ? getDestinationBySlug(named.slug) : null)
    : null;

  const scenes = destination ? getScenesForDestination(destination.slug, placeParam) : listFeatured360Scenes(12);

  const activeScene =
    scenes.find((scene) => scene.id === sceneParam)
    || (placeParam ? scenes.find((scene) => scene.placeName && slugify(scene.placeName) === slugify(placeParam)) : null)
    || scenes[0];

  return (
    <MarketingPage
      eyebrow={t("explore360.eyebrow")}
      title={destination ? t("explore360.titleFor", { name: destination.name }) : t("explore360.title")}
      intro={destination ? t("explore360.introFor", { name: destination.name }) : t("explore360.intro")}
      artTheme="explore"
    >
      {!destination ? (
        <form className="filter-panel destination-filter" action={pathFor("/explore-360", active)} method="get">
          <input name="destination" placeholder={t("explore360.placeholder")} aria-label={t("explore360.label")} />
          <button type="submit">{t("explore360.submit")}</button>
        </form>
      ) : (
        <nav className="destination-actions" aria-label={t("explore360.linksAria")}>
          <Link href={pathFor(`/destinations/${destination.slug}`, active)}>{t("explore360.destinationPage")}</Link>
          <Link href={pathFor(`/search?destination=${encodeURIComponent(destination.name)}`, active)}>{t("common.searchStays")}</Link>
          <Link href={pathFor(`/stays?city=${encodeURIComponent(destination.name)}`, active)}>{t("common.stays")}</Link>
          <Link href={pathFor("/explore-360", active)}>{t("explore360.allScenes")}</Link>
        </nav>
      )}

      {activeScene ? (
        <PanoramaViewer title={activeScene.title} description={activeScene.description} imageUrl={activeScene.imageUrl} />
      ) : (
        <p className="search-empty">{t("explore360.empty")}</p>
      )}

      <section className="scene-picker" aria-label={t("explore360.featured")}>
        <h2>{destination ? t("explore360.scenesFor", { name: destination.name }) : t("explore360.featured")}</h2>
        <div className="scene-picker-list">
          {scenes.map((scene) => (
            <Link
              key={scene.id}
              className={scene.id === activeScene?.id ? "active" : ""}
              href={destination
                ? pathFor(`/explore-360?destination=${destination.slug}&scene=${encodeURIComponent(scene.id)}${scene.placeName ? `&place=${encodeURIComponent(scene.placeName)}` : ""}`, active)
                : pathFor(`/explore-360?destination=${scene.wilayaSlug}&scene=${encodeURIComponent(scene.id)}`, active)}
            >
              <strong>{scene.title}</strong>
              <span>{scene.wilayaName} · {scene.kind}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="callout">
        <div>
          <h2>{t("explore360.partnerTitle")}</h2>
          <p>{t("explore360.partnerText")}</p>
        </div>
        <Link href={pathFor("/partner/studio", active)}>{t("explore360.openStudio")}</Link>
      </section>
    </MarketingPage>
  );
}
