"use client";

import { HeroDesignArt } from "@/components/hero-design-art";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import wilayaImages from "@/lib/wilaya-images.generated.json";
import { HeaderAccount } from "@/components/header-account";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { SiteFooter } from "@/components/site-chrome";
import { slugify } from "@/lib/slug";

type Language = "en" | "fr" | "ar";
const copy = {
  en: {
    nav: ["Stays", "Explore", "Things to do", "Travel agencies"],
    hero: "Discover Algeria, your way",
    sub: "Hotels, local tours and trusted agency offers across Algeria.",
    destination: "Where in Algeria?",
    placeholder: "Algiers, Oran, Djanet, Constantine...",
    dates: "Select dates",
    guests: "Travellers",
    search: "Search",
    agencies: "For travel agencies",
    list: "List your offer",
    offers: "Featured Algeria offers",
    explore: "Explore Algeria with confidence",
    register: "Register",
    signIn: "Sign in",
  },
  fr: {
    nav: ["Séjours", "Explorer", "Activités", "Agences de voyage"],
    hero: "Découvrez l'Algérie à votre façon",
    sub: "Hôtels, circuits locaux et offres d'agences de confiance en Algérie.",
    destination: "Où allez-vous en Algérie ?",
    placeholder: "Alger, Oran, Djanet, Constantine...",
    dates: "Choisir les dates",
    guests: "Voyageurs",
    search: "Rechercher",
    agencies: "Pour les agences",
    list: "Publier une offre",
    offers: "Offres Algérie à la une",
    explore: "Explorez l'Algérie en toute confiance",
    register: "S'inscrire",
    signIn: "Connexion",
  },
  ar: {
    nav: ["إقامات", "استكشاف", "أنشطة", "وكالات سياحية"],
    hero: "اكتشف الجزائر بطريقتك",
    sub: "فنادق وجولات محلية وعروض وكالات موثوقة في كل أنحاء الجزائر.",
    destination: "إلى أين في الجزائر؟",
    placeholder: "الجزائر، وهران، جانت، قسنطينة...",
    dates: "اختر التواريخ",
    guests: "المسافرون",
    search: "ابحث",
    agencies: "للوكالات السياحية",
    list: "أضف عرضك",
    offers: "عروض الجزائر المميزة",
    explore: "اكتشف الجزائر بثقة",
    register: "إنشاء حساب",
    signIn: "تسجيل الدخول",
  },
} as const;
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

function regionFor(name: string) {
  if (/djanet|tamanrasset|illizi|tindouf|adrar|in salah|in guezzam|bordj badji/i.test(name)) return "Sahara";
  if (/algiers|oran|annaba|bejaia|béjaïa|skikda|tipaza|mostaganem|jijel|el tarf|ain temouchent|aïn témouchent/i.test(name)) return "Coast";
  if (/tizi|bejaia|béjaïa|bouira|boumerdes|boumerdès|setif|sétif|mila|jijel/i.test(name)) return "Mountains";
  return "Heritage";
}

const offers = [
  {
    place: "Djanet & Tassili n'Ajjer",
    type: "Desert circuit",
    price: "From 48,000 DZD",
    agency: "Sahara Horizons",
    slug: "djanet",
    image: placeImages[2],
  },
  {
    place: "Algiers city break",
    type: "Hotel + guided Casbah",
    price: "From 18,500 DZD",
    agency: "Atlas Voyages",
    slug: "algiers",
    image: placeImages[0],
  },
  {
    place: "Oran & the west coast",
    type: "Weekend escape",
    price: "From 22,000 DZD",
    agency: "Oran Travel",
    slug: "oran",
    image: placeImages[1],
  },
];

