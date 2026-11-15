import { NextResponse } from "next/server";
import { getWilayas } from "@/lib/destinations-catalog";
import { listAllOverviewScenes } from "@/lib/destination-360";

export const dynamic = "force-dynamic";

export function GET() {
  const wilayas = getWilayas().length;
  const scenes360 = listAllOverviewScenes().length;
  const ok = wilayas === 69 && scenes360 === wilayas;
  return NextResponse.json(
    { ok, wilayas, wilayas360: scenes360, time: new Date().toISOString() },
    { status: ok ? 200 : 503, headers: { "cache-control": "no-store" } },
  );
}
