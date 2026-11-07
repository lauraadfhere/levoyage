"use client";
import { useEffect, useMemo, useState } from "react";
import { LocalizedLink } from "@/components/localized-link";
const pages = [
  ["Dashboard", "Your travel overview", "/dashboard", "dashboard trips"],
  ["Explore Algeria", "Categories, places and travel ideas", "/dashboard/explore-algerie", "explore destinations"],
  ["Tourist map", "Browse Algeria by wilaya", "/dashboard/map-touristique", "map wilaya place"],
  ["Tourist circuit", "Ready-made itinerary ideas", "/dashboard/circuit-touristique", "circuit itinerary trips"],
  ["Offers", "Curated Algeria travel ideas", "/dashboard/offers", "offers deals popular"],
  ["My trips", "Bookings and saved journey plans", "/bookings", "bookings trips reservations"],
  ["Planning", "Build a new travel itinerary", "/planner", "planning itinerary"],
  ["My suggestions", "Travel guides and recommendations", "/guide", "suggestions guides"],
  ["TRRIPYAI", "Ask the Algeria travel assistant", "/tripyai", "chat ai help support"],
] as const;
export function DashboardSearch() { const [open, setOpen] = useState(false); const [query, setQuery] = useState(""); useEffect(() => { const close = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); }; window.addEventListener("keydown", close); return () => window.removeEventListener("keydown", close); }, []); const results = useMemo(() => { const term = query.trim().toLocaleLowerCase(); return term ? pages.filter(([title, description, , keywords]) => `${title} ${description} ${keywords}`.toLocaleLowerCase().includes(term)) : pages; }, [query]); return <div className="dashboard-search"><button type="button" onClick={() => setOpen(true)} aria-label="Search dashboard"><i aria-hidden="true" /></button>{open && <div className="dashboard-search-overlay" role="presentation" onMouseDown={() => setOpen(false)}><section className="dashboard-search-modal" role="dialog" aria-modal="true" aria-label="Search Le Voyage" onMouseDown={event => event.stopPropagation()}><div><label><span className="sr-only">Search pages</span><i aria-hidden="true" /><input autoFocus value={query} onChange={event => setQuery(event.target.value)} placeholder="Search offers, trips, places and pages" /></label><button type="button" onClick={() => setOpen(false)} aria-label="Close search">×</button></div><p>{results.length} results</p><nav>{results.map(([title, description, href]) => <LocalizedLink href={href} key={href} onClick={() => setOpen(false)}><span><strong>{title}</strong><small>{description}</small></span><b aria-hidden="true">→</b></LocalizedLink>)}</nav>{!results.length && <p className="dashboard-search-empty">No pages match that search.</p>}</section></div>}</div>; }
