"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

type Suggestion = { objectId: string; name: string; type: string; address: string; reason: string; href: string };
type Position = { lat: number; lng: number; accuracy: number; at: string };
type GoogleMapsWindow = Window & { google?: { maps?: unknown } };

const MAPS_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

function loadGoogleMaps(): Promise<void> {
  const w = window as GoogleMapsWindow;
  if (w.google?.maps) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>("script[data-google-maps]");
    if (existing) { existing.addEventListener("load", () => resolve()); existing.addEventListener("error", () => reject(new Error("Map failed to load."))); return; }
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(MAPS_KEY)}`;
    script.async = true;
    script.dataset.googleMaps = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Map failed to load."));
    document.head.appendChild(script);
  });
}

export function TripTracker() {
  const [consent, setConsent] = useState(false);
  const [tracking, setTracking] = useState(false);
  const [position, setPosition] = useState<Position | null>(null);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [suggesting, setSuggesting] = useState(false);
  const [provider, setProvider] = useState("");
  const mapElement = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<unknown>(null);
  const markerRef = useRef<unknown>(null);
  const watchId = useRef<number | null>(null);

  useEffect(() => {
    if (!tracking || !position || !MAPS_KEY || !mapElement.current) return;
    let cancelled = false;
    loadGoogleMaps().then(() => {
      if (cancelled || !mapElement.current) return;
      const maps = (window as unknown as { google: { maps: any } }).google.maps;
      const center = { lat: position.lat, lng: position.lng };
      if (!mapRef.current) {
        mapRef.current = new maps.Map(mapElement.current, { center, zoom: 14, disableDefaultUI: true });
        markerRef.current = new maps.Marker({ position: center, map: mapRef.current, title: "You are here" });
      } else {
        (markerRef.current as { setPosition: (p: unknown) => void }).setPosition(center);
        (mapRef.current as { panTo: (p: unknown) => void }).panTo(center);
      }
    }).catch((cause: unknown) => { if (!cancelled) setError(cause instanceof Error ? cause.message : "Map failed to load."); });
    return () => { cancelled = true; };
  }, [tracking, position]);

  useEffect(() => () => { if (watchId.current !== null) navigator.geolocation.clearWatch(watchId.current); }, []);

  function startTracking() {
    if (!navigator.geolocation) { setError("Location is not available in this browser."); return; }
    setError("");
    setTracking(true);
    watchId.current = navigator.geolocation.watchPosition(
      (pos) => setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: Math.round(pos.coords.accuracy), at: new Date(pos.timestamp).toLocaleTimeString() }),
      (cause) => { setError(cause.code === cause.PERMISSION_DENIED ? "Location permission was denied." : "Could not read your location."); setTracking(false); },
      { enableHighAccuracy: true, maximumAge: 10_000, timeout: 20_000 },
    );
  }

  function stopTracking() {
    if (watchId.current !== null) navigator.geolocation.clearWatch(watchId.current);
    watchId.current = null;
    setTracking(false);
  }

  async function suggest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSuggesting(true); setError(""); setSuggestions([]);
    try {
      const response = await fetch("/api/trip-suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form.entries())),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not load suggestions.");
      setSuggestions(data.suggestions || []);
      setProvider(data.provider || "");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not load suggestions.");
    } finally {
      setSuggesting(false);
    }
  }

  return <div className="traveler-booking-workspace">
    <section className="booking-request-panel">
      <p className="dashboard-eyebrow">LIVE LOCATION</p>
      <h2>Track your position</h2>
      <p>Your location is read by your browser and shown only on this page. It is not saved on our servers.</p>
      <label className="profile-message"><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} /> I agree to share my location while this page is open.</label>
      <div className="booking-actions">
        {!tracking ? <button type="button" disabled={!consent} onClick={startTracking}>Start tracking</button> : <button type="button" onClick={stopTracking}>Stop tracking</button>}
      </div>
      {position && <p>Last update {position.at} · accuracy about {position.accuracy} m</p>}
      {!MAPS_KEY && tracking && <p className="form-error">Map is not configured: set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY.</p>}
      <div ref={mapElement} style={{ width: "100%", height: position && MAPS_KEY ? 320 : 0, borderRadius: 8, overflow: "hidden" }} />
      {error && <p className="form-error" role="alert">{error}</p>}
    </section>
    <section className="booking-request-panel">
      <p className="dashboard-eyebrow">SMART SUGGESTIONS</p>
      <h2>Suggested stays</h2>
      <p>Suggestions come from published listings. Availability and prices are not verified here.</p>
      <form className="partner-form" onSubmit={suggest}>
        <label>Destination<input name="destination" required maxLength={120} placeholder="e.g. Djanet, Oran" /></label>
        <label>Guests<input name="guests" type="number" min="1" max="20" defaultValue="2" required /></label>
        <label>Check-in<input name="checkIn" type="date" required /></label>
        <label>Check-out<input name="checkOut" type="date" required /></label>
        <label className="partner-form-wide">Interests<input name="interests" maxLength={300} placeholder="e.g. desert, beach, history" /></label>
        <button type="submit" disabled={suggesting}>{suggesting ? "Finding stays…" : "Suggest stays"}</button>
      </form>
      {suggestions.length > 0 && <div className="booking-list">{suggestions.map((item) => <article className="booking-card" key={item.objectId}><header><div><h3>{item.name}</h3><small>{item.type}{item.address ? ` · ${item.address}` : ""}</small></div></header><p>{item.reason}</p><a href={item.href}>View listing</a></article>)}</div>}
      {provider === "nvidia_nim" && <p className="profile-message">Ranked with TRRIPYAI.</p>}
    </section>
  </div>;
}
