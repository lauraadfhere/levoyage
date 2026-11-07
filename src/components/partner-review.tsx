"use client";

import { useEffect, useState } from "react";

type Application = { objectId: string; businessName?: string; kind?: string; contactName?: string; email?: string; phone?: string; website?: string; address?: string; serviceArea?: string; description?: string; status?: string; createdAt?: string; decisionReason?: string };

export function PartnerReview() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [working, setWorking] = useState("");
  const [reasons, setReasons] = useState<Record<string, string>>({});
  async function refresh() {
    try {
      const response = await fetch("/api/admin/partner-applications", { cache: "no-store" });
      const data = await response.json();
      if (response.status === 401 || response.status === 403) throw new Error(data.error || "Administrator access is required.");
      if (!response.ok) throw new Error(data.error || "Could not load review queue.");
      setApplications(data.applications || []); setError("");
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not load review queue."); }
    finally { setLoading(false); }
  }
  useEffect(() => {
    let active = true;
    fetch("/api/admin/partner-applications", { cache: "no-store" })
      .then(async (response) => {
        const data = await response.json();
        if (response.status === 401 || response.status === 403) throw new Error(data.error || "Administrator access is required.");
        if (!response.ok) throw new Error(data.error || "Could not load review queue.");
        if (active) { setApplications(data.applications || []); setError(""); }
      })
      .catch((cause: unknown) => { if (active) setError(cause instanceof Error ? cause.message : "Could not load review queue."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  async function decide(applicationId: string, decision: "approve" | "reject") {
    setWorking(applicationId); setError("");
    try {
      const response = await fetch("/api/admin/partner-applications", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ applicationId, decision, reason: reasons[applicationId] || "" }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Could not update this application.");
      await refresh();
    } catch (cause) { setError(cause instanceof Error ? cause.message : "Could not update this application."); }
    finally { setWorking(""); }
  }
  return <section className="admin-review"><div className="partner-list-heading"><div><p className="dashboard-eyebrow">PLATFORM TRUST</p><h2>Partner verification queue</h2></div><span>{applications.filter((item) => item.status === "pending").length} pending</span></div>
    {error && <p className="form-error" role="alert">{error}</p>}
    {loading ? <p>Loading applications…</p> : !applications.length ? <p>No partner applications have been submitted.</p> : <div className="admin-review-list">{applications.map((item) => <article className="admin-review-card" key={item.objectId}>
      <header><div><p className="dashboard-eyebrow">{(item.kind || "provider").replaceAll("_", " ").toUpperCase()}</p><h3>{item.businessName || "Business"}</h3></div><span className={`status-pill status-${item.status || "pending"}`}>{item.status || "pending"}</span></header>
      <dl><div><dt>Contact</dt><dd>{item.contactName || "—"}</dd></div><div><dt>Email</dt><dd>{item.email || "—"}</dd></div><div><dt>Phone</dt><dd>{item.phone || "—"}</dd></div><div><dt>Service area</dt><dd>{item.serviceArea || "—"}</dd></div><div><dt>Address</dt><dd>{item.address || "—"}</dd></div><div><dt>Website</dt><dd>{item.website || "—"}</dd></div></dl>
      <p>{item.description}</p>{item.decisionReason && <p><strong>Decision note:</strong> {item.decisionReason}</p>}
      {item.status === "pending" && <div className="admin-review-actions"><label>Rejection reason (required for rejection)<input value={reasons[item.objectId] || ""} onChange={(event) => setReasons((current) => ({ ...current, [item.objectId]: event.target.value }))} /></label><div><button type="button" disabled={Boolean(working)} onClick={() => void decide(item.objectId, "approve")}>{working === item.objectId ? "Saving…" : "Approve partner"}</button><button type="button" className="reject-button" disabled={Boolean(working) || !(reasons[item.objectId] || "").trim()} onClick={() => void decide(item.objectId, "reject")}>Reject</button></div></div>}
    </article>)}</div>}
  </section>;
}
