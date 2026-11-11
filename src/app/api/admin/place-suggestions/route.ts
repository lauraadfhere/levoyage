import { NextResponse } from "next/server";
import { isSameOriginRequest, requireAdmin } from "@/lib/api-access";
import { decideSuggestion, listPendingSuggestions } from "@/lib/place-suggestions";

export const runtime = "nodejs";

export async function GET() {
  try {
    const auth = await requireAdmin();
    if ("response" in auth) return auth.response;
    const suggestions = await listPendingSuggestions();
    return NextResponse.json({ suggestions }, { headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return NextResponse.json({ error: "Could not load the place suggestion queue." }, { status: 503 });
  }
}

export async function PATCH(request: Request) {
  if (!isSameOriginRequest(request)) {
    return NextResponse.json({ error: "Request origin could not be verified." }, { status: 403 });
  }
  try {
    const auth = await requireAdmin();
    if ("response" in auth) return auth.response;
    const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
    const suggestionId = typeof body?.suggestionId === "string" ? body.suggestionId.trim() : "";
    const decision = body?.decision;
    const reason = typeof body?.reason === "string" ? body.reason.trim().slice(0, 500) : "";
    if (!suggestionId || !["approve", "reject"].includes(String(decision))) {
      return NextResponse.json({ error: "Choose a suggestion and a valid decision." }, { status: 400 });
    }
    if (decision === "reject" && !reason) {
      return NextResponse.json({ error: "Add a reason for rejecting this suggestion." }, { status: 400 });
    }
    await decideSuggestion(suggestionId, decision === "approve" ? "published" : "rejected", reason);
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return NextResponse.json({ error: "Could not record the decision." }, { status: 503 });
  }
}
