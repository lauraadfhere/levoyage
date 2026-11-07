"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

type Application = { objectId: string; businessName?: string; status?: string; decisionReason?: string; createdAt?: string };
type Business = { objectId: string; name?: string; verificationStatus?: string };

export function PartnerOnboarding() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function refresh() {
    try {
      const response = await fetch("/api/partner/applications", { cache: "no-store" });
      const data = await response.json();
      if (response.status === 401) { setError("Sign in with a traveler account to apply as a partner."); return; }
      if (!response.ok) throw new Error(data.error || "Could not load partner status.");
      setApplications(data.applications || []);
      setBusinesses(data.businesses || []);
      setError("");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not load partner status.");
    } finally { setLoading(false); }
  }

  useEffect(() => {
    let active = true;
    fetch("/api/partner/applications", { cache: "no-store" })
      .then(async (response) => {
        const data = await response.json();
        if (response.status === 401) throw new Error("Sign in with a traveler account to apply as a partner.");
        if (!response.ok) throw new Error(data.error || "Could not load partner status.");
        if (active) { setApplications(data.applications || []); setBusinesses(data.businesses || []); setError(""); }
      })
      .catch((cause: unknown) => { if (active) setError(cause instanceof Error ? cause.message : "Could not load partner status."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setSending(true); setError(""); setMessage("");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    try {
      const response = await fetch("/api/partner/applications", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not submit the application.");
      setMessage("Your partner application is in the review queue.");
      formElement.reset();
      await refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not submit the application.");
    } finally { setSending(false); }
  }

  if (loading) return <section className="partner-status"><p>Checking your partner status…</p></section>;
  if (error && !businesses.length && !applications.length && error.startsWith("Sign in")) return <section className="partner-status"><h2>Sign in to apply</h2><p>{error}</p><Link className="primary-link" href="/login?next=%2Fpartner">Sign in →</Link></section>;

  const approved = businesses.find((business) => business.verificationStatus === "verified");
  const pending = applications.find((application) => application.status === "pending");
  return <div className="partner-onboarding">
    {approved ? <section className="partner-status"><p className="dashboard-eyebrow">APPROVED PARTNER</p><h2>{approved.name || "Your business"} is approved</h2><p>You can now create unpublished property drafts for moderation. Live booking requests are available only for listings approved and published by the platform.</p><Link className="primary-link" href="/partner/properties">Manage properties →</Link></section> : pending ? <section className="partner-status"><p className="dashboard-eyebrow">APPLICATION IN REVIEW</p><h2>{pending.businessName}</h2><p>Submitted {pending.createdAt ? new Date(pending.createdAt).toLocaleDateString() : "recently"}. The platform team will review your business information.</p></section> : <section className="partner-application"><h2>Apply to become a tourism partner</h2><p>Tell us about your business. Listings remain drafts until reviewed; provider descriptions are not government certification.</p><form className="partner-form" onSubmit={submit}>
      <label>Business or trading name<input name="businessName" required minLength={2} maxLength={120} /></label>
      <label>Provider type<select name="kind" required defaultValue=""><option value="" disabled>Select a type</option><option value="hotel">Hotel or accommodation</option><option value="agency">Travel agency</option><option value="tour_operator">Tour operator</option><option value="activity_provider">Guide or activity provider</option><option value="restaurant">Restaurant</option></select></label>
      <label>Contact person<input name="contactName" required maxLength={120} /></label>
      <label>Business email<input name="email" type="email" required maxLength={200} /></label>
      <label>Phone<input name="phone" type="tel" maxLength={40} /></label>
      <label>Website<input name="website" type="url" placeholder="https://" maxLength={200} /></label>
      <label>Business address<input name="address" maxLength={300} /></label>
      <label>Service area<input name="serviceArea" placeholder="City, wilaya, region" maxLength={160} /></label>
      <label className="partner-form-wide">Describe your services<textarea name="description" required minLength={20} maxLength={2000} rows={5} /></label>
      {error && <p className="form-error" role="alert">{error}</p>}{message && <p className="profile-message" role="status">{message}</p>}
      <button type="submit" disabled={sending}>{sending ? "Submitting…" : "Submit for review"}</button>
    </form></section>}
    {error && !(error.startsWith("Sign in")) && <p className="form-error" role="alert">{error}</p>}
  </div>;
}
