import Image from "next/image";
import { LocalizedLink as Link } from "@/components/localized-link";
import type { ReactNode } from "react";
import { DashboardLanguageSwitcher } from "@/components/dashboard-language-switcher";
import { DashboardProfileLink } from "@/components/dashboard-profile-link";
import { CurrencySwitcher } from "@/components/currency-switcher";
import { DashboardSearch } from "@/components/dashboard-search";
import { DashboardNavLink } from "@/components/dashboard-nav-link";
import { SiteFooter } from "@/components/site-chrome";

const dashboardLinks = [{ href: "/dashboard/map-touristique", label: "Map Touristique", icon: "map" }, { href: "/dashboard/explore-algerie", label: "Explorez l’Algérie", icon: "explore" }, { href: "/dashboard/circuit-touristique", label: "Circuit Touristique", icon: "circuit" }, { href: "/dashboard/offers", label: "Offers", icon: "offers" }] as const;
export function DashboardFooter() { return <SiteFooter />; }
export function DashboardChrome({ children, activeHref }: { children: ReactNode; activeHref: string }) { return <main className="dashboard-page"><header className="dashboard-header"><div className="dashboard-shell"><div className="dashboard-top"><Link className="dashboard-logo" href="/" aria-label="Le Voyage home"><Image src="/levoyage.png" alt="Le Voyage" width={192} height={64} priority /></Link><div className="dashboard-actions"><Link className="tripyai-link" href="/tripyai"><i aria-hidden="true" />TRRIPYAI</Link><CurrencySwitcher /><DashboardLanguageSwitcher /><button type="button" aria-label="Help">?</button><Link href="/partner">List your offer</Link><DashboardProfileLink /><DashboardSearch /></div></div><nav className="dashboard-nav" aria-label="Voyager dashboard">{dashboardLinks.map(({ href, label, icon }) => <DashboardNavLink active={href === activeHref} href={href} icon={icon} key={href} label={label} />)}<DashboardNavLink active={activeHref === "/dashboard/hotels"} href="/dashboard/hotels" icon="hotels" label="Hotels" /></nav></div></header>{children}<DashboardFooter /></main>; }
