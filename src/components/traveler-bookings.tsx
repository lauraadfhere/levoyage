"use client";

import { FormEvent, useEffect, useState } from "react";

type Booking = { bookingReference: string; propertyName?: string; status?: string; checkIn?: string; checkOut?: string; guests?: number; totalMinor?: number; currency?: string; paymentStatus?: string; guestName?: string; reviewStatus?: string | null; createdAt?: string };

function dateValue(value?: string) { if (!value) return "—"; const date = new Date(value); return Number.isNaN(date.getTime()) ? value.slice(0, 10) : date.toLocaleDateString(); }

export function TravelerBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [reviewRatings, setReviewRatings] = useState<Record<string, number>>({});
  const [reviewTexts, setReviewTexts] = useState<Record<string, string>>({});
  const [reviewMessages, setReviewMessages] = useState<Record<string, string>>({});
  async function refresh() {
    try {
      const response = await fetch("/api/bookings", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || (response.status === 401 ? "Sign in to view your reservations." : "Could not load reservations."));
      setBookings(data.bookings || []); setError("");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not load reservations."); }
    finally { setLoading(false); }
  }
  useEffect(() => {
    let active = true;
    fetch("/api/bookings", { cache: "no-store" })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || (response.status === 401 ? "Sign in to view your reservations." : "Could not load reservations."));
        if (active) { setBookings(data.bookings || []); setError(""); }
      })
      .catch((cause: unknown) => { if (active) setError(cause instanceof Error ? cause.message : "Could not load reservations."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget; setSending(true); setError(""); setMessage("");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/bookings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(form.entries())) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not submit your request.");
      setMessage(`Request ${data.booking.bookingReference} sent. The provider must confirm it; payment is not taken.`);
      formElement.reset(); await refresh();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not submit your request."); }
    finally { setSending(false); }
  }
  async function submitReview(bookingId: string) {
    setReviewMessages((current) => ({ ...current, [bookingId]: "Submitting review…" }));
    try {
      const response = await fetch("/api/reviews", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ bookingReference: bookingId, rating: reviewRatings[bookingId] || 0, body: reviewTexts[bookingId] || "" }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not submit review.");
      setReviewMessages((current) => ({ ...current, [bookingId]: "Review submitted for moderation." })); await refresh();
    } catch (cause) { setReviewMessages((current) => ({ ...current, [bookingId]: cause instanceof Error ? cause.message : "Could not submit review." })); }
  }
  async function respondToQuote(bookingId: string, action: "accept_quote" | "decline_quote") {
    if (action === "decline_quote" && !window.confirm("Decline this provider quote?")) return;
    setError("");
    try {
      const response = await fetch("/api/bookings", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ bookingReference: bookingId, action }) });
      const data = await response.json(); if (!response.ok) throw new Error(data.error || "Could not respond to this quote.");
      setMessage(action === "accept_quote" ? "Quote accepted. Contact the provider to arrange payment and confirm the stay." : "Quote declined."); await refresh();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not respond to this quote."); }
  }
  async function cancel(bookingId: string) {
    if (!window.confirm("Cancel this pending reservation request?")) return;
    setError("");
    try {
      const response = await fetch("/api/bookings", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ bookingReference: bookingId, reason: "Cancelled by traveler" }) });
      const data = await response.json(); if (!response.ok) throw new Error(data.error || "Could not cancel this request.");
      setMessage("Reservation request cancelled."); await refresh();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not cancel this request."); }
  }
  return <div className="traveler-booking-workspace">
    <section className="booking-request-panel"><p className="dashboard-eyebrow">REQUEST TO BOOK</p><h2>Ask a published property</h2><p>This request does not confirm availability, price or payment. The provider must respond before the booking is confirmed.</p>
      <form className="partner-form" onSubmit={submit}>
        <label>Published property slug<input name="propertySlug" required placeholder="Property slug from an approved listing" /></label>
        <label>Guests<input name="guests" type="number" min="1" max="20" defaultValue="2" required /></label>
        <label>Check-in<input name="checkIn" type="date" required /></label>
        <label>Check-out<input name="checkOut" type="date" required /></label>
        <label>Guest name<input name="guestName" required maxLength={120} /></label>
        <label>Email<input name="guestEmail" type="email" required maxLength={200} /></label>
        <label className="partner-form-wide">Message to provider<textarea name="guestMessage" maxLength={1500} rows={3} /></label>
        {error && <p className="form-error" role="alert">{error}</p>}{message && <p className="profile-message" role="status">{message}</p>}
        <button type="submit" disabled={sending}>{sending ? "Sending…" : "Send booking request"}</button>
      </form>
    </section>
    <section className="partner-status"><div className="partner-list-heading"><div><p className="dashboard-eyebrow">MY TRAVEL</p><h2>Your reservation requests</h2></div><span>{bookings.length} request{bookings.length === 1 ? "" : "s"}</span></div>
      {loading ? <p>Loading your reservations…</p> : error && !bookings.length ? <p>{error}</p> : !bookings.length ? <p>No reservation requests yet.</p> : <div className="booking-list">{bookings.map((booking) => <article className="booking-card" key={booking.bookingReference}><header><div><small>REFERENCE · {booking.bookingReference || "Pending"}</small><h3>{booking.propertyName || "Accommodation request"}</h3></div><span className={`status-pill status-${booking.status || "pending"}`}>{booking.status || "pending"}</span></header><p>{dateValue(booking.checkIn)} → {dateValue(booking.checkOut)} · {booking.guests || 1} guest{booking.guests === 1 ? "" : "s"}</p><p>{booking.status === "quote_offered" ? `Provider quote: ${(Number(booking.totalMinor || 0) / 100).toLocaleString()} ${booking.currency || "DZD"}` : "Payment: " + (booking.paymentStatus === "not_required_request" ? "Not taken — booking request only" : booking.paymentStatus || "Pending")}</p>{booking.status === "quote_offered" && <div className="booking-actions"><button type="button" onClick={() => void respondToQuote(booking.bookingReference, "accept_quote")}>Accept quote</button><button className="reject-button" type="button" onClick={() => void respondToQuote(booking.bookingReference, "decline_quote")}>Decline quote</button></div>}{["pending", "quote_offered"].includes(booking.status || "") && <button className="cancel-booking" type="button" onClick={() => void cancel(booking.bookingReference)}>Cancel request</button>}{booking.status === "confirmed" && <p>Confirmed · Contact the provider to arrange the disclosed payment method. No online payment was collected.</p>}{booking.status === "completed" && (booking.reviewStatus ? <p className="profile-message">Review status: {booking.reviewStatus}</p> : <form className="booking-review-form" onSubmit={(event) => { event.preventDefault(); void submitReview(booking.bookingReference); }}><label>Rate your stay<select required value={reviewRatings[booking.bookingReference] || ""} onChange={(event) => setReviewRatings((current) => ({ ...current, [booking.bookingReference]: Number(event.target.value) }))}><option value="" disabled>Choose a rating</option><option value="5">5 — Excellent</option><option value="4">4 — Very good</option><option value="3">3 — Good</option><option value="2">2 — Fair</option><option value="1">1 — Poor</option></select></label><label>Review<textarea value={reviewTexts[booking.bookingReference] || ""} onChange={(event) => setReviewTexts((current) => ({ ...current, [booking.bookingReference]: event.target.value }))} maxLength={2000} rows={3} /></label>{reviewMessages[booking.bookingReference] && <p className="profile-message" role="status">{reviewMessages[booking.bookingReference]}</p>}<button type="submit">Submit review</button></form>)}</article>)}</div>}
    </section>
  </div>;
}
