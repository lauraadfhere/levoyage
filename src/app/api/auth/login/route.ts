import { NextResponse } from "next/server";
import { signIn } from "@/lib/parse-auth";
import { SESSION_COOKIE } from "@/lib/session";
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const password = typeof body.password === "string" ? body.password : "";
    if (!email || !password) return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    const user = await signIn(email, password);
    if (!user.sessionToken) throw new Error("No session was returned by the account service.");
    const response = NextResponse.json({ user: { id: user.objectId, email: user.email, fullName: user.fullName } });
    response.cookies.set(SESSION_COOKIE, user.sessionToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Could not sign in." }, { status: 401 });
  }
}
