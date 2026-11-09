import Link from "next/link";
import { MarketingPage } from "@/components/site-chrome";
import { getWilayas } from "@/lib/destinations-catalog";

export const metadata = { title: "Locations in Algeria" };

const categories = [
  { href: "/destinations", label: "Wilayas", note: "Browse all 58 wilayas" },
  { href: "/stays", label: "Stays", note: "Hotels, villas, apartments and more" },
  { href: "/explore-360", label: "Places of interest", note: "Explore sites in 360°" },
];

export default function LocationsPage() {
  const wilayas = getWilayas();
  return (
    <MarketingPage
      eyebrow="Algeria"
      title="Locations"
      intro="Start with a country, then drill down to regions, wilayas (cities), and the places and stays inside them."
      artTheme="planner"
    >
      <section className="scene-picker" aria-label="Browse by category">
        <h2>Browse by category</h2>
        <div className="scene-picker-list">
          {categories.map((item) => (
            <Link key={item.href} href={item.href}>
              <strong>{item.label}</strong>
              <span>{item.note}</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="scene-picker" aria-label="Wilayas">
        <h2>Wilayas</h2>
        <div className="scene-picker-list">
          {wilayas.map((wilaya) => (
            <Link key={wilaya.slug} href={`/destinations/${wilaya.slug}`}>
              <strong>{wilaya.name}</strong>
              <span>{wilaya.placeCount} places</span>
            </Link>
          ))}
        </div>
      </section>
    </MarketingPage>
  );
}
