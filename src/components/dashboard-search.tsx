"use client";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { LocalizedLink } from "@/components/localized-link";
import { createTranslator, localeFromPath } from "@/lib/i18n";

const pages = [
  ["ds.dashboard", "ds.dashboardD", "/dashboard", "dashboard trips"],
  ["ds.explore", "ds.exploreD", "/dashboard/explore-algerie", "explore destinations"],
  ["ds.map", "ds.mapD", "/dashboard/map-touristique", "map wilaya place"],
  ["ds.circuit", "ds.circuitD", "/dashboard/circuit-touristique", "circuit itinerary trips"],
  ["ds.offers", "ds.offersD", "/dashboard/offers", "offers deals popular"],
  ["ds.trips", "ds.tripsD", "/bookings", "bookings trips reservations"],
  ["ds.planning", "ds.planningD", "/planner", "planning itinerary"],
  ["ds.suggestions", "ds.suggestionsD", "/guide", "suggestions guides"],
  ["home.f6t", "ds.tripyaiD", "/tripyai", "chat ai help support"],
] as const;

export function DashboardSearch() {
  const t = createTranslator(localeFromPath(usePathname()));
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  useEffect(() => { const close = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); }; window.addEventListener("keydown", close); return () => window.removeEventListener("keydown", close); }, []);
  const results = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    return term ? pages.filter(([titleKey, descriptionKey, , keywords]) => `${t(titleKey)} ${t(descriptionKey)} ${keywords}`.toLocaleLowerCase().includes(term)) : pages;
  }, [query, t]);
  return <div className="dashboard-search">
    <button type="button" onClick={() => setOpen(true)} aria-label={t("ds.open")}><i aria-hidden="true" /></button>
    {open && <div className="dashboard-search-overlay" role="presentation" onMouseDown={() => setOpen(false)}>
      <section className="dashboard-search-modal" role="dialog" aria-modal="true" aria-label={t("ds.aria")} onMouseDown={event => event.stopPropagation()}>
        <div>
          <label><span className="sr-only">{t("ds.label")}</span><i aria-hidden="true" /><input autoFocus value={query} onChange={event => setQuery(event.target.value)} placeholder={t("ds.placeholder")} /></label>
          <button type="button" onClick={() => setOpen(false)} aria-label={t("ds.close")}>×</button>
        </div>
        <p>{t("ds.results", { count: results.length })}</p>
        <nav>{results.map(([titleKey, descriptionKey, href]) => <LocalizedLink href={href} key={href} onClick={() => setOpen(false)}><span><strong>{t(titleKey)}</strong><small>{t(descriptionKey)}</small></span><b aria-hidden="true">→</b></LocalizedLink>)}</nav>
        {!results.length && <p className="dashboard-search-empty">{t("ds.empty")}</p>}
      </section>
    </div>}
  </div>;
}
