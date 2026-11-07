import { NextResponse } from "next/server";
import { isSameOriginRequest, requireAdmin } from "@/lib/api-access";
import { pointer, queryParse, updateParseRecord, type ParseRecord } from "@/lib/parse-tourism";

export const runtime = "nodejs";
type Review = ParseRecord & { entityId?: string; entityType?: string; displayName?: string; rating?: number; body?: string; status?: string; booking?: { objectId?: string } };
export async function GET() {
  try {
    const auth = await requireAdmin();
    if ("response" in auth) return auth.response;
    const reviews = await queryParse<Review>("Review", { status: "pending" }, 100);
    return NextResponse.json({ reviews }, { headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return NextResponse.json({ error: "Could not load review moderation queue." }, { status: 503 });
  }
}

export async function PATCH(request: Request) {
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: "Request origin could not be verified." }, { status: 403 });
  try {
    const auth = await requireAdmin();
    if ("response" in auth) return auth.response;
    const body = await request.json().catch(() => null) as Record<string, unknown> | null;
    const reviewId = typeof body?.reviewId === "string" ? body.reviewId.trim() : "";
    const decision = body?.decision;
    const reason = typeof body?.reason === "string" ? body.reason.trim().slice(0, 500) : "";
    if (!reviewId || !["approve", "reject"].includes(String(decision))) return NextResponse.json({ error: "Choose a review and a valid decision." }, { status: 400 });
    if (decision === "reject" && !reason) return NextResponse.json({ error: "Add a reason for returning this review." }, { status: 400 });
    const review = await queryParse<Review>("Review", { objectId: reviewId, status: "pending" }, 1).then((rows) => rows[0]);
    if (!review) return NextResponse.json({ error: "Pending review not found." }, { status: 404 });
    await updateParseRecord("Review", review.objectId, {
      status: decision === "approve" ? "published" : "rejected",
      ...(decision === "reject" ? { moderationReason: reason } : {}),
      moderatedBy: pointer("_User", auth.viewer.objectId),
      moderatedAt: { __type: "Date", iso: new Date().toISOString() },
    });
    return NextResponse.json({ ok: true, status: decision === "approve" ? "published" : "rejected" }, { headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return NextResponse.json({ error: "Could not save the review decision." }, { status: 503 });
  }
}
