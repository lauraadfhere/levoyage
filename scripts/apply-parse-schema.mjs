import { schemas } from "../db/parse-schema.mjs";
import { loadEnv, requireEnv } from "./cloudflare-env.mjs";

const env = loadEnv();
const serverUrl = (env.PARSE_SERVER_URL || "https://parseapi.back4app.com").replace(/\/$/, "");
requireEnv(env, ["PARSE_APP_ID", "PARSE_MASTER_KEY"]);
const headers = { "X-Parse-Application-Id": env.PARSE_APP_ID, "X-Parse-Master-Key": env.PARSE_MASTER_KEY, "Content-Type": "application/json" };

async function request(path, init = {}) {
  const response = await fetch(`${serverUrl}${path}`, { ...init, headers: { ...headers, ...(init.headers || {}) } });
  const json = await response.json().catch(() => ({}));
  return { response, json };
}

let changed = 0;
// All public reads should go through reviewed server-side routes. These collections also
// contain drafts or private operational fields that a blanket Parse public-read ACL would expose.
const publiclyDiscoverable = new Set();
function permissions(className) {
  const canRead = publiclyDiscoverable.has(className);
  const publicRead = canRead ? { "*": true } : {};
  return { find: publicRead, get: publicRead, create: {}, update: {}, delete: {}, addField: {} };
}
for (const schema of schemas) {
  const exists = await request(`/schemas/${encodeURIComponent(schema.className)}`);
  // Parse Server returns code 103 with HTTP 400 for an unknown class, rather than HTTP 404.
  const method = exists.response.status === 404 || exists.json?.code === 103 ? "POST" : "PUT";
  if (!exists.response.ok && method !== "POST") throw new Error(`Could not inspect ${schema.className}: ${JSON.stringify(exists.json)}`);
  // Include fields on updates so newly introduced columns are added to existing classes.
  // Indexes are sent only at creation; repeating an existing index on PUT can fail.
  const payload = method === "POST"
    ? { ...schema, classLevelPermissions: permissions(schema.className) }
    : { className: schema.className, fields: schema.fields, classLevelPermissions: permissions(schema.className) };
  const result = await request(`/schemas/${encodeURIComponent(schema.className)}`, { method, body: JSON.stringify(payload) });
  if (!result.response.ok) throw new Error(`Could not apply ${schema.className}: ${JSON.stringify(result.json)}`);
  changed += 1;
  console.log(`${method === "POST" ? "Created" : "Updated"}: ${schema.className}`);
}
console.log(`Parse tourism schema ready (${changed} classes).`);
