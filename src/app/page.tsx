"use client";

import { HeroDesignArt } from "@/components/hero-design-art";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import wilayaImages from "@/lib/wilaya-images.generated.json";
import { HeaderAccount } from "@/components/header-account";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { SiteFooter } from "@/components/site-chrome";
import { slugify } from "@/lib/slug";
import { createTranslator, dirFor, type Locale } from "@/lib/i18n";

type Language = Locale;
const navHrefs = ["/stays", "/explore", "/experiences", "/partner"];
const wilayas = [
  "Adrar",
  "Chlef",
  "Laghouat",
  "Oum El Bouaghi",
  "Batna",
  "Béjaïa",
  "Biskra",
  "Béchar",
  "Blida",
  "Bouira",
  "Tamanrasset",
  "Tébessa",
  "Tlemcen",
  "Tiaret",
  "Tizi Ouzou",
  "Algiers",
  "Djelfa",
  "Jijel",
  "Sétif",
  "Saïda",
  "Skikda",
  "Sidi Bel Abbès",
  "Annaba",
  "Guelma",
  "Constantine",
  "Médéa",
  "Mostaganem",
  "M'Sila",
  "Mascara",
  "Ouargla",
  "Oran",
  "El Bayadh",
  "Illizi",
  "Bordj Bou Arréridj",
  "Boumerdès",
  "El Tarf",
  "Tindouf",
  "Tissemsilt",
  "El Oued",
  "Khenchela",
  "Souk Ahras",
  "Tipaza",
  "Mila",
  "Aïn Defla",
  "Naâma",
  "Aïn Témouchent",
  "Ghardaïa",
  "Relizane",
  "Timimoun",
  "Bordj Badji Mokhtar",
  "Ouled Djellal",
  "Béni Abbès",
  "In Salah",
  "In Guezzam",
  "Touggourt",
  "Djanet",
  "El M'Ghair",
  "El Meniaa",
  "Aflou",
  "Barika",
  "El Kantara",
  "Bir El Ater",
  "El Aricha",
  "Ksar Chellala",
  "Aïn Oussara",
  "Messaad",
  "Ksar El Boukhari",
  "Bou Saâda",
  "El Abiodh Sidi Cheikh",
];
const placeImages = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Alger_vue_generale.jpg/800px-Alger_vue_generale.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Oran_front_de_mer.jpg/800px-Oran_front_de_mer.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Tassili_n%27Ajjer_National_Park.jpg/800px-Tassili_n%27Ajjer_National_Park.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Constantine_Algeria.jpg/800px-Constantine_Algeria.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Ghardaia.jpg/800px-Ghardaia.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/B%C3%A9jaia_%D8%A8%D8%AC%D8%A7%D9%8A%D8%A9_09.jpg/800px-B%C3%A9jaia_%D8%A8%D8%AC%D8%A7%D9%8A%D8%A9_09.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Tipasa.jpg/800px-Tipasa.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Assekrem.jpg/800px-Assekrem.jpg",
];

function regionKeyFor(name: string): "home.regionSahara" | "home.regionCoast" | "home.regionMountains" | "home.regionHeritage" {
  if (/djanet|tamanrasset|illizi|tindouf|adrar|in salah|in guezzam|bordj badji/i.test(name)) return "home.regionSahara";
  if (/algiers|oran|annaba|bejaia|béjaïa|skikda|tipaza|mostaganem|jijel|el tarf|ain temouchent|aïn témouchent/i.test(name)) return "home.regionCoast";
  if (/tizi|bejaia|béjaïa|bouira|boumerdes|boumerdès|setif|sétif|mila|jijel/i.test(name)) return "home.regionMountains";
  return "home.regionHeritage";
}

const offers = [
  { placeKey: "home.offer1p", typeKey: "home.offer1t", priceKey: "home.offer1price", agency: "Sahara Horizons", slug: "djanet", image: placeImages[2] },
  { placeKey: "home.offer2p", typeKey: "home.offer2t", priceKey: "home.offer2price", agency: "Atlas Voyages", slug: "algiers", image: placeImages[0] },
  { placeKey: "home.offer3p", typeKey: "home.offer3t", priceKey: "home.offer3price", agency: "Oran Travel", slug: "oran", image: placeImages[1] },
] as const;

const featureKeys = [
  ["home.f1t", "home.f1s", "/destinations", "destinations"],
  ["home.f2t", "home.f2s", "/explore-360", "vr"],
  ["home.f3t", "home.f3s", "/stays", "stays"],
  ["home.f4t", "home.f4s", "/experiences", "experiences"],
  ["home.f5t", "home.f5s", "/planner", "planner"],
  ["home.f6t", "home.f6s", "/tripyai", "tripyai"],
] as const;

