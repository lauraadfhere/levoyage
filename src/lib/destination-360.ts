import { slugify } from "@/lib/slug";
import { getDestinationBySlug, getWilayas } from "@/lib/destinations-catalog";

export type PanoramaScene = {
  id: string;
  title: string;
  wilayaSlug: string;
  wilayaName: string;
  placeName?: string;
  description: string;
  imageUrl: string;
  kind: "destination" | "stay" | "experience";
};

/** Curated equirectangular / wide scenic seeds for immersive previews. */
const SCENE_SEEDS: Array<{ match: RegExp; title: string; description: string; imageUrl: string; kind: PanoramaScene["kind"] }> = [
  {
    match: /algiers|alger|casbah/i,
    title: "Algiers bay & Casbah outlook",
    description: "Look across the white city toward the Mediterranean before you plan stays and walks.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Alger_vue_generale.jpg/1280px-Alger_vue_generale.jpg",
    kind: "destination",
  },
  {
    match: /oran|wahran/i,
    title: "Oran coastline",
    description: "Sweep along the western coast and Santa Cruz ridge in an immersive preview.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Oran_front_de_mer.jpg/1280px-Oran_front_de_mer.jpg",
    kind: "experience",
  },
  {
    match: /djanet|tassili/i,
    title: "Djanet & Tassili horizon",
    description: "Open desert rock formations and Saharan light — explore before you book a camp.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Tassili_n%27Ajjer_National_Park.jpg/1280px-Tassili_n%27Ajjer_National_Park.jpg",
    kind: "stay",
  },
  {
    match: /gharda|mzab|m'zab/i,
    title: "M’Zab valley ksour",
    description: "Adobe rooftops and oasis geometry around Ghardaïa.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Ghardaia.jpg/1280px-Ghardaia.jpg",
    kind: "destination",
  },
  {
    match: /constantine|qacentina/i,
    title: "Constantine bridges",
    description: "Clifftop city views and dramatic spans over the Rhumel.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Constantine_Algeria.jpg/1280px-Constantine_Algeria.jpg",
    kind: "destination",
  },
  {
    match: /tipaza|tipasa/i,
    title: "Tipaza Roman coast",
    description: "Ruins meeting the sea — a classic coastal heritage stop.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Tipasa.jpg/1280px-Tipasa.jpg",
    kind: "experience",
  },
  {
    match: /bejaia|b[eé]ja[iï]a|bougie/i,
    title: "Béjaïa coastline",
    description: "Cape and bay scenery on the Kabyle Mediterranean.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/B%C3%A9jaia_%D8%A8%D8%AC%D8%A7%D9%8A%D8%A9_09.jpg/1280px-B%C3%A9jaia_%D8%A8%D8%AC%D8%A7%D9%8A%D8%A9_09.jpg",
    kind: "destination",
  },
  {
    match: /tamanrasset|hoggar|assekrem/i,
    title: "Hoggar highlands",
    description: "Mountain desert light around Tamanrasset and Assekrem.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Assekrem.jpg/1280px-Assekrem.jpg",
    kind: "experience",
  },
  {
    match: /annaba|hippo/i,
    title: "Annaba corniche",
    description: "Eastern coast energy with beach and city edges.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Annaba.jpg/1280px-Annaba.jpg",
    kind: "destination",
  },
];

const FALLBACK_IMAGE =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/B%C3%A9jaia_%D8%A8%D8%AC%D8%A7%D9%8A%D8%A9_09.jpg/1280px-B%C3%A9jaia_%D8%A8%D8%AC%D8%A7%D9%8A%D8%A9_09.jpg";

function seedFor(name: string) {
  return SCENE_SEEDS.find((seed) => seed.match.test(name)) || null;
}

export function getScenesForDestination(wilayaSlug: string, placeName?: string): PanoramaScene[] {
  const destination = getDestinationBySlug(wilayaSlug);
  if (!destination) return [];

  const scenes: PanoramaScene[] = [];
  const wilayaSeed = seedFor(destination.name);
  scenes.push({
    id: `${destination.slug}-overview`,
    title: wilayaSeed?.title || `${destination.name} overview`,
    wilayaSlug: destination.slug,
    wilayaName: destination.name,
    description: wilayaSeed?.description || `Immersive preview of ${destination.name}. Drag to look around, then open VR on supported devices.`,
    imageUrl: wilayaSeed?.imageUrl || FALLBACK_IMAGE,
    kind: wilayaSeed?.kind || "destination",
  });

  const placeFocus = placeName
    ? destination.places.find((place) => slugify(place.name) === slugify(placeName) || place.name.toLocaleLowerCase() === placeName.toLocaleLowerCase())
    : null;

  const placeCandidates = placeFocus ? [placeFocus, ...destination.places.filter((p) => p.name !== placeFocus.name)] : destination.places;

  for (const place of placeCandidates.slice(0, 5)) {
    const placeSeed = seedFor(place.name) || wilayaSeed;
    scenes.push({
      id: `${destination.slug}-${slugify(place.name)}`,
      title: place.name,
      wilayaSlug: destination.slug,
      wilayaName: destination.name,
      placeName: place.name,
      description: `Explore ${place.name} in ${destination.name} before adding it to your trip.`,
      imageUrl: placeSeed?.imageUrl || FALLBACK_IMAGE,
      kind: "experience",
    });
  }

  return scenes;
}

export function listFeatured360Scenes(limit = 12): PanoramaScene[] {
  const featured = ["algiers", "oran", "djanet", "ghardaia", "constantine", "tipaza", "bejaia", "tamanrasset", "annaba"];
  const scenes: PanoramaScene[] = [];
  for (const slug of featured) {
    const found = getScenesForDestination(slug)[0];
    if (found) scenes.push(found);
  }
  if (scenes.length < limit) {
    for (const wilaya of getWilayas()) {
      if (scenes.some((scene) => scene.wilayaSlug === wilaya.slug)) continue;
      const overview = getScenesForDestination(wilaya.slug)[0];
      if (overview) scenes.push(overview);
      if (scenes.length >= limit) break;
    }
  }
  return scenes.slice(0, limit);
}

export function findSceneById(id: string) {
  for (const wilaya of getWilayas()) {
    const scene = getScenesForDestination(wilaya.slug).find((item) => item.id === id);
    if (scene) return scene;
  }
  return null;
}
