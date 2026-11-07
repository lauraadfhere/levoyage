import { readFileSync } from "node:fs";
import { loadEnv, requireEnv } from "./cloudflare-env.mjs";
const env = loadEnv(); requireEnv(env, ["PARSE_APP_ID", "PARSE_MASTER_KEY"]);
const base = (env.PARSE_SERVER_URL || "https://parseapi.back4app.com").replace(/\/$/, ""); const headers = { "X-Parse-Application-Id": env.PARSE_APP_ID, "X-Parse-Master-Key": env.PARSE_MASTER_KEY, "Content-Type": "application/json" };
const catalog = readFileSync("algeria_69_wilayas_tourism_master_catalog.md", "utf8");
const slug = value => value.toLocaleLowerCase("en").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
async function api(path, init = {}) { const response = await fetch(`${base}${path}`, { ...init, headers: { ...headers, ...(init.headers || {}) } }); const body = await response.json().catch(() => ({})); if (!response.ok) throw new Error(body.error || `Catalog import failed: ${path}`); return body; }
const destinations = await api("/classes/Destination?where=" + encodeURIComponent(JSON.stringify({ countryCode: "DZ" })) + "&limit=100"); const byWilaya = new Map(destinations.results.map(item => [item.wilaya, item])); const existing = await api("/classes/Attraction?limit=1000&keys=slug"); const existingSlugs = new Set(existing.results.map(item => item.slug));
let current = null, skipped = 0; const pending = [];
for (const line of catalog.split(/\r?\n/)) {
  const heading = line.match(/^##\s+\d{2}\s+[—-]\s+(.+?)(?:\s+\(|$)/); if (heading) { current = heading[1].trim(); continue; }
  const place = line.match(/^-\s+\*\*(.+?)\*\*/); if (!place || !current) continue;
  const destination = byWilaya.get(current); if (!destination) { skipped += 1; continue; }
  const name = place[1].trim(); const itemSlug = `${destination.slug}-${slug(name)}`;
  if (!existingSlugs.has(itemSlug)) pending.push({ destination: { __type: "Pointer", className: "Destination", objectId: destination.objectId }, slug: itemSlug, name, category: "discovery_candidate", description: "Imported from the Algeria tourism master catalog; pending verification before publication or booking.", source: "algeria_69_wilayas_tourism_master_catalog", verificationStatus: "discovered", translations: { en: { name } } });
}
for (let index = 0; index < pending.length; index += 50) { const requests = pending.slice(index, index + 50).map(body => ({ method: "POST", path: "/classes/Attraction", body })); await api("/batch", { method: "POST", body: JSON.stringify({ requests }) }); }
console.log(`Tourism catalog imported: ${pending.length} new discovery places; ${skipped} entries without a seeded wilaya.`);
