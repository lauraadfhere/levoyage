import { loadEnv, requireEnv } from "./cloudflare-env.mjs";

const env = loadEnv();
requireEnv(env, ["PARSE_APP_ID", "PARSE_MASTER_KEY"]);
const base = (env.PARSE_SERVER_URL || "https://parseapi.back4app.com").replace(/\/$/, "");
const headers = { "X-Parse-Application-Id": env.PARSE_APP_ID, "X-Parse-Master-Key": env.PARSE_MASTER_KEY, "Content-Type": "application/json" };
const users = [
  { email: "demo.traveler@poilian.test", password: "PoilianTraveler!2026", fullName: "Demo Traveler", role: "traveler" },
  { email: "demo.partner@poilian.test", password: "PoilianPartner!2026", fullName: "Demo Partner", role: "partner" },
  { email: "demo.admin@poilian.test", password: "PoilianAdmin!2026", fullName: "Demo Administrator", role: "admin" },
];
async function api(path, init = {}) { const response = await fetch(`${base}${path}`, { ...init, headers: { ...headers, ...(init.headers || {}) } }); const body = await response.json().catch(() => ({})); if (!response.ok) throw new Error(body.error || `Request failed for ${path}`); return body; }
async function lookup(email) { const where = encodeURIComponent(JSON.stringify({ email })); const body = await api(`/users?where=${where}&limit=1`); return body.results[0]; }
async function ensureProfile(user, data) { const where = encodeURIComponent(JSON.stringify({ user: { __type: "Pointer", className: "_User", objectId: user.objectId } })); const existing = await api(`/classes/UserProfile?where=${where}&limit=1`); if (!existing.results.length) await api("/classes/UserProfile", { method: "POST", body: JSON.stringify({ user: { __type: "Pointer", className: "_User", objectId: user.objectId }, fullName: data.fullName, locale: "en", travelerType: data.role }) }); }
for (const data of users) {
  let user = await lookup(data.email);
  if (!user) user = await api("/users", { method: "POST", body: JSON.stringify({ username: data.email, email: data.email, password: data.password, fullName: data.fullName, platformRole: data.role }) });
  else await api(`/users/${user.objectId}`, { method: "PUT", body: JSON.stringify({ fullName: data.fullName, platformRole: data.role }) });
  await ensureProfile(user, data);
  if (data.role === "partner") { const where = encodeURIComponent(JSON.stringify({ owner: { __type: "Pointer", className: "_User", objectId: user.objectId } })); const business = await api(`/classes/Business?where=${where}&limit=1`); if (!business.results.length) await api("/classes/Business", { method: "POST", body: JSON.stringify({ owner: { __type: "Pointer", className: "_User", objectId: user.objectId }, name: "Demo Sahara Horizons", kind: "tour_operator", verificationStatus: "verified", email: data.email }) }); }
  if (data.role === "admin") { const role = await api("/roles", { method: "POST", body: JSON.stringify({ name: "Administrator", users: { __op: "AddRelation", objects: [{ __type: "Pointer", className: "_User", objectId: user.objectId }] } }) }).catch(async () => { const where = encodeURIComponent(JSON.stringify({ name: "Administrator" })); const found = await api(`/roles?where=${where}&limit=1`); if (found.results[0]) await api(`/roles/${found.results[0].objectId}`, { method: "PUT", body: JSON.stringify({ users: { __op: "AddRelation", objects: [{ __type: "Pointer", className: "_User", objectId: user.objectId }] } }) }); }); void role; }
  console.log(`Ready: ${data.role}`);
}
console.log("Demo accounts and linked profiles are ready.");
