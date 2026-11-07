import { NextResponse } from "next/server";
import { currentUser, type ParseUser } from "@/lib/parse-auth";
import { queryParse, type ParseRecord } from "@/lib/parse-tourism";
import { sessionToken } from "@/lib/session";

export type Viewer = ParseUser & { platformRole?: string };
export type BusinessRecord = ParseRecord & { owner?: { objectId?: string }; verificationStatus?: string; name?: string };

export function isSameOriginRequest(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

export async function getViewer() {
  const token = await sessionToken();
  if (!token) return null;
  return await currentUser(token) as Viewer;
}

export async function requireViewer() {
  const viewer = await getViewer();
  if (!viewer) return { response: NextResponse.json({ error: "Sign in to continue." }, { status: 401 }) };
  return { viewer };
}

export async function requireAdmin() {
  const result = await requireViewer();
  if ("response" in result) return result;
  if (result.viewer.platformRole !== "admin") {
    return { response: NextResponse.json({ error: "Administrator access is required." }, { status: 403 }) };
  }
  return result;
}

export async function getBusinessesForOwner(userId: string) {
  return queryParse<BusinessRecord>("Business", {
    owner: { __type: "Pointer", className: "_User", objectId: userId },
  });
}

export async function requireApprovedPartner(userId: string) {
  const businesses = await getBusinessesForOwner(userId);
  const business = businesses.find((item) => item.verificationStatus === "verified");
  if (!business) {
    return { response: NextResponse.json({ error: "An approved partner business is required before managing listings." }, { status: 403 }) };
  }
  return { business };
}
