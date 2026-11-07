const parseUrl = () => (process.env.PARSE_SERVER_URL || "https://parseapi.back4app.com").replace(/\/$/, "");
function headers() {
  if (!process.env.PARSE_APP_ID || !process.env.PARSE_MASTER_KEY) throw new Error("Parse tourism backend is not configured.");
  return { "X-Parse-Application-Id": process.env.PARSE_APP_ID, "X-Parse-Master-Key": process.env.PARSE_MASTER_KEY, "Content-Type": "application/json" };
}
async function parse<T>(path: string, init: RequestInit = {}) {
  const response = await fetch(`${parseUrl()}${path}`, { ...init, headers: { ...headers(), ...(init.headers || {}) }, cache: "no-store" });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Parse request failed.");
  return data as T;
}
export async function createMediaAsset(input: { ownerType: string; ownerId: string; bucket: string; objectKey: string; contentType: string; byteSize: number; uploadedBy: string }) {
  return parse<{ objectId: string }>("/classes/MediaAsset", { method: "POST", body: JSON.stringify({ ...input, visibility: "private", uploadedBy: { __type: "Pointer", className: "_User", objectId: input.uploadedBy } }) });
}
export async function findPublicMedia(objectKey: string) {
  const where = encodeURIComponent(JSON.stringify({ objectKey, visibility: "approved_public" }));
  const data = await parse<{ results: Array<{ objectKey: string }> }>(`/classes/MediaAsset?where=${where}&limit=1`);
  return data.results[0] || null;
}

export async function findMediaById(objectId: string) {
  return parse<{ objectId: string; objectKey: string; visibility?: string; ownerId?: string }>(`/classes/MediaAsset/${objectId}`);
}

export function mediaUrlFor(objectKey: string) {
  return `/api/media/${objectKey.split("/").map(encodeURIComponent).join("/")}`;
}

export type ParsePointer = { __type: "Pointer"; className: string; objectId: string };
export type ParseRecord = Record<string, unknown> & { objectId: string; createdAt?: string; updatedAt?: string };

export function pointer(className: string, objectId: string): ParsePointer {
  return { __type: "Pointer", className, objectId };
}

export async function queryParse<T extends ParseRecord = ParseRecord>(className: string, where: Record<string, unknown>, limit = 100) {
  const query = new URLSearchParams({ where: JSON.stringify(where), limit: String(limit), order: "-createdAt" });
  const data = await parse<{ results: T[] }>(`/classes/${encodeURIComponent(className)}?${query}`);
  return data.results;
}

export async function getParseRecord<T extends ParseRecord = ParseRecord>(className: string, objectId: string) {
  return parse<T>(`/classes/${encodeURIComponent(className)}/${encodeURIComponent(objectId)}`);
}

export async function createParseRecord<T extends ParseRecord = ParseRecord>(className: string, values: Record<string, unknown>) {
  return parse<T>(`/classes/${encodeURIComponent(className)}`, { method: "POST", body: JSON.stringify(values) });
}

export async function updateParseRecord<T extends ParseRecord = ParseRecord>(className: string, objectId: string, values: Record<string, unknown>) {
  return parse<T>(`/classes/${encodeURIComponent(className)}/${encodeURIComponent(objectId)}`, { method: "PUT", body: JSON.stringify(values) });
}
