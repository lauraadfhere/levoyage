import Link from "next/link";
import { MarketingPage } from "@/components/site-chrome";
import { getDestinationBySlug, getWilayas, searchDestinations } from "@/lib/destinations-catalog";
import { slugify } from "@/lib/slug";
import { createTranslator, localeOrDefault, pathFor } from "@/lib/i18n";

type SearchParams = Promise<{ destination?: string }>;

export default async function PlannerPage({ searchParams, locale }: { searchParams: SearchParams; locale?: string }) {
  const active = localeOrDefault(locale);
  const t = createTranslator(active);
  const params = await searchParams;
  const destinationName = params.destination?.trim() || "";
  const matched = destinationName ? searchDestinations(destinationName)[0] : null;
  const destination = destinationName
    ? getDestinationBySlug(slugify(destinationName)) || (matched ? getDestinationBySlug(matched.slug) : null)
    : null;

  const defaultText = destination
    ? t("planner.defaultFor", {
        name: destination.name,
        places: destination.places.slice(0, 3).map((place) => place.name).join(", ") || destination.name,
      })
    : t("planner.defaultExample");

  return (
    <MarketingPage
      eyebrow={t("planner.eyebrow")}
      title={destination ? t("planner.titleFor", { name: destination.name }) : t("planner.title")}
      intro={t("planner.intro")}
      artTheme="planner"
    >
      {destination ? (
        <nav className="destination-actions" aria-label={t("planner.linksAria")}>
          <Link href={pathFor(`/destinations/${destination.slug}`, active)}>{t("explore360.destinationPage")}</Link>
          <Link href={pathFor(`/explore-360?destination=${destination.slug}`, active)}>{t("common.view360")}</Link>
          <Link href={pathFor(`/stays?city=${encodeURIComponent(destination.name)}`, active)}>{t("common.stays")}</Link>
          <Link href={pathFor("/tripyai", active)}>{t("home.ctaAsk")}</Link>
        </nav>
      ) : null}

      <section className="planner-card">
        <label htmlFor="trip-request">{t("planner.prompt")}</label>
        <textarea id="trip-request" name="q" defaultValue={defaultText} placeholder={defaultText} readOnly={false} />
        <div className="destination-card-actions" style={{ marginTop: 12 }}>
          <Link className="primary-link" href={destination ? pathFor(`/destinations/${destination.slug}`, active) : pathFor("/destinations", active)}>
            {destination ? t("planner.openDestination", { name: destination.name }) : t("planner.chooseDestination")}
          </Link>
          <Link className="primary-link" href={pathFor("/tripyai", active)}>{t("planner.continue")}</Link>
        </div>
        <p>{t("planner.note")}</p>
      </section>

      <section className="scene-picker" aria-label={t("planner.suggestions")}>
        <h2>{destination ? t("planner.placesIn", { name: destination.name }) : t("planner.startFrom")}</h2>
        <div className="scene-picker-list">
          {destination
            ? destination.places.slice(0, 10).map((place) => (
                <Link key={place.name} href={pathFor(`/destinations/${destination.slug}?place=${encodeURIComponent(place.name)}`, active)}>
                  <strong>{place.name}</strong>
                  <span>{t("planner.openWith360")}</span>
                </Link>
              ))
            : getWilayas().slice(0, 12).map((wilaya) => (
                <Link key={wilaya.slug} href={pathFor(`/planner?destination=${encodeURIComponent(wilaya.name)}`, active)}>
                  <strong>{wilaya.name}</strong>
                  <span>{t("planner.planHere", { count: wilaya.placeCount })}</span>
                </Link>
              ))}
        </div>
      </section>
    </MarketingPage>
  );
}
