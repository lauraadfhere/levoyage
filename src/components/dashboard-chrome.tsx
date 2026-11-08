"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LocalizedLink as Link } from "@/components/localized-link";
import type { ReactNode } from "react";
import { DashboardLanguageSwitcher } from "@/components/dashboard-language-switcher";
import { DashboardProfileLink } from "@/components/dashboard-profile-link";
import { CurrencySwitcher } from "@/components/currency-switcher";
import { DashboardSearch } from "@/components/dashboard-search";
import { DashboardNavLink } from "@/components/dashboard-nav-link";
import { SiteFooter } from "@/components/site-chrome";
import { createTranslator, localeFromPath } from "@/lib/i18n";

const dashboardLinks = [{ href: "/dashboard/map-touristique", icon: "map" }, { href: "/dashboard/explore-algerie", icon: "explore" }, { href: "/dashboard/circuit-touristique", icon: "circuit" }, { href: "/dashboard/offers", icon: "offers" }] as const;
export function DashboardFooter() { return <SiteFooter />; }
export function DashboardChrome({ children, activeHref }: { children: ReactNode; activeHref: string }) {
  const t = createTranslator(localeFromPath(usePathname()));
  return <main className="dashboard-page">
    <header className="dashboard-header">
      <div className="dashboard-shell">
        <div className="dashboard-top">
          <Link className="dashboard-logo" href="/" aria-label="Le Voyage home"><Image src="/levoyage-white.png" alt="Le Voyage" width={192} height={64} priority /></Link>
          <div className="dashboard-actions">
            <Link className="tripyai-link" href="/tripyai"><i aria-hidden="true" />TRRIPYAI</Link>
            <CurrencySwitcher />
            <DashboardLanguageSwitcher />
            <button type="button" aria-label={t("dashboard.help")}>?</button>
            <Link href="/partner">{t("dashboard.listOffer")}</Link>
            <DashboardProfileLink />
            <DashboardSearch />
          </div>
        </div>
        <nav className="dashboard-nav" aria-label={t("dashboard.navAria")}>
          {dashboardLinks.map(({ href, icon }) => <DashboardNavLink active={href === activeHref} href={href} icon={icon} key={href} label="" />)}
          <DashboardNavLink active={activeHref === "/dashboard/hotels"} href="/dashboard/hotels" icon="hotels" label="" />
        </nav>
      </div>
    </header>
    {children}
    <DashboardFooter />
  </main>;
}
