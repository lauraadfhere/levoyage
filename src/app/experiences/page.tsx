import Link from "next/link";
import { MarketingPage } from "@/components/site-chrome";

const experiences = [
  {
    title: "Tassili sunrise excursion",
    meta: "DJANET · 1 DAY",
    detail: "A local-guided route through the desert at first light.",
    price: "From 9,500 DZD",
    slug: "djanet",
  },
  {
    title: "The Casbah, with a local guide",
    meta: "ALGIERS · 3 HOURS",
    detail: "Architecture, stories and hidden corners in the old city.",
    price: "From 4,500 DZD",
    slug: "algiers",
  },
  {
    title: "Oran food walk",
    meta: "ORAN · 4 HOURS",
    detail: "Taste coastal flavours and meet the people behind them.",
    price: "From 5,000 DZD",
    slug: "oran",
  },
  {
    title: "Tipaza heritage coast",
    meta: "TIPAZA · HALF DAY",
    detail: "Roman ruins meeting the Mediterranean — explore before you go.",
    price: "From 6,200 DZD",
    slug: "tipaza",
  },
  {
    title: "Constantine bridge views",
    meta: "CONSTANTINE · 2 HOURS",
    detail: "Clifftop outlooks and city stories above the Rhumel.",
    price: "From 3,800 DZD",
    slug: "constantine",
  },
  {
    title: "Ghardaïa oasis walk",
    meta: "GHARDAÏA · 3 HOURS",
    detail: "Ksour lanes, markets and M’Zab valley atmosphere.",
    price: "From 4,200 DZD",
    slug: "ghardaia",
  },
];

export default function ExperiencesPage() {
  return (
    <MarketingPage
      eyebrow="THINGS TO DO"
      title="Meet Algeria beyond the map."
      intro="Choose cultural tours, nature escapes and local experiences — each one links to a destination page and 360° / VR preview."
    >
      <div className="offers-grid">
        {experiences.map((item) => (
          <article className="offer-card" key={item.title}>
            <div className="offer-image">{item.slug[0].toUpperCase()}</div>
            <div>
              <p className="offer-type">{item.meta}</p>
              <h3>{item.title}</h3>
              <p className="agency">{item.detail}</p>
              <strong>{item.price}</strong>
              <div className="place-card-actions">
                <Link href={`/destinations/${item.slug}`}>Destination</Link>
                <Link href={`/explore-360?destination=${item.slug}`}>360° / VR</Link>
                <Link href={`/planner?destination=${encodeURIComponent(item.slug)}`}>Add to plan</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </MarketingPage>
  );
}
