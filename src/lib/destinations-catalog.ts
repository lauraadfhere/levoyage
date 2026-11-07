import { getHotelCatalog, type HotelCatalogItem } from "@/lib/hotel-catalog";
import { slugify } from "@/lib/slug";
import { getTourismDirectory, type TourismDirectoryItem } from "@/lib/tourism-directory";

export type WilayaSummary = {
  code: string;
  name: string;
  slug: string;
  placeCount: number;
};

export type DestinationRecord = {
  slug: string;
  code: string;
  name: string;
  places: TourismDirectoryItem[];
  hotels: HotelCatalogItem[];
};

function matchesCity(wilaya: string, city: string) {
  const a = slugify(wilaya);
  const b = slugify(city);
  return a === b || a.includes(b) || b.includes(a);
}

export function getWilayas(): WilayaSummary[] {
  const directory = getTourismDirectory();
  return directory
    .filter((item) => item.type === "Wilaya")
    .map((item) => ({
      code: item.code,
      name: item.name,
      slug: slugify(item.name),
      placeCount: directory.filter((place) => place.type === "Place" && place.wilaya === item.name).length,
    }));
}

export function findWilayaBySlug(slug: string) {
  const normalized = slugify(slug);
  return getWilayas().find((item) => item.slug === normalized) || null;
}

export function findWilayaByName(name: string) {
  const normalized = slugify(name);
  const all = getWilayas();
  return (
    all.find((item) => item.slug === normalized || slugify(item.name) === normalized)
    || all.find((item) => item.slug.startsWith(normalized) || normalized.startsWith(item.slug))
    || all.find((item) => item.slug.includes(normalized) || normalized.includes(item.slug))
    || null
  );
}

export function getPlacesForWilaya(wilayaName: string) {
  return getTourismDirectory().filter((item) => item.type === "Place" && item.wilaya === wilayaName);
}

export function getHotelsForWilaya(wilayaName: string) {
  return getHotelCatalog().filter((hotel) => matchesCity(wilayaName, hotel.city));
}

export function getDestinationBySlug(slug: string): DestinationRecord | null {
  const wilaya = findWilayaBySlug(slug);
  if (!wilaya) return null;
  return {
    slug: wilaya.slug,
    code: wilaya.code,
    name: wilaya.name,
    places: getPlacesForWilaya(wilaya.name),
    hotels: getHotelsForWilaya(wilaya.name),
  };
}

export function searchDestinations(query: string) {
  const term = query.trim().toLocaleLowerCase();
  if (!term) return getWilayas();
  const directory = getTourismDirectory();
  const matchedNames = new Set<string>();
  for (const item of directory) {
    if (`${item.name} ${item.wilaya}`.toLocaleLowerCase().includes(term)) matchedNames.add(item.wilaya);
  }
  return getWilayas().filter((wilaya) => matchedNames.has(wilaya.name) || wilaya.name.toLocaleLowerCase().includes(term));
}

export function findPlaceInWilaya(wilayaName: string, placeName: string) {
  const placeSlug = slugify(placeName);
  return getPlacesForWilaya(wilayaName).find((place) => slugify(place.name) === placeSlug || place.name.toLocaleLowerCase() === placeName.toLocaleLowerCase()) || null;
}
