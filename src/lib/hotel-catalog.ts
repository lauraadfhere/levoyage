import "server-only";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export type HotelCatalogItem = {
  city: string;
  name: string;
  propertyType: string;
  nearby: string;
  rooms: string[];
};

const nearbyByCity: Record<string, string> = {
  Algiers: "Casbah, Jardin d'Essai & seafront",
  Oran: "Santa Cruz, waterfront & city centre",
  Constantine: "Sidi M'Cid bridge & old city",
  Annaba: "Basilica, Corniche & beaches",
  "Béjaïa": "Cap Carbon, Gouraya & coastline",
  Biskra: "Zibans oasis & desert gateway",
  Tipaza: "Roman ruins & Mediterranean coast",
  "Aïn Témouchent": "Beaches & coastal villages",
  Ghardaïa: "M'Zab Valley & ksour",
  Djanet: "Tassili n'Ajjer & desert routes",
  Béchar: "Taghit oasis & Grand Erg Occidental",
  Chlef: "Ténès coast & Cap Ténès",
  Skikda: "Rusica coast & beaches",
  "Tizi Ouzou": "Kabylie villages & Djurdjura",
  "El Oued": "Souf dunes & palm groves",
  Blida: "Chréa National Park & Mitidja",
};

function roomSetup(propertyType: string) {
  if (/resort|beach/i.test(propertyType)) return ["Garden / sea-view double", "Family suite", "Accessible double"];
  if (/suite/i.test(propertyType)) return ["Studio suite", "One-bedroom suite", "Family suite"];
  return ["Standard double or twin", "Deluxe double", "Family room"];
}

let cachedHotels: HotelCatalogItem[] | null = null;

export function getHotelCatalog(): HotelCatalogItem[] {
  if (cachedHotels) return cachedHotels;
  const source = readFileSync(join(process.cwd(), "public", "algeria_tourism_hotels_near_attractions_master_catalog.md"), "utf8");
  const inventory = source.split("## 4. Seed hotel inventory")[1]?.split("## 5.")[0] ?? "";
  cachedHotels = inventory.split("\n").flatMap((line) => {
    const cells = line.split("|").map((cell) => cell.trim());
    if (cells.length !== 7 || !cells[1] || cells[1] === "Wilaya / City" || /^-+$/.test(cells[1])) return [];
    const [city, name, propertyType] = cells.slice(1, 4);
    return [{ city, name, propertyType, nearby: nearbyByCity[city] ?? "Nearby attractions matched after geocoding", rooms: roomSetup(propertyType) }];
  });
  return cachedHotels;
}
