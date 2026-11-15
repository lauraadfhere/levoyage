"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";

export type MapMarker = { name: string; lat: number; lng: number; href?: string; href360?: string };

// Algeria: centre and bounding box (west, south, east, north)
const ALGERIA_CENTER: [number, number] = [2.6, 28.0];
const ALGERIA_BOUNDS: [[number, number], [number, number]] = [
  [-8.7, 18.9],
  [12.1, 37.2],
];

const CLUSTER_SOURCE = "places";

const OSM_FALLBACK_STYLE = {
  version: 8 as const,
  sources: {
    osm: {
      type: "raster" as const,
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "© OpenStreetMap contributors",
      maxzoom: 19,
    },
  },
  layers: [{ id: "osm", type: "raster" as const, source: "osm" }],
};

function haversineKm(a: [number, number], b: [number, number]) {
  const rad = (d: number) => (d * Math.PI) / 180;
  const dLat = rad(b[1] - a[1]);
  const dLng = rad(b[0] - a[0]);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a[1])) * Math.cos(rad(b[1])) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(h));
}

type TrackStatus = { state: "off" | "waiting" | "live" | "error"; text: string };

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
}

export function DestinationMap({ markers, className, tracking = true }: { markers: MapMarker[]; className?: string; tracking?: boolean }) {
  const container = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("maplibre-gl").Map | null>(null);
  const watchId = useRef<number | null>(null);
  const lastFix = useRef<[number, number] | null>(null);
  const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;
  const markersKey = useMemo(() => JSON.stringify(markers), [markers]);
  const [satellite, setSatellite] = useState(false);
  const [track, setTrack] = useState<TrackStatus>({ state: "off", text: "" });

  function pushFix(coords: [number, number], accuracy: number, follow: boolean) {
    const map = mapRef.current;
    lastFix.current = coords;
    if (map) {
      const src = map.getSource("me") as import("maplibre-gl").GeoJSONSource | undefined;
      src?.setData({ type: "Feature", properties: {}, geometry: { type: "Point", coordinates: coords } });
      if (follow) map.easeTo({ center: coords, zoom: Math.max(map.getZoom(), 9), duration: 800 });
    }
    let text = `Live · ±${Math.round(accuracy)} m`;
    if (markers.length) {
      const nearest = markers
        .map((m) => ({ m, d: haversineKm(coords, [m.lng, m.lat]) }))
        .sort((a, b) => a.d - b.d)[0];
      text += ` · nearest: ${nearest.m.name} (${nearest.d < 10 ? nearest.d.toFixed(1) : Math.round(nearest.d)} km)`;
    }
    setTrack({ state: "live", text });
  }

  function algeriaView() {
    mapRef.current?.fitBounds(ALGERIA_BOUNDS, { padding: 30, duration: 900 });
  }

  function toggleSatellite() {
    const map = mapRef.current;
    if (!map) return;
    const next = !satellite;
    if (next && !map.getSource("sat")) {
      map.addSource("sat", {
        type: "raster",
        tiles: ["https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"],
        tileSize: 256,
        attribution: "Imagery © Esri",
        maxzoom: 18,
      });
      map.addLayer({ id: "sat", type: "raster", source: "sat" }, "clusters");
    }
    if (map.getLayer("sat")) map.setLayoutProperty("sat", "visibility", next ? "visible" : "none");
    setSatellite(next);
  }

  function stopTracking() {
    if (watchId.current !== null) navigator.geolocation.clearWatch(watchId.current);
    watchId.current = null;
    const src = mapRef.current?.getSource("me") as import("maplibre-gl").GeoJSONSource | undefined;
    src?.setData({ type: "FeatureCollection", features: [] });
    setTrack({ state: "off", text: "" });
  }

  function toggleTracking() {
    if (watchId.current !== null) return stopTracking();
    if (!("geolocation" in navigator)) return setTrack({ state: "error", text: "Location is not supported on this device." });
    setTrack({ state: "waiting", text: "Waiting for GPS…" });
    let first = true;
    watchId.current = navigator.geolocation.watchPosition(
      (pos) => {
        pushFix([pos.coords.longitude, pos.coords.latitude], pos.coords.accuracy, first);
        first = false;
      },
      (err) => {
        stopTracking();
        setTrack({ state: "error", text: err.code === 1 ? "Location permission denied." : "Could not get your position." });
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 20000 },
    );
  }

  useEffect(() => {
    if (!container.current) return;
    let map: { remove: () => void } | undefined;
    let cancelled = false;

    void import("maplibre-gl").then((module) => {
      if (cancelled || !container.current) return;
      const maplibregl = module.default;
      const instance = new maplibregl.Map({
        container: container.current,
        style: apiKey ? `https://maps.geoapify.com/v1/styles/osm-carto/style.json?apiKey=${apiKey}` : OSM_FALLBACK_STYLE,
        center: ALGERIA_CENTER,
        zoom: 4.6,
        minZoom: 4,
        maxBounds: [
          [ALGERIA_BOUNDS[0][0] - 3, ALGERIA_BOUNDS[0][1] - 3],
          [ALGERIA_BOUNDS[1][0] + 3, ALGERIA_BOUNDS[1][1] + 3],
        ],
      });
      instance.addControl(new maplibregl.NavigationControl(), "top-right");

      mapRef.current = instance;
      instance.on("load", () => {
        instance.addSource("me", { type: "geojson", data: { type: "FeatureCollection", features: [] } });
        instance.addLayer({ id: "me-halo", type: "circle", source: "me", paint: { "circle-color": "#2563eb", "circle-opacity": 0.2, "circle-radius": 22 } });
        instance.addLayer({ id: "me-dot", type: "circle", source: "me", paint: { "circle-color": "#2563eb", "circle-radius": 8, "circle-stroke-width": 3, "circle-stroke-color": "#ffffff" } });
        if (lastFix.current) (instance.getSource("me") as import("maplibre-gl").GeoJSONSource).setData({ type: "Feature", properties: {}, geometry: { type: "Point", coordinates: lastFix.current } });
        instance.addSource(CLUSTER_SOURCE, {
          type: "geojson",
          cluster: true,
          clusterRadius: 50,
          clusterMaxZoom: 9,
          data: {
            type: "FeatureCollection",
            features: markers.map((marker) => ({
              type: "Feature" as const,
              properties: { name: marker.name, href: marker.href || "", href360: marker.href360 || "" },
              geometry: { type: "Point" as const, coordinates: [marker.lng, marker.lat] },
            })),
          },
        });

        instance.addLayer({
          id: "clusters",
          type: "circle",
          source: CLUSTER_SOURCE,
          filter: ["has", "point_count"],
          paint: { "circle-color": "#FBBF01", "circle-radius": 18, "circle-stroke-width": 2, "circle-stroke-color": "#ffffff" },
        });
        instance.addLayer({
          id: "cluster-count",
          type: "symbol",
          source: CLUSTER_SOURCE,
          filter: ["has", "point_count"],
          layout: { "text-field": ["get", "point_count_abbreviated"], "text-size": 13 },
        });
        instance.addLayer({
          id: "places",
          type: "circle",
          source: CLUSTER_SOURCE,
          filter: ["!", ["has", "point_count"]],
          paint: { "circle-color": "#e8491d", "circle-radius": 8, "circle-stroke-width": 2, "circle-stroke-color": "#ffffff" },
        });

        instance.on("click", "clusters", (event) => {
          const feature = instance.queryRenderedFeatures(event.point, { layers: ["clusters"] })[0];
          const clusterId = feature?.properties?.cluster_id;
          const source = instance.getSource(CLUSTER_SOURCE) as unknown as {
            getClusterExpansionZoom: (id: number, cb: (err: unknown, zoom: number) => void) => void;
          };
          if (!feature || clusterId === undefined) return;
          source.getClusterExpansionZoom(clusterId, (err, zoom) => {
            if (err) return;
            instance.easeTo({ center: (feature.geometry as GeoJSON.Point).coordinates as [number, number], zoom });
          });
        });

        instance.on("click", "places", (event) => {
          const feature = event.features?.[0];
          if (!feature) return;
          const coords = (feature.geometry as GeoJSON.Point).coordinates as [number, number];
          const name = String(feature.properties?.name || "");
          const href = String(feature.properties?.href || "");
          const href360 = String(feature.properties?.href360 || "");
          const link = [href ? `<a href="${escapeHtml(href)}">View</a>` : "", href360 ? `<a href="${escapeHtml(href360)}">360° / VR</a>` : ""].filter(Boolean).join(" · ");
          new maplibregl.Popup({ offset: 12 }).setLngLat(coords).setHTML(`<strong>${escapeHtml(name)}</strong><br/>${link}`).addTo(instance);
        });

        instance.on("mouseenter", "clusters", () => (instance.getCanvas().style.cursor = "pointer"));
        instance.on("mouseleave", "clusters", () => (instance.getCanvas().style.cursor = ""));
        instance.on("mouseenter", "places", () => (instance.getCanvas().style.cursor = "pointer"));
        instance.on("mouseleave", "places", () => (instance.getCanvas().style.cursor = ""));
      });

      map = instance;
    });

    return () => {
      cancelled = true;
      mapRef.current = null;
      map?.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey, markersKey]);

  useEffect(() => () => {
    if (watchId.current !== null) navigator.geolocation.clearWatch(watchId.current);
  }, []);

  return (
    <div className={className} style={{ position: "relative" }}>
      <div ref={container} style={{ position: "absolute", inset: 0 }} />
      <div className="map-tools" role="group" aria-label="Map view">
        <button type="button" onClick={algeriaView}>🇩🇿 Algeria view</button>
        <button type="button" onClick={toggleSatellite} aria-pressed={satellite}>{satellite ? "Street map" : "Satellite"}</button>
      </div>
      {tracking ? (
        <div className="map-track" role="group" aria-label="Live location">
          <button type="button" onClick={toggleTracking} aria-pressed={track.state === "live" || track.state === "waiting"}>
            {track.state === "off" || track.state === "error" ? "◎ Track my location" : "■ Stop tracking"}
          </button>
          {track.text ? <span role="status">{track.text}</span> : null}
        </div>
      ) : null}
    </div>
  );
}
