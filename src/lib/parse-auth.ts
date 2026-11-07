const server = () => (process.env.PARSE_SERVER_URL || "https://parseapi.back4app.com").replace(/\/$/, "");

function appHeaders(sessionToken?: string, master = false) {
  const appId = process.env.PARSE_APP_ID;
  if (!appId) throw new Error("Parse is not configured.");
  const headers: Record<string, string> = { "X-Parse-Application-Id": appId, "Content-Type": "application/json" };
  if (master) {
    if (!process.env.PARSE_MASTER_KEY) throw new Error("Parse server access is not configured.");
    headers["X-Parse-Master-Key"] = process.env.PARSE_MASTER_KEY;
  } else if (process.env.PARSE_JAVASCRIPT_KEY) {
    headers["X-Parse-Javascript-Key"] = process.env.PARSE_JAVASCRIPT_KEY;
  }
  if (sessionToken) headers["X-Parse-Session-Token"] = sessionToken;
  return headers;
}

async function request<T>(path: string, init: RequestInit = {}, session?: string, master = false) {
  const response = await fetch(`${server()}${path}`, {
    ...init,
    headers: { ...appHeaders(session, master), ...(init.headers || {}) },
    cache: "no-store",
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "The travel account service is unavailable.");
  return data as T;
}

export type ParseUser = { objectId: string; username: string; email?: string; fullName?: string; platformRole?: string; sessionToken?: string };
type Profile = { objectId: string; fullName?: string; phone?: string; locale?: string; bio?: string; avatar?: { objectId?: string } };

export async function signUp(email: string, password: string, fullName: string) {
  return request<ParseUser>("/users", {
    method: "POST",
    body: JSON.stringify({ username: email.toLowerCase(), email: email.toLowerCase(), password, fullName }),
  });
}

export async function signIn(email: string, password: string) {
  return request<ParseUser>(
    `/login?username=${encodeURIComponent(email.toLowerCase())}&password=${encodeURIComponent(password)}`,
    { method: "GET" },
  );
}

export async function signOut(session: string) {
  try {
    await request("/logout", { method: "POST" }, session);
  } catch {
    // Cookie is cleared by the route even if Parse session revoke fails.
  }
}

export async function currentUser(session: string) {
  return request<ParseUser>("/users/me", {}, session);
}

async function queryProfile(userId: string, session?: string, master = false) {
  const where = encodeURIComponent(JSON.stringify({ user: { __type: "Pointer", className: "_User", objectId: userId } }));
  const data = await request<{ results: Profile[] }>(`/classes/UserProfile?where=${where}&limit=1`, {}, session, master);
  return data.results[0] || null;
}

/** Prefer the user session; fall back to master key only when available. */
export async function profileFor(userId: string, session?: string) {
  if (session) {
    try {
      return await queryProfile(userId, session, false);
    } catch {
      /* CLPs may block; try master next */
    }
  }
  if (process.env.PARSE_MASTER_KEY) {
    try {
      return await queryProfile(userId, undefined, true);
    } catch {
      return null;
    }
  }
  return null;
}

export async function saveProfile(
  userId: string,
  input: { fullName: string; phone?: string; locale: string; bio?: string; avatarId?: string },
  session?: string,
) {
  const existing = await profileFor(userId, session);
  const body: Record<string, unknown> = {
    fullName: input.fullName,
    phone: input.phone || "",
    locale: input.locale,
    bio: input.bio || "",
    user: { __type: "Pointer", className: "_User", objectId: userId },
  };
  if (input.avatarId) body.avatar = { __type: "Pointer", className: "MediaAsset", objectId: input.avatarId };

  const path = existing?.objectId ? `/classes/UserProfile/${existing.objectId}` : "/classes/UserProfile";
  const method = existing?.objectId ? "PUT" : "POST";

  if (session) {
    try {
      return await request(path, { method, body: JSON.stringify(body) }, session, false);
    } catch {
      /* fall through to master */
    }
  }
  if (!process.env.PARSE_MASTER_KEY) {
    throw new Error("Could not save profile. Sign in again or configure Parse access.");
  }
  return request(path, { method, body: JSON.stringify(body) }, undefined, true);
}
