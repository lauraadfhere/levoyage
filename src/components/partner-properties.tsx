"use client";

import { FormEvent, useEffect, useState } from "react";

type Property = { objectId: string; name?: string; slug?: string; type?: string; address?: string; status?: string; createdAt?: string };

export function PartnerProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function refresh() {
    try {
      const response = await fetch("/api/partner/properties", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not load properties.");
      setProperties(data.properties || []); setError("");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not load properties."); }
    finally { setLoading(false); }
  }
  useEffect(() => {
    let active = true;
    fetch("/api/partner/properties", { cache: "no-store" })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Could not load properties.");
        if (active) { setProperties(data.properties || []); setError(""); }
      })
      .catch((cause: unknown) => { if (active) setError(cause instanceof Error ? cause.message : "Could not load properties."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  async function publishDraft(propertyId: string) {
    setError(""); setMessage("");
    try {
      const response = await fetch("/api/partner/properties", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ propertyId }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not submit draft.");
      setMessage("Property submitted for platform moderation."); await refresh();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not submit draft."); }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget; setSaving(true); setError(""); setMessage("");
    const form = new FormData(event.currentTarget);
    const payload: Record<string, unknown> = Object.fromEntries(form.entries());
    payload.facilities = String(payload.facilities || "").split(",").map((item) => item.trim()).filter(Boolean);
    try {
      const response = await fetch("/api/partner/properties", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not save property draft.");
      setMessage("Property saved as a private draft. It is not bookable until approved and published.");
      formElement.reset(); await refresh();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not save property draft."); }
    finally { setSaving(false); }
  }

  return <div className="partner-property-workspace">
    <section className="partner-application"><h2>Create a property draft</h2><p>Only the destination, name, type and property information are collected here. Availability, rates and payment stay unconfigured until reviewed and supported.</p>
      <form className="partner-form" onSubmit={submit}>
        <label>Property name<input name="name" required minLength={3} maxLength={120} /></label>
        <label>Accommodation type<select name="type" required defaultValue=""><option value="" disabled>Select a type</option><option value="hotel">Hotel</option><option value="resort">Resort</option><option value="apartment">Apartment</option><option value="guesthouse">Guesthouse</option><option value="villa">Villa</option><option value="hostel">Hostel</option><option value="residence">Residence</option><option value="camp">Camp</option><option value="vacation-home">Vacation home</option><option value="bnb">B&amp;B</option><option value="unique-stay">Unique place to stay</option></select></label>
        <label>Wilaya / destination<input name="city" required placeholder="Algiers, Oran, Djanet…" list="partner-destinations" /></label>
        <datalist id="partner-destinations"><option value="Algiers" /><option value="Oran" /><option value="Constantine" /><option value="Djanet" /><option value="Ghardaïa" /><option value="Béjaïa" /><option value="Tipaza" /></datalist>
        <label>Public address or area<input name="address" maxLength={300} /></label>
        <label>Nightly price (DZD, optional)<input name="nightlyPrice" type="number" min="1" step="1" placeholder="e.g. 12000" /></label>
        <label>Latitude (optional)<input name="latitude" type="number" min="-90" max="90" step="any" placeholder="e.g. 36.75" /></label>
        <label>Longitude (optional)<input name="longitude" type="number" min="-180" max="180" step="any" placeholder="e.g. 3.06" /></label>
        <label className="partner-form-wide">Property description<textarea name="description" required minLength={20} maxLength={2000} rows={5} /></label>
        <label className="partner-form-wide">Facilities, separated by commas<input name="facilities" placeholder="Wi-Fi, breakfast, family rooms" /></label>
        {error && <p className="form-error" role="alert">{error}</p>}{message && <p className="profile-message" role="status">{message}</p>}
        <button type="submit" disabled={saving}>{saving ? "Saving…" : "Save property draft"}</button>
      </form>
    </section>
    <section className="partner-status"><div className="partner-list-heading"><div><p className="dashboard-eyebrow">YOUR INVENTORY</p><h2>Property listings</h2></div><span>{properties.length} draft/listing{properties.length === 1 ? "" : "s"}</span></div>
      {loading ? <p>Loading property listings…</p> : !properties.length ? <p>No property listings yet. Drafts you create here remain private until moderation.</p> : <div className="partner-table-wrap"><table className="partner-table"><thead><tr><th>Property</th><th>Type</th><th>Status</th><th>Created</th></tr></thead><tbody>{properties.map((property) => <tr key={property.objectId}><td>{property.name || "Unnamed property"}</td><td>{property.type || "—"}</td><td><span className={`status-pill status-${property.status || "draft"}`}>{property.status || "draft"}</span>{property.status === "draft" && <button className="table-action" type="button" onClick={() => void publishDraft(property.objectId)}>Submit for review</button>}</td><td>{property.createdAt ? new Date(property.createdAt).toLocaleDateString() : "—"}</td></tr>)}</tbody></table></div>}
    </section>
  </div>;
}
