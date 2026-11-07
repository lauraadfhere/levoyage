import { writeFileSync } from "node:fs";
import { loadEnv, requireEnv } from "./cloudflare-env.mjs";

const env = loadEnv();
requireEnv(env, ["CLOUDFLARE_ACCOUNT_ID", "CLOUDFLARE_API_TOKEN", "CLOUDFLARE_D1_DATABASE_NAME"]);
const base = `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/d1/database`;
const headers = { Authorization: `Bearer ${env.CLOUDFLARE_API_TOKEN}`, "Content-Type": "application/json" };
const existing = await fetch(base, { headers }).then(async r => ({ ok: r.ok, data: await r.json() }));
if (!existing.ok) throw new Error(`Cloudflare could not list D1 databases: ${JSON.stringify(existing.data.errors || existing.data)}`);
let database = existing.data.result.find((item) => item.name === env.CLOUDFLARE_D1_DATABASE_NAME);
if (!database) {
  const created = await fetch(base, { method: "POST", headers, body: JSON.stringify({ name: env.CLOUDFLARE_D1_DATABASE_NAME }) }).then(async r => ({ ok: r.ok, data: await r.json() }));
  if (!created.ok) throw new Error(`Cloudflare could not create D1 database: ${JSON.stringify(created.data.errors || created.data)}`);
  database = created.data.result;
}
writeFileSync(".cloudflare-state.json", `${JSON.stringify({ d1DatabaseName: database.name, d1DatabaseId: database.uuid }, null, 2)}\n`);
console.log(`D1 database ready: ${database.name}. Run yarn schema:apply to install the travel schema.`);
