"use client";

import { useEffect, useState } from "react";
type Property = { objectId: string; name?: string; type?: string; description?: string; address?: string; status?: string; businessName?: string; businessVerification?: string; createdAt?: string };
export function PropertyReview() {
  const [properties, setProperties] = useState<Property[]>([]); const [loading, setLoading] = useState(true); const [busy, setBusy] = useState(""); const [error, setError] = useState(""); const [reasons, setReasons] = useState<Record<string, string>>({});
  async function refresh() { try { const response = await fetch("/api/admin/properties", { cache: "no-store" }); const data = await response.json(); if (!response.ok) throw new Error(data.error || "Could not load property queue."); setProperties(data.properties || []); setError(""); } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not load property queue."); } finally { setLoading(false); } }
  useEffect(() => {
    let active = true;
    fetch("/api/admin/properties", { cache: "no-store" })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Could not load property queue.");
        if (active) { setProperties(data.properties || []); setError(""); }
      })
      .catch((cause: unknown) => { if (active) setError(cause instanceof Error ? cause.message : "Could not load property queue."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  async function decide(propertyId: string, decision: "approve" | "reject") { setBusy(propertyId); setError(""); try { const response = await fetch("/api/admin/properties", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ propertyId, decision, reason: reasons[propertyId] || "" }) }); const data = await response.json(); if (!response.ok) throw new Error(data.error || "Could not save review."); await refresh(); } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not save review."); } finally { setBusy(""); } }
  return <section className="admin-review"><div className="partner-list-heading"><div><p className="dashboard-eyebrow">LISTING QUALITY</p><h2>Property moderation queue</h2></div><span>{properties.length} awaiting review</span></div>{error && <p className="form-error" role="alert">{error}</p>}{loading ? <p>Loading property submissions…</p> : !properties.length ? <p>No property submissions are awaiting review.</p> : <div className="admin-review-list">{properties.map((property) => <article className="admin-review-card" key={property.objectId}><header><div><p className="dashboard-eyebrow">{property.type || "PROPERTY"}</p><h3>{property.name || "Unnamed property"}</h3></div><span className="status-pill status-submitted">submitted</span></header><p><strong>Partner:</strong> {property.businessName} · {property.businessVerification}</p><p><strong>Address:</strong> {property.address || "Not provided"}</p><p>{property.description}</p>{property.businessVerification !== "verified" && <p className="form-error">Business approval is required before publishing.</p>}<div className="admin-review-actions"><label>Rejection reason<input value={reasons[property.objectId] || ""} onChange={(event) => setReasons((current) => ({ ...current, [property.objectId]: event.target.value }))} /></label><div><button type="button" disabled={Boolean(busy) || property.businessVerification !== "verified"} onClick={() => void decide(property.objectId, "approve")}>{busy === property.objectId ? "Saving…" : "Approve & publish"}</button><button className="reject-button" type="button" disabled={Boolean(busy) || !(reasons[property.objectId] || "").trim()} onClick={() => void decide(property.objectId, "reject")}>Return to draft</button></div></div></article>)}</div>}</section>;
}
