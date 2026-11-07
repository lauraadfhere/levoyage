"use client";

import { useMemo, useState } from "react";
import type { HotelCatalogItem } from "@/lib/hotel-catalog";

export function DashboardHotels({ hotels }: { hotels: HotelCatalogItem[] }) {
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [expandedHotel, setExpandedHotel] = useState<string | null>(null);
  const matches = useMemo(() => hotels.filter(hotel => `${hotel.name} ${hotel.city} ${hotel.propertyType}`.toLowerCase().includes(query.trim().toLowerCase())), [hotels, query]);
  const visible = showAll ? matches : matches.slice(0, 6);
  return <section className="dashboard-hotels" aria-labelledby="hotel-catalog-heading">
    <div className="dashboard-hotels-heading"><div><p className="dashboard-eyebrow">STAY NEAR THE STORY</p><h2 id="hotel-catalog-heading">Hotels and room setups</h2><p>Seed properties from the Algeria tourism catalogue, paired with nearby places to discover.</p></div><span>{hotels.length} seed properties</span></div>
    <label className="hotel-search"><span className="sr-only">Search hotels</span><input value={query} onChange={event => { setQuery(event.target.value); setShowAll(false); }} placeholder="Search Algiers, Oran, hotel name…" type="search" /></label>
    <div className="hotel-grid">{visible.map(hotel => { const hotelId = `${hotel.city}-${hotel.name}`; const isExpanded = expandedHotel === hotelId; return <article className={`hotel-card ${isExpanded ? "is-expanded" : ""}`} key={hotelId}><div className="hotel-card-top"><span>{hotel.city}</span><small>{hotel.propertyType}</small></div><h3>{hotel.name}</h3><p className="hotel-nearby"><b>Near:</b> {hotel.nearby}</p><div className="hotel-rooms"><strong>Prototype room setup</strong><ul>{hotel.rooms.map(room => <li key={room}>{room}</li>)}</ul></div>{isExpanded && <div className="hotel-card-details"><p>Room categories are ready for availability, pricing, capacity and 360° content once this seed property is verified.</p></div>}<button className="hotel-details-toggle" type="button" aria-expanded={isExpanded} onClick={() => setExpandedHotel(isExpanded ? null : hotelId)}>{isExpanded ? "Close details" : "View room details"}<span aria-hidden="true">{isExpanded ? "−" : "+"}</span></button><p className="hotel-verification">Seed inventory · verify location and availability before publishing</p></article>; })}</div>
    {!matches.length && <p className="hotel-empty">No seed properties match that search.</p>}
    {matches.length > 6 && <button className="hotel-show-more" type="button" onClick={() => setShowAll(value => !value)}>{showAll ? "Show fewer hotels" : `Show all ${matches.length} hotels`}</button>}
  </section>;
}
