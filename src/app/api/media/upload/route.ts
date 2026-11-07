import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { currentUser } from "@/lib/parse-auth";
import { createMediaAsset } from "@/lib/parse-tourism";
import { putPrivateMedia } from "@/lib/r2";
import { sessionToken } from "@/lib/session";

export const runtime = "nodejs";
const allowed = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);
const maxBytes = 25 * 1024 * 1024;
export async function POST(request: Request) {
  try { const token = await sessionToken(); if (!token) return NextResponse.json({ error: "Sign in required." }, { status: 401 }); const user = await currentUser(token);
  const form = await request.formData(); const file = form.get("file"); const ownerType = String(form.get("ownerType") || "user"); const ownerId = String(form.get("ownerId") || user.objectId);
  if (ownerType !== "user" || ownerId !== user.objectId) return NextResponse.json({ error: "You can only upload media for your own profile." }, { status: 403 });
  if (!(file instanceof File)) return NextResponse.json({ error: "A media file is required." }, { status: 400 });
  if (!allowed.has(file.type) || file.size > maxBytes) return NextResponse.json({ error: "Only JPEG, PNG, WebP or AVIF up to 25 MB is accepted." }, { status: 415 });
  const id = randomUUID(); const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]/g, "-"); const key = `private/${ownerType}/${ownerId}/${id}-${safeName}`;
  await putPrivateMedia(key, new Uint8Array(await file.arrayBuffer()), file.type);
  const media = await createMediaAsset({ ownerType, ownerId, bucket: process.env.R2_BUCKET!, objectKey: key, contentType: file.type, byteSize: file.size, uploadedBy: user.objectId });
  return NextResponse.json({ id: media.objectId, objectKey: key, visibility: "private" }, { status: 201 });
  } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Could not upload media." }, { status: 500 }); }
}
