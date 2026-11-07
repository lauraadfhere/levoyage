import Link from "next/link";
import { MarketingPage } from "@/components/site-chrome";

const guides = [
  {
    title: "Three days in Algiers",
    meta: "CITY GUIDE",
    detail: "A thoughtful first itinerary for the capital.",
    slug: "algiers",
  },
  {
    title: "A guide to Djanet",
    meta: "SAHARA GUIDE",
    detail: "When to go, where to stay and what to see.",
    slug: "djanet",
  },
  {
    title: "Algeria’s coastal weekends",
    meta: "TRAVEL IDEA",
    detail: "Easy escapes around Oran, Béjaïa and Jijel.",
    slug: "oran",
  },
];

export default function GuidePage() {
  return (
    <MarketingPage
      eyebrow="TRAVEL GUIDE"
      title="Ideas for seeing Algeria well."
      intro="Editorial guides built around real destinations — open the page, preview in 360°, then plan stays."
    >
      <div className="catalog-grid">
        {guides.map((guide) => (
          <article className="catalog-card" key={guide.title}>
            <div className="catalog-image"><span>GUIDE</span></div>
            <div className="catalog-copy">
              <p>{guide.meta}</p>
              <h2>{guide.title}</h2>
              <p className="catalog-detail">{guide.detail}</p>
              <div className="destination-card-actions">
                <Link href={`/destinations/${guide.slug}`}>Open destination</Link>
                <Link href={`/explore-360?destination=${guide.slug}`}>360°</Link>
                <Link href={`/planner?destination=${guide.slug}`}>Plan</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </MarketingPage>
  );
}
