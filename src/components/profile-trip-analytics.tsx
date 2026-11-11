"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Trip = {
  bookingReference?: string;
  propertyName: string;
  status?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  totalMinor?: number;
  currency?: string;
};

const DAY_MS = 86_400_000;

function nights(trip: Trip) {
  if (!trip.checkIn || !trip.checkOut) return 0;
  const diff = Date.parse(trip.checkOut) - Date.parse(trip.checkIn);
  return Number.isFinite(diff) && diff > 0 ? Math.round(diff / DAY_MS) : 0;
}

function money(minor: number, currency = "DZD") {
  return new Intl.NumberFormat(undefined, { style: "currency", currency, maximumFractionDigits: 0 }).format(minor / 100);
}

export function ProfileTripAnalytics() {
  const [trips, setTrips] = useState<Trip[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/bookings", { cache: "no-store" })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Could not load your trips.");
        setTrips(data.bookings || []);
      })
      .catch((cause: unknown) => setError(cause instanceof Error ? cause.message : "Could not load your trips."));
  }, []);

  const stats = useMemo(() => {
    const list = trips || [];
    const byStatus = new Map<string, number>();
    let totalNights = 0;
    let spend = 0;
    const currency = list.find((trip) => trip.currency)?.currency;
    for (const trip of list) {
      const key = trip.status || "unknown";
      byStatus.set(key, (byStatus.get(key) || 0) + 1);
      totalNights += nights(trip);
      if (trip.status !== "cancelled" && trip.totalMinor) spend += trip.totalMinor;
    }
    const today = new Date().toISOString().slice(0, 10);
    const upcoming = list.filter((trip) => trip.checkIn && trip.checkIn >= today && trip.status !== "cancelled").length;
    const sorted = [...list].sort((a, b) => (b.checkIn || "").localeCompare(a.checkIn || ""));
    return { total: list.length, totalNights, spend, currency, upcoming, byStatus, sorted };
  }, [trips]);

  return (
    <section className="profile-trip-analytics" aria-labelledby="profile-trips-title">
      <div className="profile-trip-heading">
        <span className="profile-trip-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
            <circle cx="12" cy="9.5" r="2.5" />
          </svg>
        </span>
        <div>
          <p className="section-kicker">TRIP TRACKING</p>
          <h2 id="profile-trips-title">Your trips, analysed</h2>
        </div>
        <Link className="profile-trip-track" href="/bookings#live-tracking">Track live location</Link>
      </div>

      {error && <p className="form-error" role="alert">{error}</p>}
      {!trips && !error && <p className="profile-message">Loading your trips…</p>}

      {trips && (
        <>
          <div className="profile-trip-stats">
            <div><strong>{stats.total}</strong><span>Trips</span></div>
            <div><strong>{stats.upcoming}</strong><span>Upcoming</span></div>
            <div><strong>{stats.totalNights}</strong><span>Nights</span></div>
            <div><strong>{stats.spend ? money(stats.spend, stats.currency) : "—"}</strong><span>Total spend</span></div>
          </div>

          {stats.total === 0 ? (
            <p className="profile-message">No trips yet. Your reservations will appear here once you book a stay.</p>
          ) : (
            <>
              <div className="profile-trip-status" aria-label="Trips by status">
                {[...stats.byStatus.entries()].map(([status, count]) => (
                  <span key={status} className={`profile-trip-chip status-${status}`}>{status}: {count}</span>
                ))}
              </div>
              <ol className="profile-trip-timeline">
                {stats.sorted.map((trip) => (
                  <li key={trip.bookingReference || `${trip.propertyName}-${trip.checkIn}`}>
                    <div>
                      <strong>{trip.propertyName}</strong>
                      <small>{trip.checkIn} → {trip.checkOut} · {nights(trip)} night(s) · {trip.guests ?? 1} guest(s)</small>
                    </div>
                    <span className={`profile-trip-chip status-${trip.status || "unknown"}`}>{trip.status || "unknown"}</span>
                  </li>
                ))}
              </ol>
            </>
          )}
        </>
      )}
    </section>
  );
}
