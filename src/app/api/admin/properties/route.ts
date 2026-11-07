import { NextResponse } from "next/server";
import { isSameOriginRequest, requireAdmin } from "@/lib/api-access";
import { pointer, queryParse, updateParseRecord, type ParseRecord } from "@/lib/parse-tourism";

export const runtime = "nodejs";
type Property = ParseRecord & { business?: { objectId?: string }; name?: string; type?: string; description?: string; address?: string; status?: string; destination?: { objectId?: string } };
type Business = ParseRecord & { name?: string; verificationStatus?: string; owner?: { objectId?: string } };

export async function GET() {
  try {
    const auth = await requireAdmin();
    if ("response" in auth) return auth.response;
    const submitted = await queryParse<Property>("Property", { status: "submitted" }, 100);
    const records = await Promise.all(submitted.map(async (property) => {
      const [business] = property.business?.objectId ? await queryParse<Business>("Business", { objectId: property.business.objectId }, 1) : [];
      return { ...property, businessName: business?.name || "Business", businessVerification: business?.verificationStatus || "pending" };
    }));
    return NextResponse.json({ properties: records }, { headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return NextResponse.json({ error: "Could not load property moderation queue." }, { status: 503 });
  }
}

export async function PATCH(request: Request) {
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: "Request origin could not be verified." }, { status: 403 });
  try {
    const auth = await requireAdmin();
    if ("response" in auth) return auth.response;
    const body = await request.json().catch(() => null) as Record<string, unknown> | null;
    const propertyId = typeof body?.propertyId === "string" ? body.propertyId.trim() : "";
    const decision = body?.decision;
    const reason = typeof body?.reason === "string" ? body.reason.trim().slice(0, 500) : "";
    if (!propertyId || !["approve", "reject"].includes(String(decision))) return NextResponse.json({ error: "Choose a property and a valid decision." }, { status: 400 });
    if (decision === "reject" && !reason) return NextResponse.json({ error: "Add a reason so the partner can update the listing." }, { status: 400 });
    const property = await queryParse<Property>("Property", { objectId: propertyId, status: "submitted" }, 1).then((rows) => rows[0]);
    if (!property || !property.business?.objectId) return NextResponse.json({ error: "Submitted property not found." }, { status: 404 });
    const [business] = await queryParse<Business>("Business", { objectId: property.business.objectId }, 1);
    if (!business || business.verificationStatus !== "verified") return NextResponse.json({ error: "The listing owner must be an approved business first." }, { status: 409 });
    await updateParseRecord("Property", property.objectId, {
      status: decision === "approve" ? "published" : "draft",
      ...(decision === "approve" ? { reviewedAt: { __type: "Date", iso: new Date().toISOString() } } : { moderationReason: reason }),
      reviewedBy: pointer("_User", auth.viewer.objectId),
    });
    return NextResponse.json({ ok: true, status: decision === "approve" ? "published" : "draft" }, { headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return NextResponse.json({ error: "Could not save the property moderation decision." }, { status: 503 });
  }
}
