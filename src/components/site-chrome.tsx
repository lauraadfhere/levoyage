import Image from "next/image";
import type { ReactNode } from "react";
import { HeaderAccount } from "@/components/header-account";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { LocalizedLink } from "@/components/localized-link";

const links = [["Explore", "/explore"], ["360° Explore", "/explore-360"], ["Destinations", "/destinations"], ["Stays", "/stays"], ["Things to do", "/experiences"], ["Travel guide", "/guide"]] as const;

const footerTopLinks = [
  ["Countries", "/destinations"],
  ["Regions", "/destinations"],
  ["Cities", "/destinations"],
  ["Districts", "/destinations"],
  ["Airports", "/explore"],
  ["Hotels", "/stays"],
  ["Places of interest", "/explore"],
  ["Vacation Homes", "/stays"],
  ["Apartments", "/stays"],
  ["Resorts", "/stays"],
  ["Villas", "/stays"],
  ["Hostels", "/stays"],
  ["B&Bs", "/stays"],
  ["Guest Houses", "/stays"],
  ["Unique places to stay", "/experiences"],
  ["All destinations", "/destinations"],
] as const;

const footerSecondaryLinks = [
  ["All flight destinations", "/explore"],
  ["All car rental locations", "/explore"],
  ["All vacation destinations", "/destinations"],
  ["Guides", "/guide"],
  ["Discover", "/explore"],
  ["Discover monthly stays", "/stays"],
] as const;

const footerColumns = [
  {
    title: "Support",
    items: [
      ["Manage your trips", "/bookings"],
      ["Contact Customer Service", "/contact"],
      ["Safety Resource Center", "/guide"],
    ],
  },
  {
    title: "Discover",
    items: [
      ["Genius loyalty program", "/about"],
      ["Seasonal and holiday deals", "/experiences"],
      ["Travel articles", "/guide"],
      ["Le Voyage for Business", "/partner"],
      ["Traveller Review Awards", "/about"],
      ["Car rental", "/explore"],
      ["Flight finder", "/explore"],
      ["Restaurant reservations", "/experiences"],
      ["Le Voyage for Travel Agents", "/partner"],
    ],
  },
  {
    title: "Terms and settings",
    items: [
      ["Privacy Notice", "/privacy"],
      ["Terms of Service", "/terms"],
      ["Accessibility Statement", "/about"],
      ["Partner dispute", "/contact"],
      ["Modern Slavery Statement", "/about"],
      ["Human Rights Statement", "/about"],
    ],
  },
  {
    title: "Partners",
    items: [
      ["Extranet login", "/partner"],
      ["Partner help", "/contact"],
      ["List your property", "/partner"],
      ["Become an affiliate", "/partner"],
    ],
  },
  {
    title: "About",
    items: [
      ["About Le Voyage", "/about"],
      ["How We Work", "/about"],
      ["Sustainability", "/about"],
      ["Press center", "/contact"],
      ["Careers", "/contact"],
      ["Investor relations", "/about"],
      ["Corporate contact", "/contact"],
      ["Content guidelines and reporting", "/privacy"],
    ],
  },
] as const;

export function SiteHeader() {
  return (
    <header className="inner-header">
      <div className="shell inner-header-row">
        <LocalizedLink className="brand" href="/" aria-label="Le Voyage home">
          <Image src="/levoyage.png" alt="Le Voyage" width={192} height={64} priority />
        </LocalizedLink>
        <nav className="inner-nav" aria-label="Main navigation">
          {links.map(([label, href]) => (
            <LocalizedLink key={href} href={href}>{label}</LocalizedLink>
          ))}
        </nav>
        <div className="inner-actions">
          <LocalizedLink className="dashboard-return" href="/dashboard">← Dashboard</LocalizedLink>
          <LocalizedLink href="/planner">AI Planner</LocalizedLink>
          <LocalizedLink className="partner-link" href="/partner">Partner</LocalizedLink>
          <LocaleSwitcher />
          <HeaderAccount />
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <nav className="footer-toplinks" aria-label="Destination links">
          <div className="footer-toplinks-row">
            {footerTopLinks.map(([label, href]) => (
              <LocalizedLink key={label} href={href}>{label}</LocalizedLink>
            ))}
          </div>
          <div className="footer-toplinks-row">
            {footerSecondaryLinks.map(([label, href]) => (
              <LocalizedLink key={label} href={href}>{label}</LocalizedLink>
            ))}
          </div>
        </nav>

        <div className="footer-columns">
          {footerColumns.map((column) => (
            <section key={column.title}>
              <h3>{column.title}</h3>
              {column.items.map(([label, href]) => (
                <LocalizedLink key={label} href={href}>{label}</LocalizedLink>
              ))}
            </section>
          ))}
        </div>

        <div className="footer-locale" aria-label="Language and currency">
          <span className="footer-flag" aria-hidden="true">🇺🇸</span>
          <span>DZD</span>
        </div>

        <div className="footer-bottom">
          <p>
            Le Voyage helps travellers discover Algeria with verified stays, tours and local experiences.
            Copyright © 2024–{year} Le Voyage™. All rights reserved.
          </p>
          <div className="footer-brands" aria-label="Le Voyage brands">
            <LocalizedLink href="/" className="footer-brand-mark">Le Voyage</LocalizedLink>
            <span className="footer-brand-mark brand-veyyri">Veyyri</span>
            <span className="footer-brand-mark brand-tripy">TRRIPYAI</span>
            <span className="footer-brand-mark brand-explore">Explore DZ</span>
            <span className="footer-brand-mark brand-stays">Stays+</span>
          </div>
          <nav className="footer-social" aria-label="Le Voyage social channels">
            <a href="#facebook" aria-label="Facebook">f</a>
            <a href="#x" aria-label="X">𝕏</a>
            <a href="#youtube" aria-label="YouTube">▶</a>
            <a href="#linkedin" aria-label="LinkedIn">in</a>
            <a href="#instagram" aria-label="Instagram">◎</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export function MarketingPage({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: ReactNode }) {
  const artTheme = eyebrow.toLowerCase().includes("stay")
    ? "stays"
    : eyebrow.toLowerCase().includes("experience")
      ? "experiences"
      : eyebrow.toLowerCase().includes("guide")
        ? "guide"
        : eyebrow.toLowerCase().includes("destination")
          ? "destinations"
          : "explore";
  return (
    <>
      <SiteHeader />
      <main className="marketing-page">
        <section className="page-intro">
          <div className="shell">
            <div className="page-intro-copy">
              <p className="section-kicker">{eyebrow}</p>
              <h1>{title}</h1>
              <p>{intro}</p>
            </div>
            <div className={`page-intro-art art-${artTheme}`} aria-hidden="true">
              <span className="intro-sun" />
              <span className="intro-arch" />
              <span className="intro-dune dune-one" />
              <span className="intro-dune dune-two" />
            </div>
          </div>
        </section>
        <div className="shell page-content">{children}</div>
      </main>
      <SiteFooter />
    </>
  );
}
