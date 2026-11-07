import { NextResponse } from "next/server";
import { signOut } from "@/lib/parse-auth";
import { SESSION_COOKIE, sessionToken } from "@/lib/session";

export async function POST() {
  const token = await sessionToken();
  if (token) await signOut(token);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
  return response;
}
