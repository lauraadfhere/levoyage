type D1Result<T> = { success: boolean; result: T[]; errors?: unknown[] };
export async function d1Query<T = Record<string, unknown>>(sql: string, params: unknown[] = []) {
  const account = process.env.CLOUDFLARE_ACCOUNT_ID;
  const database = process.env.CLOUDFLARE_D1_DATABASE_ID;
  const token = process.env.CLOUDFLARE_API_TOKEN;
  if (!account || !database || !token) throw new Error("D1 is not configured.");
  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${account}/d1/database/${database}/query`, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ sql, params }), cache: "no-store" });
  const body = await response.json() as D1Result<T>;
  if (!response.ok || !body.success) throw new Error("D1 query failed.");
  return body.result;
}
