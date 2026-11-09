import { NextResponse } from "next/server";
import { isSameOriginRequest, requireViewer } from "@/lib/api-access";
import { suggestReservations } from "@/lib/trip-intelligence";

export const runtime = "nodejs";

const validDate = (value: unknown): value is string => {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === value;
};

export async function POST(request: Request) {
  if (!isSameOriginRequest(request)) return NextResponse.json({ error: "Request origin could not be verified." }, { status: 403 });
  try {
    const auth = await requireViewer();
    if ("response" in auth) return auth.response;
    const body = await request.json().catch(() => null) as Record<string, unknown> | null;
    const destination = typeof body?.destination === "string" ? body.destination.trim().slice(0, 120) : "";
    const interests = typeof body?.interests === "string" ? body.interests.trim().slice(0, 300) : "";
    const guests = Number(body?.guests);
    const checkIn = body?.checkIn;
    const checkOut = body?.checkOut;
    if (!destination || !Number.isInteger(guests) || guests < 1 || guests > 20 || !validDate(checkIn) || !validDate(checkOut) || checkOut <= checkIn) {
      return NextResponse.json({ error: "Enter a destination, guest count and stay dates." }, { status: 400 });
    }
    const result = await suggestReservations({ destination, guests, checkIn, checkOut, interests });
    return NextResponse.json(result, { headers: { "Cache-Control": "private, no-store" } });
  } catch {
    return NextResponse.json({ error: "Could not load suggestions. Please try again." }, { status: 503 });
  }
}
