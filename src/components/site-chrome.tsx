"use client";
import Image from "next/image";
import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { HeaderAccount } from "@/components/header-account";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { LocalizedLink } from "@/components/localized-link";
import { createTranslator, localeFromPath } from "@/lib/i18n";

const headerLinks = [
  ["header.explore", "/explore"],
  ["header.explore360", "/explore-360"],
  ["header.destinations", "/destinations"],
  ["header.stays", "/stays"],
  ["header.thingsToDo", "/experiences"],
  ["header.guide", "/guide"],
] as const;

const footerLegalLinks = [
  ["footer.col.service", "/terms"],
  ["footer.col.privacy", "/privacy"],
  ["footer.col.content", "/privacy"],
] as const;

const footerColumns = [
  {
    title: "footer.col.support",
    items: [
      ["footer.col.manageTrips", "/bookings"],
      ["footer.col.contactService", "/contact"],
      ["footer.col.safety", "/guide"],
    ],
  },
  {
    title: "footer.col.discover",
    items: [
      ["footer.col.genius", "/about"],
      ["footer.col.seasonal", "/experiences"],
      ["footer.col.articles", "/guide"],
      ["footer.col.business", "/partner"],
      ["footer.col.awards", "/about"],
      ["footer.col.carRental", "/explore"],
      ["footer.col.flightFinder", "/explore"],
      ["footer.col.restaurants", "/experiences"],
      ["footer.col.agents", "/partner"],
    ],
  },
  {
    title: "footer.col.terms",
    items: [
      ["footer.col.privacy", "/privacy"],
      ["footer.col.service", "/terms"],
      ["footer.col.accessibility", "/about"],
      ["footer.col.dispute", "/contact"],
      ["footer.col.slavery", "/about"],
      ["footer.col.humanRights", "/about"],
    ],
  },
  {
    title: "footer.col.partners",
    items: [
      ["footer.col.extranet", "/partner"],
      ["footer.col.partnerHelp", "/contact"],
      ["footer.col.listProperty", "/partner"],
      ["footer.col.affiliate", "/partner"],
    ],
  },
  {
    title: "footer.col.about",
    items: [
      ["footer.col.aboutUs", "/about"],
      ["footer.col.howWeWork", "/about"],
      ["footer.col.sustainability", "/about"],
      ["footer.col.press", "/contact"],
      ["footer.col.careers", "/contact"],
      ["footer.col.investors", "/about"],
      ["footer.col.corporate", "/contact"],
      ["footer.col.content", "/privacy"],
    ],
  },
] as const;

export function SiteHeader({ variant }: { variant?: "dashboard" } = {}) {
  const t = createTranslator(localeFromPath(usePathname()));
  return (
    <header className={variant === "dashboard" ? "inner-header header-dashboard" : "inner-header"}>
      <div className="shell inner-header-row">
        <LocalizedLink className="brand" href="/" aria-label="Le Voyage home">
          <Image src="/levoyage-white.png" alt="Le Voyage" width={192} height={64} priority />
        </LocalizedLink>
        <nav className="inner-nav" aria-label={t("header.mainNav")}>
          {headerLinks.map(([key, href]) => (
            <LocalizedLink key={href} href={href}>{t(key)}</LocalizedLink>
          ))}
        </nav>
        <div className="inner-actions">
          <LocalizedLink className="dashboard-return" href="/dashboard">← {t("header.dashboard")}</LocalizedLink>
          <LocalizedLink href="/planner">{t("header.planner")}</LocalizedLink>
          <LocalizedLink className="partner-link" href="/partner">{t("header.partner")}</LocalizedLink>
          <LocaleSwitcher />
          <HeaderAccount />
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const t = createTranslator(localeFromPath(usePathname()));
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-topline">
          <LocalizedLink href="/" className="footer-logo" aria-label="Le Voyage home">
            <Image src="/levoyage-white.png" alt="Le Voyage" width={192} height={64} />
          </LocalizedLink>
          <nav className="footer-legal" aria-label={t("footer.top.aria")}>
            {footerLegalLinks.map(([key, href]) => (
              <LocalizedLink key={key} href={href}>{t(key)}</LocalizedLink>
            ))}
          </nav>
        </div>

        <div className="footer-columns">
          {footerColumns.map((column) => (
            <section key={column.title}>
              <h3>{t(column.title)}</h3>
              {column.items.map(([key, href]) => (
                <LocalizedLink key={key} href={href}>{t(key)}</LocalizedLink>
              ))}
            </section>
          ))}
        </div>

        <div className="footer-bottom">
          <p>{t("footer.copyright", { year })}</p>
          <div className="footer-locale" aria-label={t("footer.languageCurrency")}>
            <span>DZD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function MarketingPage({ eyebrow, title, intro, children, artTheme, headerVariant, className }: { eyebrow: string; title: string; intro: string; children: ReactNode; artTheme?: string; headerVariant?: "dashboard"; className?: string }) {
  const theme = artTheme
    ?? (eyebrow.toLowerCase().includes("stay")
      ? "stays"
      : eyebrow.toLowerCase().includes("experience")
        ? "experiences"
        : eyebrow.toLowerCase().includes("guide")
          ? "guide"
          : eyebrow.toLowerCase().includes("destination")
            ? "destinations"
            : "explore");
  return (
    <>
      <SiteHeader variant={headerVariant} />
      <main className={className ? `marketing-page ${className}` : "marketing-page"}>
        <section className="page-intro">
          <div className="shell">
            <div className="page-intro-copy">
              <p className="section-kicker">{eyebrow}</p>
              <h1>{title}</h1>
              <p>{intro}</p>
            </div>
            <div className={`page-intro-art art-${theme}`} aria-hidden="true">
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
