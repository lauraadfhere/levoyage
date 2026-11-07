import { NextResponse } from "next/server";
import { saveProfile, signIn, signUp } from "@/lib/parse-auth";
import { SESSION_COOKIE } from "@/lib/session";

function setSession(response: NextResponse, token: string) {
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const password = typeof body.password === "string" ? body.password : "";
    const fullName = typeof body.fullName === "string" ? body.fullName.trim() : "";
    if (!email || !password || !fullName || password.length < 8) {
      return NextResponse.json({ error: "Name, email and a password of at least 8 characters are required." }, { status: 400 });
    }

    let user = await signUp(email, password, fullName);
    if (!user.sessionToken) {
      user = await signIn(email, password);
    }
    if (!user.sessionToken) {
      return NextResponse.json({ error: "Account created, but a session could not be started. Please sign in." }, { status: 201 });
    }

    try {
      await saveProfile(user.objectId, { fullName, locale: "en" }, user.sessionToken);
    } catch {
      // Profile can be completed later from /profile; do not block signup.
    }

    const response = NextResponse.json({ user: { id: user.objectId, email: user.email || email, fullName } }, { status: 201 });
    setSession(response, user.sessionToken);
    return response;
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Could not create account." }, { status: 400 });
  }
}
