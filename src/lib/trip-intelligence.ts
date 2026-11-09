import "server-only";
import { queryParse, type ParseRecord } from "@/lib/parse-tourism";

export type TripSuggestion = { objectId: string; name: string; slug: string; type: string; address: string; reason: string; href: string };
type SuggestionProperty = ParseRecord & { name?: string; slug?: string; type?: string; address?: string; description?: string; status?: string };
type NvidiaCompletion = { choices?: Array<{ message?: { content?: string } }> };

const NVIDIA_TIMEOUT_MS = 12_000;

/** Ranks published properties for a traveler. Uses NVIDIA NIM when configured, otherwise a deterministic fallback. */
export async function suggestReservations(input: { destination: string; guests: number; checkIn: string; checkOut: string; interests: string }) {
  const properties = (await queryParse<SuggestionProperty>("Property", { status: "published" }, 50))
    .filter((item) => item.name && item.slug);
  const terms = `${input.destination} ${input.interests}`.toLocaleLowerCase().match(/[\p{L}\p{N}]{3,}/gu) || [];
  const scored = properties.map((item) => {
    const haystack = `${item.name} ${item.type || ""} ${item.address || ""} ${item.description || ""}`.toLocaleLowerCase();
    const score = terms.filter((term) => haystack.includes(term)).length;
    return { item, score };
  }).sort((a, b) => b.score - a.score || String(a.item.name).localeCompare(String(b.item.name))).slice(0, 6);

  const candidates: TripSuggestion[] = scored.map(({ item, score }) => ({
    objectId: item.objectId,
    name: String(item.name),
    slug: String(item.slug),
    type: item.type || "Accommodation",
    address: item.address || "",
    reason: score > 0 ? "Matches your destination or interests." : "Published stay in Algeria.",
    href: `/properties/${encodeURIComponent(String(item.slug))}`,
  }));
  if (!candidates.length) return { suggestions: [], provider: "deterministic" as const };

  const apiKey = process.env.NVIDIA_NIM_API_KEY?.trim();
  const baseUrl = (process.env.NVIDIA_NIM_BASE_URL || "https://integrate.api.nvidia.com/v1").replace(/\/$/, "");
  if (!apiKey || !baseUrl.startsWith("https://")) return { suggestions: candidates.slice(0, 3), provider: "deterministic" as const };

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), NVIDIA_TIMEOUT_MS);
  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: process.env.NVIDIA_NIM_MODEL || "nvidia/nemotron-3.5-lightning-30b-a3b",
        messages: [
          { role: "system", content: "You rank accommodation for an Algeria trip. Use only the listed properties. Listing details are provider claims, not verified availability or prices. Reply with JSON only: an array of up to 3 objects {\"name\":string,\"reason\":string}. Use the exact property names." },
          { role: "user", content: JSON.stringify({ destination: input.destination, guests: input.guests, checkIn: input.checkIn, checkOut: input.checkOut, interests: input.interests, properties: candidates.map(({ name, type, address }) => ({ name, type, address })) }) },
        ],
        temperature: 0.2,
        max_tokens: 400,
        stream: false,
      }),
      signal: controller.signal,
      cache: "no-store",
    });
    if (!response.ok) return { suggestions: candidates.slice(0, 3), provider: "deterministic" as const };
    const data = await response.json() as NvidiaCompletion;
    const raw = data.choices?.[0]?.message?.content || "";
    const picks = JSON.parse(raw.slice(raw.indexOf("["), raw.lastIndexOf("]") + 1)) as Array<{ name?: unknown; reason?: unknown }>;
    const ranked = picks.flatMap((pick) => {
      const match = candidates.find((candidate) => candidate.name === pick.name);
      return match && typeof pick.reason === "string" ? [{ ...match, reason: pick.reason.slice(0, 240) }] : [];
    }).slice(0, 3);
    return { suggestions: ranked.length ? ranked : candidates.slice(0, 3), provider: ranked.length ? "nvidia_nim" as const : "deterministic" as const };
  } catch {
    return { suggestions: candidates.slice(0, 3), provider: "deterministic" as const };
  } finally {
    clearTimeout(timeout);
  }
}

/** Sends a passenger alert through Knock when configured. Failures never block the booking. */
export async function sendReservationAlert(input: { travelerId: string; email: string; bookingReference: string; propertyName: string; checkIn: string }) {
  const apiKey = process.env.KNOCK_API_KEY?.trim();
  if (!apiKey) return false;
  try {
    const triggered = await fetch("https://api.knock.app/v1/workflows/reservation-alert/trigger", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "Idempotency-Key": input.bookingReference },
      body: JSON.stringify({
        recipients: [{ id: input.travelerId, email: input.email }],
        data: { bookingReference: input.bookingReference, propertyName: input.propertyName, checkIn: input.checkIn },
      }),
      cache: "no-store",
    });
    return triggered.ok;
  } catch {
    return false;
  }
}