function WilayaShowcase() {
  const [start, setStart] = useState(0);
  const visibleCount = 4;
  const shown = Array.from({ length: visibleCount }, (_, index) => {
    const number = ((start + index) % wilayas.length) + 1;
    const name = wilayas[(start + index) % wilayas.length];
    return {
      name,
      number,
      region: regionFor(name),
      image: (wilayaImages as Record<string, { url: string }>)[slugify(name)]?.url ?? null,
      slug: slugify(name),
    };
  });
  const move = (amount: number) =>
    setStart((value) => (value + amount + wilayas.length) % wilayas.length);
  return (
    <section className="wilaya-section" aria-labelledby="wilaya-heading">
      <div className="wilaya-heading">
        <div>
          <p className="section-kicker">EXPLORE ALGERIA</p>
          <h2 id="wilaya-heading" className="wilaya-title-black">Every wilaya has a story to tell</h2>
          <p className="wilaya-subtitle-black">
            Pick a place, open its destination page, then explore in 360° / VR.
          </p>
        </div>
        <div className="wilaya-controls">
          <button type="button" onClick={() => move(-visibleCount)} aria-label="Previous wilayas">
            ←
          </button>
          <button type="button" onClick={() => move(visibleCount)} aria-label="Next wilayas">
            →
          </button>
          <Link href="/destinations">All locations</Link>
        </div>
      </div>
      <div className="wilaya-grid wilaya-featured place-cards">
        {shown.map(({ name, number, region, image, slug }) => (
          <article className="wilaya-card place-card" key={`${slug}-${number}`} style={image ? { ["--place-image" as string]: `url("${image}")` } : undefined}>
            <Link href={`/destinations/${slug}`} className="place-card-media" aria-label={`Open ${name}`}>
              <span className="wilaya-number">{String(number).padStart(2, "0")}</span>
              <small className="wilaya-availability"><i aria-hidden="true" />Available</small>
              <span className="place-card-badge">360° / VR</span>
            </Link>
            <div className="place-card-body">
              <p className="place-card-region">{region}</p>
              <Link href={`/destinations/${slug}`} className="place-card-title">{name}</Link>
              <p className="place-card-copy">Places, stays and immersive views from the Algeria catalog.</p>
              <div className="place-card-actions">
                <Link href={`/destinations/${slug}`}>Open page</Link>
                <Link href={`/explore-360?destination=${slug}`}>360° view</Link>
                <Link href={`/stays?city=${encodeURIComponent(name)}`}>Stays</Link>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="wilaya-progress">
        <span
          style={{
            width: `${Math.max(6, ((start + visibleCount) / wilayas.length) * 100)}%`,
          }}
        />
      </div>
    </section>
  );
}

export default function Home({ initialLanguage = "en" }: { initialLanguage?: Language }) {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [heroWord, setHeroWord] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const t = copy[language];
  const heroWords = { en: ["Algeria", "the coast", "the Sahara", "its heritage"], fr: ["l’Algérie", "la côte", "le Sahara", "son patrimoine"], ar: ["الجزائر", "الساحل", "الصحراء", "تراثها"] }[language];
  useEffect(() => { setHeroWord(0); const timer = window.setInterval(() => setHeroWord(value => (value + 1) % heroWords.length), 2600); return () => window.clearInterval(timer); }, [language, heroWords.length]);
  return (
    <div dir={language === "ar" ? "rtl" : "ltr"}>
      <section className="hero">
        <div className="shell">
          <header className="topbar">
            <a className="brand" href="#top" aria-label="Le Voyage home">
              <Image
                src="/levoyage-white.png"
                alt="Le Voyage"
                width={192}
                height={64}
                priority
              />
            </a>
            <nav aria-label="Main navigation" className="topnav">
              {t.nav.map((item, index) => (
                <Link href={navHrefs[index]} key={item}>
                  {item}
                </Link>
              ))}
            </nav>
            <form className={`header-search${searchOpen ? " is-open" : ""}`} action="/search" method="get" role="search">
              <label className="sr-only" htmlFor="header-search-input">{t.search}</label>
              <input id="header-search-input" name="destination" type="search" placeholder={t.search} autoComplete="off" />
              <button
                type={searchOpen ? "submit" : "button"}
                aria-label={t.search}
                aria-expanded={searchOpen}
                aria-controls="header-search-input"
                onClick={() => setSearchOpen(true)}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" /><path d="M20 20l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
              </button>
            </form>
            <div className="account-actions">
              <Link href="/partner">{t.agencies}</Link>
              <LocaleSwitcher /><HeaderAccount />
            </div>
          </header>
          <nav aria-label="Travel categories" className="travel-nav">
            {t.nav.map((item, index) => (
              <Link
                className={index === 0 ? "active" : ""}
                href={navHrefs[index]}
                key={item}
              >
                <span aria-hidden="true">{["⌂", "✈", "✦", "◉"][index]}</span>
                {item}
              </Link>
            ))}
          </nav>
          <div className="headline" id="top">
            <p className="eyebrow">ALGERIA TRAVEL PLATFORM</p>
            <h1><span className="hero-prefix">{language === "ar" ? "اكتشف" : language === "fr" ? "Découvrez" : "Discover"}</span> <span className="hero-word" key={heroWords[heroWord]}>{heroWords[heroWord]}</span><span>{language === "ar" ? " بطريقتك" : language === "fr" ? " à votre façon" : ", your way"}</span></h1>
            <p>{t.sub}</p>
          </div>
          <div className="hero-algeria-image" aria-hidden="true"><HeroDesignArt /></div>
          <div className="hero-discovery" aria-label="Start exploring">
            <Link className="hero-discovery-primary" href="/explore-360">{language === "ar" ? "استكشف بتقنية 360°" : language === "fr" ? "Explorer en 360°" : "Explore in 360°"}</Link>
            <Link className="hero-discovery-link" href="/destinations">{language === "ar" ? "تصفح الوجهات" : language === "fr" ? "Parcourir les destinations" : "Browse destinations"}</Link>
            <Link className="hero-discovery-link" href="/tripyai">{language === "ar" ? "اسأل TRRIPYAI" : language === "fr" ? "Demander à TRRIPYAI" : "Ask TRRIPYAI"}</Link>
          </div>
        </div>
      </section>
      <main className="shell content">
        <WilayaShowcase />
        <section className="home-feature-strip" aria-label="Core features">
          <Link href="/destinations"><strong>Destinations</strong><span>69 wilayas</span></Link>
          <Link href="/explore-360"><strong>360° / VR</strong><span>Look around</span></Link>
          <Link href="/stays"><strong>Stays</strong><span>Hotels & camps</span></Link>
          <Link href="/experiences"><strong>Experiences</strong><span>Things to do</span></Link>
          <Link href="/planner"><strong>Planner</strong><span>Build a trip</span></Link>
          <Link href="/tripyai"><strong>TRRIPYAI</strong><span>Ask & discover</span></Link>
        </section>

        <section id="offers" className="home-offers">
          <div className="wilaya-heading">
            <div>
              <p className="section-kicker">ALGERIA, CURATED</p>
              <h2>{t.offers}</h2>
            </div>
            <Link className="wilaya-all" href="/search">Search all offers</Link>
          </div>
          <div className="offers-grid">
            {offers.map((offer) => (
              <article className="offer-card home-offer-card" key={offer.place}>
                <div className="offer-image" style={{ backgroundImage: `linear-gradient(180deg, #061c4c33, #061c4c88), url("${offer.image}")` }}>
                  <span>360°</span>
                </div>
                <div>
                  <p className="offer-type">{offer.type}</p>
                  <h3>{offer.place}</h3>
                  <p className="agency">{offer.agency}</p>
                  <strong>{offer.price}</strong>
                  <div className="place-card-actions">
                    <Link href={`/destinations/${offer.slug}`}>Destination</Link>
                    <Link href={`/explore-360?destination=${offer.slug}`}>360° / VR</Link>
                    <Link href={`/search?destination=${encodeURIComponent(offer.place)}`}>Book search</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="agency-banner" id="agencies">
          <div>
            <p className="section-kicker">{t.agencies}</p>
            <h2>{t.explore}</h2>
            <p>
              Publish packages, ticket prices and seasonal offers for travellers
              looking for Algeria.
            </p>
          </div>
          <Link href="/partner">{t.list}</Link>
        </section>
      </main>
      {false && (
        <footer className="site-footer">
          <div className="shell">
            <div className="footer-brand">ALGERIA TRAVEL PLATFORM</div>
            <div className="footer-bottom">
              <span>🇩🇿 DZD</span>
              <span>© 2026 Le Voyage · Algeria Travel Platform</span>
            </div>
          </div>
        </footer>
      )}
      <SiteFooter />
    </div>
  );
}
