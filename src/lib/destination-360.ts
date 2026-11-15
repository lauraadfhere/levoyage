import { slugify } from "@/lib/slug";
import { getDestinationBySlug, getWilayas } from "@/lib/destinations-catalog";
import { proceduralUrl, terrainForPlace, terrainForWilayaCode } from "@/lib/procedural-panorama";

export type PanoramaScene = {
  id: string;
  title: string;
  wilayaSlug: string;
  wilayaName: string;
  placeName?: string;
  description: string;
  imageUrl: string;
  kind: "destination" | "stay" | "experience";
  projection: "flat" | "equirect";
  /** Illustration rather than photographic capture. */
  illustrative: boolean;
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
    description: "Open desert rock formations and Saharan light â€” explore before you book a camp.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Tassili_n%27Ajjer_National_Park.jpg/1280px-Tassili_n%27Ajjer_National_Park.jpg",
    kind: "stay",
  },
  {
    match: /gharda|mzab|m'zab/i,
    title: "Mâ€™Zab valley ksour",
    description: "Adobe rooftops and oasis geometry around GhardaÃ¯a.",
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
    description: "Ruins meeting the sea â€” a classic coastal heritage stop.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Tipasa.jpg/1280px-Tipasa.jpg",
    kind: "experience",
  },
  {
    match: /bejaia|b[eÃ©]ja[iÃ¯]a|bougie/i,
    title: "BÃ©jaÃ¯a coastline",
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


function seedFor(name: string) {
  return SCENE_SEEDS.find((seed) => seed.match.test(name)) || null;
}

export function getScenesForDestination(wilayaSlug: string, placeName?: string): PanoramaScene[] {
  const destination = getDestinationBySlug(wilayaSlug);
  if (!destination) return [];

  const baseKind = terrainForWilayaCode(destination.code);
  const wilayaSeed = seedFor(destination.name);
  const scenes: PanoramaScene[] = [
    {
      id: `${destination.slug}-overview`,
      title: `${destination.name} — 360° overview`,
      wilayaSlug: destination.slug,
      wilayaName: destination.name,
      description: `Look all the way around ${destination.name}. Illustrated ${baseKind} preview until a verified photographic capture is published.`,
      imageUrl: proceduralUrl(baseKind, `${destination.code}-${destination.slug}`),
      kind: "destination",
      projection: "equirect",
      illustrative: true,
    },
  ];

  if (wilayaSeed) {
    scenes.push({
      id: `${destination.slug}-photo`,
      title: wilayaSeed.title,
      wilayaSlug: destination.slug,
      wilayaName: destination.name,
      description: `${wilayaSeed.description} (wide photo preview, not a full sphere).`,
      imageUrl: wilayaSeed.imageUrl,
      kind: wilayaSeed.kind,
      projection: "flat",
      illustrative: false,
    });
  }

  const placeFocus = placeName
    ? destination.places.find((place) => slugify(place.name) === slugify(placeName) || place.name.toLocaleLowerCase() === placeName.toLocaleLowerCase())
    : null;
  const placeCandidates = placeFocus ? [placeFocus, ...destination.places.filter((p) => p.name !== placeFocus.name)] : destination.places;

  for (const place of placeCandidates.slice(0, 6)) {
    const kind = terrainForPlace(place.name, baseKind);
    scenes.push({
      id: `${destination.slug}-${slugify(place.name)}`,
      title: place.name,
      wilayaSlug: destination.slug,
      wilayaName: destination.name,
      placeName: place.name,
      description: `Explore ${place.name} in ${destination.name} before adding it to your trip. Illustrated ${kind} preview.`,
      imageUrl: proceduralUrl(kind, `${destination.code}-${slugify(place.name)}`),
      kind: "experience",
      projection: "equirect",
      illustrative: true,
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
  for (const wilaya of getWilayas()) {
    if (scenes.length >= limit) break;
    if (scenes.some((scene) => scene.wilayaSlug === wilaya.slug)) continue;
    const overview = getScenesForDestination(wilaya.slug)[0];
    if (overview) scenes.push(overview);
  }
  return scenes.slice(0, limit);
}

/** One 360° overview per wilaya — guarantees national coverage. */
export function listAllOverviewScenes(): PanoramaScene[] {
  return getWilayas()
    .map((wilaya) => getScenesForDestination(wilaya.slug)[0])
    .filter((scene): scene is PanoramaScene => Boolean(scene));
}

export function findSceneById(id: string) {
  for (const wilaya of getWilayas()) {
    const scene = getScenesForDestination(wilaya.slug).find((item) => item.id === id);
    if (scene) return scene;
  }
  return null;
}
