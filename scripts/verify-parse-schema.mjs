import { schemas } from "../db/parse-schema.mjs";
import { loadEnv, requireEnv } from "./cloudflare-env.mjs";

const env = loadEnv();
requireEnv(env, ["PARSE_APP_ID", "PARSE_MASTER_KEY"]);
const base = (env.PARSE_SERVER_URL || "https://parseapi.back4app.com").replace(/\/$/, "");
const headers = { "X-Parse-Application-Id": env.PARSE_APP_ID, "X-Parse-Master-Key": env.PARSE_MASTER_KEY };
for (const expected of schemas) {
  const response = await fetch(`${base}/schemas/${encodeURIComponent(expected.className)}`, { headers });
  const actual = await response.json();
  if (!response.ok) throw new Error(`Missing class ${expected.className}`);
  const absent = Object.keys(expected.fields).filter((field) => !actual.fields?.[field]);
  if (absent.length) throw new Error(`${expected.className} is missing fields: ${absent.join(", ")}`);
}
console.log(`Verified ${schemas.length} Parse classes and their required fields.`);
