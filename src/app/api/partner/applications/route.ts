import { NextResponse } from "next/server";
import { getBusinessesForOwner, isSameOriginRequest, requireViewer } from "@/lib/api-access";
import { createParseRecord, pointer, queryParse, type ParseRecord } from "@/lib/parse-tourism";

export const runtime = "nodejs";
const kinds = new Set(["hotel", "tour_operator", "restaurant", "activity_provider", "agency"]);
type Application = ParseRecord & { applicant?: { objectId?: string }; status?: string };

export async function GET() {
  try {
    const auth = await requireViewer();
    if ("response" in auth) return auth.response;
    const [applications, businesses] = await Promise.all([
      queryParse<Application>("PartnerApplication", { applicant: pointer("_User", auth.viewer.objectId) }),
      getBusinessesForOwner(auth.viewer.objectId),
    ]);
    return NextResponse.json({ applications, businesses: businesses.map(({ objectId, name, verificationStatus }) => ({ objectId, name, verificationStatus })) }, { headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return NextResponse.json({ error: "Could not load partner applications." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: "Request origin could not be verified." }, { status: 403 });
  try {
    const auth = await requireViewer();
    if ("response" in auth) return auth.response;
    const body = await request.json().catch(() => null);
    const values = body && typeof body === "object" ? body as Record<string, unknown> : {};
    const businessName = typeof values.businessName === "string" ? values.businessName.trim() : "";
    const contactName = typeof values.contactName === "string" ? values.contactName.trim() : "";
    const email = typeof values.email === "string" ? values.email.trim().toLowerCase() : "";
    const kind = typeof values.kind === "string" ? values.kind : "";
    const description = typeof values.description === "string" ? values.description.trim() : "";
    if (!businessName || !contactName || !/^\S+@\S+\.\S+$/.test(email) || !kinds.has(kind) || !description) {
      return NextResponse.json({ error: "Add a valid contact, business name, provider type and description." }, { status: 400 });
    }
    const [existing, businesses] = await Promise.all([
      queryParse<Application>("PartnerApplication", { applicant: pointer("_User", auth.viewer.objectId), status: "pending" }, 20),
      getBusinessesForOwner(auth.viewer.objectId),
    ]);
    if (existing.length) return NextResponse.json({ error: "You already have a partner application awaiting review." }, { status: 409 });
    if (businesses.some((business) => business.verificationStatus === "verified")) return NextResponse.json({ error: "Your account already has an approved partner business." }, { status: 409 });
    const application = await createParseRecord<Application>("PartnerApplication", {
      applicant: pointer("_User", auth.viewer.objectId), businessName, contactName, email, kind,
      phone: typeof values.phone === "string" ? values.phone.trim().slice(0, 40) : "",
      website: typeof values.website === "string" ? values.website.trim().slice(0, 200) : "",
      address: typeof values.address === "string" ? values.address.trim().slice(0, 300) : "",
      serviceArea: typeof values.serviceArea === "string" ? values.serviceArea.trim().slice(0, 160) : "",
      description: description.slice(0, 2000), status: "pending",
    });
    return NextResponse.json({ application }, { status: 201, headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return NextResponse.json({ error: "Could not submit the partner application. Please try again." }, { status: 503 });
  }
}