const featureIcons: Record<string, ReactNode> = {
  destinations: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" /><circle cx="12" cy="10" r="2.6" /></svg>,
  vr: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="2.5" y="7" width="19" height="11" rx="4" /><circle cx="7.8" cy="12.5" r="1.9" /><circle cx="16.2" cy="12.5" r="1.9" /></svg>,
  stays: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M3 19v-7h18v7M3 12V7M3 12h18" /><path d="M7 12V9.5h4.5V12" /><path d="M21 16H3" /></svg>,
  experiences: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3.5 2.1 5.4 5.4.4-4.1 3.6 1.3 5.3L12 15.4l-4.7 2.8 1.3-5.3-4.1-3.6 5.4-.4Z" /></svg>,
  planner: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3.5" y="5.5" width="17" height="15" rx="2.5" /><path d="M3.5 10h17M8.5 3.5v4M15.5 3.5v4" /><path d="m9 14.5 2 2 4-4" /></svg>,
  tripyai: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5.5h16v10.5H9.5L4 20Z" /><path d="M8.5 10.5h7" /></svg>,
};

function WilayaShowcase({ locale }: { locale: Language }) {
  const t = createTranslator(locale);
  const [start, setStart] = useState(0);
  const visibleCount = 4;
  const shown = Array.from({ length: visibleCount }, (_, index) => {
    const number = ((start + index) % wilayas.length) + 1;
    const name = wilayas[(start + index) % wilayas.length];
    return {
      name,
      number,
      region: t(regionKeyFor(name)),
      image: (wilayaImages as Record<string, { url: string }>)[slugify(name)]?.url ?? null,
      slug: slugify(name),
    };
  });
  const move = (amount: number) => setStart((value) => (value + amount + wilayas.length) % wilayas.length);
  return (
    <section className="wilaya-section" aria-labelledby="wilaya-heading">
      <div className="wilaya-heading">
        <div>
          <p className="section-kicker">{t("home.wilayaKicker")}</p>
          <h2 id="wilaya-heading" className="wilaya-title-black">{t("home.wilayaTitle")}</h2>
          <p className="wilaya-subtitle-black">{t("home.wilayaSub")}</p>
        </div>
        <div className="wilaya-controls">
          <button type="button" onClick={() => move(-visibleCount)} aria-label={t("home.prevWilaya")}>←</button>
          <button type="button" onClick={() => move(visibleCount)} aria-label={t("home.nextWilaya")}>→</button>
          <Link href="/destinations">{t("home.allLocations")}</Link>
        </div>
      </div>
      <div className="wilaya-grid wilaya-featured place-cards">
        {shown.map(({ name, number, region, image, slug }) => (
          <article className="wilaya-card place-card" key={`${slug}-${number}`} style={image ? { ["--place-image" as string]: `url("${image}")` } : undefined}>
            <Link href={`/destinations/${slug}`} className="place-card-media" aria-label={`${t("home.openPage")} · ${name}`}>
              <span className="wilaya-number">{String(number).padStart(2, "0")}</span>
              <small className="wilaya-availability"><i aria-hidden="true" />{t("home.available")}</small>
              <span className="place-card-badge">360° / VR</span>
            </Link>
            <div className="place-card-body">
              <p className="place-card-region">{region}</p>
              <Link href={`/destinations/${slug}`} className="place-card-title">{name}</Link>
              <p className="place-card-copy">{t("home.placeCopy")}</p>
              <div className="place-card-actions">
                <Link href={`/destinations/${slug}`}>{t("home.openPage")}</Link>
                <Link href={`/explore-360?destination=${slug}`}>{t("home.view360")}</Link>
                <Link href={`/stays?city=${encodeURIComponent(name)}`}>{t("home.staysLabel")}</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="wilaya-progress">
        <span style={{ width: `${Math.max(6, ((start + visibleCount) / wilayas.length) * 100)}%` }} />
      </div>
    </section>
  );
}

export default function Home({ initialLanguage = "en" }: { initialLanguage?: Language }) {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const t = createTranslator(language);
  const [heroWord, setHeroWord] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const heroWords = [t("home.word1"), t("home.word2"), t("home.word3"), t("home.word4")];
  useEffect(() => {
    setHeroWord(0);
    const timer = window.setInterval(() => setHeroWord((value) => (value + 1) % 4), 2600);
    return () => window.clearInterval(timer);
  }, [language]);
  useEffect(() => setLanguage(initialLanguage), [initialLanguage]);

  return (
    <div dir={dirFor(language)} lang={language}>
      <section className="hero">
        <div className="shell">
          <header className="topbar">
            <a className="brand" href="#top" aria-label="Le Voyage home">
              <Image src="/levoyage-white.png" alt="Le Voyage" width={192} height={64} priority />
            </a>
            <nav aria-label={t("header.mainNav")} className="topnav">
              {[t("header.stays"), t("header.explore"), t("header.thingsToDo"), t("home.agencies")].map((item, index) => (
                <Link href={navHrefs[index]} key={item}>{item}</Link>
              ))}
            </nav>
            <form className={`header-search${searchOpen ? " is-open" : ""}`} action="/search" method="get" role="search">
              <label className="sr-only" htmlFor="header-search-input">{t("common.search")}</label>
              <input id="header-search-input" name="destination" type="search" placeholder={t("home.searchPlaceholder")} autoComplete="off" />
              <button
                type={searchOpen ? "submit" : "button"}
                aria-label={t("common.search")}
                aria-expanded={searchOpen}
                aria-controls="header-search-input"
                onClick={() => setSearchOpen(true)}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M20 20l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
              </button>
            </form>
            <div className="account-actions">
              <Link href="/partner">{t("home.agencies")}</Link>
              <LocaleSwitcher /><HeaderAccount />
            </div>
          </header>
          <nav aria-label={t("home.featuresAria")} className="travel-nav">
            {[t("header.stays"), t("header.explore"), t("header.thingsToDo"), t("home.agencies")].map((item, index) => (
              <Link className={index === 0 ? "active" : ""} href={navHrefs[index]} key={item}>
                <span aria-hidden="true">{["⌂", "✈", "✦", "◉"][index]}</span>
                {item}
              </Link>
            ))}
          </nav>
          <div className="headline" id="top">
            <p className="eyebrow">{t("home.eyebrow")}</p>
            <h1>
              <span className="hero-prefix">{t("home.heroPrefix")}</span>{" "}
              <span className="hero-word hero-art-title" key={heroWords[heroWord]}>{heroWords[heroWord]}</span>
              <span>{t("home.heroSuffix")}</span>
            </h1>
            <p>{t("home.sub")}</p>
          </div>
          <div className="hero-algeria-image" aria-hidden="true"><HeroDesignArt /></div>
          <div className="hero-discovery" aria-label={t("home.heroAria")}>
            <Link className="hero-discovery-primary" href="/explore-360">{t("home.cta360")}</Link>
            <Link className="hero-discovery-link" href="/destinations"><span className="hero-link-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg></span>{t("home.ctaBrowse")}</Link>
            <Link className="hero-discovery-link" href="/tripyai"><span className="hero-link-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8z" /><path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z" /></svg></span>{t("home.ctaAsk")}</Link>
          </div>
        </div>
      </section>
      <main className="shell content">
        <WilayaShowcase locale={language} />
        <section className="home-feature-strip" aria-label={t("home.featuresAria")}>
          {featureKeys.map(([titleKey, subKey, href, icon]) => (
            <Link href={href} key={href}>
              <i className={`feature-icon feature-icon-${icon}`} aria-hidden="true">{featureIcons[icon]}</i>
              <strong>{t(titleKey)}</strong>
              <span>{t(subKey)}</span>
            </Link>
          ))}
        </section>

        <section id="offers" className="home-offers">
          <div className="wilaya-heading">
            <div>
              <p className="section-kicker">{t("home.offersKicker")}</p>
              <h2>{t("home.offersTitle")}</h2>
            </div>
            <Link className="wilaya-all" href="/search">{t("home.searchAllOffers")}</Link>
          </div>
          <div className="offers-grid">
            {offers.map((offer) => {
              const place = t(offer.placeKey);
              return (
                <article className="offer-card home-offer-card" key={offer.slug}>
                  <div className="offer-image" style={{ backgroundImage: `linear-gradient(180deg, #061c4c33, #061c4c88), url("${offer.image}")` }}>
                    <span>360°</span>
                  </div>
                  <div>
                    <p className="offer-type">{t(offer.typeKey)}</p>
                    <h3>{place}</h3>
                    <p className="agency">{offer.agency}</p>
                    <strong>{t(offer.priceKey)}</strong>
                    <div className="place-card-actions">
                      <Link href={`/destinations/${offer.slug}`}>{t("common.destination")}</Link>
                      <Link href={`/explore-360?destination=${offer.slug}`}>{t("common.view360")}</Link>
                      <Link href={`/search?destination=${encodeURIComponent(place)}`}>{t("home.bookSearch")}</Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
        <section className="agency-banner" id="agencies">
          <div>
            <p className="section-kicker">{t("home.agencies")}</p>
            <h2>{t("home.exploreTitle")}</h2>
            <p>{t("home.agencyText")}</p>
          </div>
          <Link href="/partner">{t("home.listOffer")}</Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
