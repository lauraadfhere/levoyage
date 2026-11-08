import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { loadEnv, requireEnv } from "./cloudflare-env.mjs";

// Fetches one openly licensed Wikimedia Commons photo per wilaya, uploads a
// 960px copy to the Parse file store, and writes a manifest the site reads.
const env = loadEnv();
requireEnv(env, ["PARSE_APP_ID", "PARSE_MASTER_KEY"]);
const serverUrl = (env.PARSE_SERVER_URL || "https://parseapi.back4app.com").replace(/\/$/, "");
const UA = "LeVoyageBot/1.0 (https://levoyage.dz; dev@levoyage.dz)";
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const wilayas = JSON.parse(process.argv[2] || "[]");
if (!wilayas.length) throw new Error("Pass a JSON array of { slug, name } as the first argument.");

const slugOf = (value) => value.toLocaleLowerCase("en").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

async function findPhoto(name) {
  const query = encodeURIComponent(`"${name}" Algeria`);
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrlimit=10&gsrsearch=${query}&prop=imageinfo&iiprop=url|extmetadata|mime|size&iiurlwidth=960&format=json`;
  const data = await (await fetch(url, { headers: { "User-Agent": UA } })).json();
  const pages = Object.values(data.query?.pages || {}).sort((a, b) => a.index - b.index);
  const key = slugOf(name).split("-")[0];
  for (const page of pages) {
    const info = page.imageinfo?.[0];
    if (!info || !/^image\/jpeg$/.test(info.mime) || info.width < 900) continue;
    if (!env.WILAYA_FALLBACK && !slugOf(page.title).includes(key)) continue;
    return {
      title: page.title,
      thumbUrl: info.thumburl,
      pageUrl: info.descriptionurl,
      artist: (info.extmetadata?.Artist?.value || "").replace(/<[^>]+>/g, "").trim(),
      license: info.extmetadata?.LicenseShortName?.value || "",
    };
  }
  return null;
}

async function uploadToParse(filename, bytes) {
  const response = await fetch(`${serverUrl}/files/${encodeURIComponent(filename)}`, {
    method: "POST",
    headers: { "X-Parse-Application-Id": env.PARSE_APP_ID, "X-Parse-Master-Key": env.PARSE_MASTER_KEY, "Content-Type": "image/jpeg" },
    body: bytes,
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error || `Parse upload failed (${response.status})`);
  return body.url;
}

const manifest = existsSync("src/lib/wilaya-images.generated.json") ? JSON.parse(readFileSync("src/lib/wilaya-images.generated.json", "utf8")) : {};
const misses = [];
for (const { slug, name } of wilayas) {
  if (manifest[slug]) continue;
  try {
    const photo = await findPhoto(name);
    if (!photo) { misses.push(name); console.log(`no photo: ${name}`); await sleep(1200); continue; }
    const download = await fetch(photo.thumbUrl, { headers: { "User-Agent": UA } });
    if (!download.ok) throw new Error(`download ${download.status}`);
    const bytes = new Uint8Array(await download.arrayBuffer());
    const url = await uploadToParse(`wilaya-${slug}.jpg`, bytes);
    manifest[slug] = { url, source: photo.pageUrl, title: photo.title, artist: photo.artist, license: photo.license };
    console.log(`ok: ${name} -> ${url}`);
  } catch (error) {
    misses.push(name);
    console.log(`failed: ${name}: ${error.message}`);
  }
  await sleep(1200);
}

writeFileSync("src/lib/wilaya-images.generated.json", `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`Saved ${Object.keys(manifest).length} images. Missing: ${misses.join(", ") || "none"}`);
