import { NextResponse } from "next/server";
import { currentUser } from "@/lib/parse-auth";
import { findPublicMedia } from "@/lib/parse-tourism";
import { getMedia } from "@/lib/r2";
import { sessionToken } from "@/lib/session";

export const runtime = "nodejs";

function ownsPrivateKey(objectKey: string, userId: string) {
  return objectKey.startsWith(`private/user/${userId}/`);
}

export async function GET(_: Request, { params }: { params: Promise<{ key: string[] }> }) {
  try {
    const { key } = await params;
    const objectKey = key.map(decodeURIComponent).join("/");
    if (!objectKey || objectKey.includes("..")) {
      return NextResponse.json({ error: "Media not found" }, { status: 404 });
    }

    let allowed = false;
    try {
      const publicMedia = await findPublicMedia(objectKey);
      allowed = Boolean(publicMedia);
    } catch {
      allowed = false;
    }

    if (!allowed) {
      const token = await sessionToken();
      if (token) {
        try {
          const user = await currentUser(token);
          if (ownsPrivateKey(objectKey, user.objectId)) allowed = true;
        } catch {
          allowed = false;
        }
      }
    }

    if (!allowed) return NextResponse.json({ error: "Media not found" }, { status: 404 });

    const object = await getMedia(objectKey);
    if (!object.Body) return NextResponse.json({ error: "Media not found" }, { status: 404 });

    const isPrivate = objectKey.startsWith("private/");
    return new Response(object.Body.transformToWebStream(), {
      headers: {
        "Content-Type": object.ContentType || "application/octet-stream",
        "Cache-Control": isPrivate ? "private, no-store" : "public, max-age=86400",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not load media." },
      { status: 500 },
    );
  }
}
