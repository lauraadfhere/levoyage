import { NextResponse } from "next/server";
import { currentUser, profileFor, saveProfile } from "@/lib/parse-auth";
import { findMediaById, mediaUrlFor } from "@/lib/parse-tourism";
import { sessionToken } from "@/lib/session";

export async function GET() {
  try {
    const token = await sessionToken();
    if (!token) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
    const user = await currentUser(token);
    const profile = await profileFor(user.objectId, token);
    let avatarUrl: string | null = null;
    const avatarId = profile?.avatar?.objectId || null;
    if (avatarId) {
      try {
        const media = await findMediaById(avatarId);
        if (media.objectKey && (media.visibility === "approved_public" || media.ownerId === user.objectId || media.objectKey.startsWith(`private/user/${user.objectId}/`))) {
          avatarUrl = mediaUrlFor(media.objectKey);
        }
      } catch {
        avatarUrl = null;
      }
    }
    return NextResponse.json({
      id: user.objectId,
      email: user.email || user.username,
      fullName: profile?.fullName || user.fullName || "",
      phone: profile?.phone || "",
      locale: profile?.locale || "en",
      bio: profile?.bio || "",
      avatarId,
      avatarUrl,
    });
  } catch {
    return NextResponse.json({ error: "Your session has expired. Please sign in again." }, { status: 401 });
  }
}

export async function PUT(request: Request) {
  try {
    const token = await sessionToken();
    if (!token) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
    const user = await currentUser(token);
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    if (!body.fullName?.trim()) return NextResponse.json({ error: "Full name is required." }, { status: 400 });
    if (!["en", "fr", "ar"].includes(body.locale)) return NextResponse.json({ error: "Choose a supported language." }, { status: 400 });
    await saveProfile(
      user.objectId,
      {
        fullName: body.fullName.trim(),
        phone: body.phone,
        locale: body.locale,
        bio: body.bio,
        avatarId: body.avatarId,
      },
      token,
    );
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Could not save profile." }, { status: 400 });
  }
}
