import { NextResponse } from "next/server";
import { isSameOriginRequest, requireApprovedPartner, requireViewer } from "@/lib/api-access";
import { createParseRecord, pointer, queryParse, updateParseRecord, type ParseRecord } from "@/lib/parse-tourism";
import { getWilayas } from "@/lib/destinations-catalog";
import { slugify } from "@/lib/slug";

export const runtime = "nodejs";
type Property = ParseRecord & { business?: { objectId?: string }; name?: string; slug?: string; type?: string; status?: string; address?: string; description?: string };
type Destination = ParseRecord & { slug?: string; wilaya?: string; city?: string };
const types = new Set(["hotel", "resort", "apartment", "guesthouse", "villa", "hostel", "residence", "camp"]);

export async function GET() {
  try {
    const auth = await requireViewer();
    if ("response" in auth) return auth.response;
    const access = await requireApprovedPartner(auth.viewer.objectId);
    if ("response" in access) return access.response;
    const properties = await queryParse<Property>("Property", { business: pointer("Business", access.business.objectId) });
    return NextResponse.json({ properties }, { headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return NextResponse.json({ error: "Could not load your property listings." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: "Request origin could not be verified." }, { status: 403 });
  try {
    const auth = await requireViewer();
    if ("response" in auth) return auth.response;
    const access = await requireApprovedPartner(auth.viewer.objectId);
    if ("response" in access) return access.response;
    const body = await request.json().catch(() => null) as Record<string, unknown> | null;
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const city = typeof body?.city === "string" ? body.city.trim() : "";
    const type = typeof body?.type === "string" ? body.type : "";
    const description = typeof body?.description === "string" ? body.description.trim() : "";
    if (name.length < 3 || name.length > 120 || description.length < 20 || description.length > 2000 || !types.has(type)) {
      return NextResponse.json({ error: "Enter a property name, type and description (20–2,000 characters)." }, { status: 400 });
    }
    const wilaya = getWilayas().find((item) => item.slug === slugify(city) || item.name.toLocaleLowerCase() === city.toLocaleLowerCase());
    if (!wilaya) return NextResponse.json({ error: "Choose a destination from the Algeria destinations catalog." }, { status: 400 });
    const matches = await queryParse<Destination>("Destination", { slug: wilaya.slug, countryCode: "DZ" }, 1);
    const destination = matches[0];
    if (!destination) return NextResponse.json({ error: "The selected destination is not initialized for partner listings yet." }, { status: 503 });
    const property = await createParseRecord<Property>("Property", {
      business: pointer("Business", access.business.objectId),
      destination: pointer("Destination", destination.objectId),
      name, slug: `${slugify(name)}-${crypto.randomUUID().slice(0, 8)}`,
      type, description, address: typeof body?.address === "string" ? body.address.trim().slice(0, 300) : "",
      facilities: Array.isArray(body?.facilities) ? body.facilities.filter((item): item is string => typeof item === "string").slice(0, 20) : [],
      status: "draft",
    });
    return NextResponse.json({ property }, { status: 201, headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return NextResponse.json({ error: "Could not save the property draft. Please try again." }, { status: 503 });
  }
}

export async function PATCH(request: Request) {
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: "Request origin could not be verified." }, { status: 403 });
  try {
    const auth = await requireViewer();
    if ("response" in auth) return auth.response;
    const access = await requireApprovedPartner(auth.viewer.objectId);
    if ("response" in access) return access.response;
    const body = await request.json().catch(() => null) as Record<string, unknown> | null;
    const propertyId = typeof body?.propertyId === "string" ? body.propertyId.trim() : "";
    const property = await queryParse<Property>("Property", { objectId: propertyId, business: pointer("Business", access.business.objectId), status: "draft" }, 1).then((rows) => rows[0]);
    if (!property) return NextResponse.json({ error: "Draft property not found for your business." }, { status: 404 });
    await updateParseRecord("Property", property.objectId, { status: "submitted", submittedAt: { __type: "Date", iso: new Date().toISOString() } });
    return NextResponse.json({ ok: true, status: "submitted" }, { headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return NextResponse.json({ error: "Could not submit the listing for review." }, { status: 503 });
  }
}
