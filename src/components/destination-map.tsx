"use client";

import { useEffect, useRef } from "react";
import "maplibre-gl/dist/maplibre-gl.css";

export type MapMarker = { name: string; lat: number; lng: number; href?: string };

// Algeria: centre and bounding box (west, south, east, north)
const ALGERIA_CENTER: [number, number] = [2.6, 28.0];
const ALGERIA_BOUNDS: [[number, number], [number, number]] = [
  [-8.7, 18.9],
  [12.1, 37.2],
];

const CLUSTER_SOURCE = "places";

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
}

export function DestinationMap({ markers, className }: { markers: MapMarker[]; className?: string }) {
  const container = useRef<HTMLDivElement>(null);
  const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY;

  useEffect(() => {
    if (!apiKey || !container.current) return;
    let map: { remove: () => void } | undefined;
    let cancelled = false;

    void import("maplibre-gl").then((module) => {
      if (cancelled || !container.current) return;
      const maplibregl = module.default;
      const instance = new maplibregl.Map({
        container: container.current,
        style: `https://maps.geoapify.com/v1/styles/osm-carto/style.json?apiKey=${apiKey}`,
        center: ALGERIA_CENTER,
        zoom: 4.6,
        minZoom: 4,
        maxBounds: [
          [ALGERIA_BOUNDS[0][0] - 3, ALGERIA_BOUNDS[0][1] - 3],
          [ALGERIA_BOUNDS[1][0] + 3, ALGERIA_BOUNDS[1][1] + 3],
        ],
      });
      instance.addControl(new maplibregl.NavigationControl(), "top-right");

      instance.on("load", () => {
        instance.addSource(CLUSTER_SOURCE, {
          type: "geojson",
          cluster: true,
          clusterRadius: 50,
          clusterMaxZoom: 9,
          data: {
            type: "FeatureCollection",
            features: markers.map((marker) => ({
              type: "Feature" as const,
              properties: { name: marker.name, href: marker.href || "" },
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
          const link = href ? `<a href="${escapeHtml(href)}">View</a>` : "";
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
      map?.remove();
    };
  }, [apiKey, markers]);

  if (!apiKey) {
    return (
      <div className={className} role="status">
        Map unavailable: NEXT_PUBLIC_GEOAPIFY_API_KEY is not set.
      </div>
    );
  }

  return <div ref={container} className={className} />;
}
