import Link from "next/link";
import { MarketingPage } from "@/components/site-chrome";
import { createTranslator, localeOrDefault, pathFor } from "@/lib/i18n";

const experiences = [
  { title: "experiences.e1t", meta: "experiences.e1m", detail: "experiences.e1d", priceKey: "experiences.price1", slug: "djanet", category: "Nature", duration: "1 day" },
  { title: "experiences.e2t", meta: "experiences.e2m", detail: "experiences.e2d", priceKey: "experiences.price2", slug: "algiers", category: "Culture", duration: "Half day" },
  { title: "experiences.e3t", meta: "experiences.e3m", detail: "experiences.e3d", priceKey: "experiences.price3", slug: "oran", category: "Food", duration: "Evening" },
  { title: "experiences.e4t", meta: "experiences.e4m", detail: "experiences.e4d", priceKey: "experiences.price4", slug: "tipaza", category: "History", duration: "1 day" },
  { title: "experiences.e5t", meta: "experiences.e5m", detail: "experiences.e5d", priceKey: "experiences.price5", slug: "constantine", category: "Culture", duration: "1 day" },
  { title: "experiences.e6t", meta: "experiences.e6m", detail: "experiences.e6d", priceKey: "experiences.price6", slug: "ghardaia", category: "Nature", duration: "2 days" },
] as const;

const categories = ["All", "Nature", "Culture", "History", "Food"] as const;

const steps = [
  { n: "01", title: "Explore", text: "Browse experiences and preview each destination in 360°." },
  { n: "02", title: "Plan", text: "Add the ones you like to your trip plan and set your budget." },
  { n: "03", title: "Go", text: "Book with trusted local partners and travel with confidence." },
] as const;

export default function ExperiencesPage({ locale }: { locale?: string }) {
  const active = localeOrDefault(locale);
  const t = createTranslator(active);
  return (
    <MarketingPage
      eyebrow={t("experiences.eyebrow")}
      title={t("experiences.title")}
      intro={t("experiences.intro")}
      artTheme="experiences"
    >
      <section className="experiences-stats" aria-label="At a glance">
        <div><strong>6</strong><span>Curated experiences</span></div>
        <div><strong>4</strong><span>Themes to explore</span></div>
        <div><strong>360°</strong><span>Preview before you book</span></div>
      </section>

      <nav className="experiences-filters" aria-label="Filter by category">
        {categories.map((c, i) => (
          <span key={c} className={i === 0 ? "experiences-chip is-active" : "experiences-chip"}>{c}</span>
        ))}
      </nav>

      <div className="offers-grid">
        {experiences.map((item) => (
          <article className="offer-card experience-card" key={item.title}>
            <div className="offer-image experience-art">
              <span className="experience-badge">{item.category}</span>
              <span className="experience-initial">{item.slug[0].toUpperCase()}</span>
              <span className="experience-duration">{item.duration}</span>
            </div>
            <div>
              <p className="offer-type">{t(item.meta)}</p>
              <h3>{t(item.title)}</h3>
              <p className="agency">{t(item.detail)}</p>
              <strong>{t(item.priceKey)}</strong>
              <div className="place-card-actions">
                <Link href={pathFor(`/destinations/${item.slug}`, active)}>{t("common.destination")}</Link>
                <Link href={pathFor(`/explore-360?destination=${item.slug}`, active)}>{t("common.view360")}</Link>
                <Link href={pathFor(`/planner?destination=${encodeURIComponent(item.slug)}`, active)}>{t("experiences.addToPlan")}</Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="experiences-steps" aria-label="How it works">
        {steps.map((s) => (
          <div key={s.n}>
            <span>{s.n}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </div>
        ))}
      </section>

      <section className="experiences-cta">
        <div>
          <h2>Not sure where to start?</h2>
          <p>Build a trip around the experiences you love and see the total before you commit.</p>
        </div>
        <Link href={pathFor("/planner", active)}>Start planning</Link>
      </section>
    </MarketingPage>
  );
}
