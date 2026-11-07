import { NextResponse } from "next/server";
import { requireAdmin, isSameOriginRequest } from "@/lib/api-access";
import { createParseRecord, pointer, queryParse, updateParseRecord, type ParseRecord } from "@/lib/parse-tourism";

export const runtime = "nodejs";
type Application = ParseRecord & { applicant?: { objectId?: string }; businessName?: string; kind?: string; contactName?: string; email?: string; phone?: string; website?: string; address?: string; serviceArea?: string; description?: string; status?: string };
type Business = ParseRecord & { name?: string; verificationStatus?: string };

export async function GET() {
  try {
    const auth = await requireAdmin();
    if ("response" in auth) return auth.response;
    const applications = await queryParse<Application>("PartnerApplication", {}, 100);
    return NextResponse.json({ applications }, { headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return NextResponse.json({ error: "Could not load partner applications." }, { status: 503 });
  }
}

export async function PATCH(request: Request) {
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: "Request origin could not be verified." }, { status: 403 });
  try {
    const auth = await requireAdmin();
    if ("response" in auth) return auth.response;
    const body = await request.json().catch(() => null) as Record<string, unknown> | null;
    const id = typeof body?.applicationId === "string" ? body.applicationId.trim() : "";
    const decision = body?.decision;
    const reason = typeof body?.reason === "string" ? body.reason.trim().slice(0, 500) : "";
    if (!id || !["approve", "reject"].includes(String(decision))) return NextResponse.json({ error: "Choose an application and a valid decision." }, { status: 400 });
    if (decision === "reject" && !reason) return NextResponse.json({ error: "Add a reason so the applicant knows what to improve." }, { status: 400 });
    const application = await queryParse<Application>("PartnerApplication", { objectId: id, status: "pending" }, 1).then((rows) => rows[0]);
    if (!application || !application.applicant?.objectId) return NextResponse.json({ error: "Pending application not found." }, { status: 404 });
    let businessId: string | undefined;
    if (decision === "approve") {
      const owner = pointer("_User", application.applicant.objectId);
      const existing = await queryParse<Business>("Business", { owner, name: application.businessName || "" }, 1);
      const business = existing[0] || await createParseRecord<Business>("Business", {
        owner, name: application.businessName, kind: application.kind || "agency", verificationStatus: "verified",
        phone: application.phone || "", email: application.email || "", website: application.website || "", address: application.address || "",
        serviceArea: application.serviceArea || "", description: application.description || "",
      });
      businessId = business.objectId;
    }
    await updateParseRecord("PartnerApplication", application.objectId, {
      status: decision === "approve" ? "approved" : "rejected",
      ...(decision === "reject" ? { decisionReason: reason } : {}),
      reviewedBy: pointer("_User", auth.viewer.objectId),
      reviewedAt: { __type: "Date", iso: new Date().toISOString() },
      ...(businessId ? { business: pointer("Business", businessId) } : {}),
    });
    return NextResponse.json({ ok: true, status: decision === "approve" ? "approved" : "rejected" }, { headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return NextResponse.json({ error: "Could not save the partner decision." }, { status: 503 });
  }
}
