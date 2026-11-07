import { tourismDirectoryMarkdown } from "@/lib/catalog-content.generated";

export type TourismDirectoryItem = { type: "Wilaya" | "Place"; wilaya: string; name: string; code: string };

let cachedDirectory: TourismDirectoryItem[] | null = null;

export function getTourismDirectory(): TourismDirectoryItem[] {
  if (cachedDirectory) return cachedDirectory;
  const source = tourismDirectoryMarkdown;
  const sections = [...source.matchAll(/^## (\d{2}) — ([^(\n]+?)(?: \(|$)/gm)];
  const directory: TourismDirectoryItem[] = [];
  sections.forEach((section, index) => {
    const code = section[1];
    const wilaya = section[2].trim();
    const start = (section.index ?? 0) + section[0].length;
    const end = sections[index + 1]?.index ?? source.length;
    directory.push({ type: "Wilaya", wilaya, name: wilaya, code });
    for (const place of source.slice(start, end).matchAll(/^- \*\*(.+?)\*\*/gm)) {
      directory.push({ type: "Place", wilaya, name: place[1].trim(), code });
    }
  });
  cachedDirectory = directory;
  return directory;
}
