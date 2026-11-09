"use client";

import { useEffect, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";

export type MapMarker = { name: string; lat: number; lng: number };

const ALGERIA_CENTER: [number, number] = [2.6, 28.0];

export function DestinationMap({ markers, className }: { markers: MapMarker[]; className?: string }) {
  const container = useRef<HTMLDivElement>(null);
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  useEffect(() => {
    if (!token || !container.current) return;
    let map: { remove: () => void } | undefined;
    let cancelled = false;
    void import("mapbox-gl").then((module) => {
      if (cancelled || !container.current) return;
      const mapboxgl = module.default;
      mapboxgl.accessToken = token;
      const instance = new mapboxgl.Map({
        container: container.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: ALGERIA_CENTER,
        zoom: 4.2,
      });
      instance.addControl(new mapboxgl.NavigationControl(), "top-right");
      for (const marker of markers) {
        new mapboxgl.Marker({ color: "#FBBF01" })
          .setLngLat([marker.lng, marker.lat])
          .setPopup(new mapboxgl.Popup({ offset: 16 }).setText(marker.name))
          .addTo(instance);
      }
      map = instance;
    });
    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [token, markers]);

  if (!token) {
    return (
      <div className={className} role="note">
        Map unavailable: set NEXT_PUBLIC_MAPBOX_TOKEN to show the map.
      </div>
    );
  }

  return <div ref={container} className={className} aria-label="Map" />;
}
