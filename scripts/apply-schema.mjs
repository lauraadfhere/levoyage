import { existsSync, readFileSync } from "node:fs";
import { loadEnv, requireEnv } from "./cloudflare-env.mjs";

const env = loadEnv();
requireEnv(env, ["CLOUDFLARE_ACCOUNT_ID", "CLOUDFLARE_API_TOKEN"]);
let databaseId = env.CLOUDFLARE_D1_DATABASE_ID;
if (!databaseId && existsSync(".cloudflare-state.json")) databaseId = JSON.parse(readFileSync(".cloudflare-state.json", "utf8")).d1DatabaseId;
if (!databaseId) throw new Error("No D1 database ID. Run yarn cloudflare:provision or set CLOUDFLARE_D1_DATABASE_ID in .env.local.");
const sql = readFileSync("db/schema.sql", "utf8");
const endpoint = `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/d1/database/${databaseId}/query`;
const response = await fetch(endpoint, { method: "POST", headers: { Authorization: `Bearer ${env.CLOUDFLARE_API_TOKEN}`, "Content-Type": "application/json" }, body: JSON.stringify({ sql }) });
const body = await response.json();
if (!response.ok || !body.success) throw new Error(`Schema was not applied: ${JSON.stringify(body.errors || body)}`);
console.log("Tourism platform schema applied successfully.");
