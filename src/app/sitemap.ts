import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getWilayas } from "@/lib/destinations-catalog";

const paths = [
  "",
  "/about",
  "/contact",
  "/destinations",
  "/explore",
  "/explore-360",
  "/experiences",
  "/guide",
  "/planner",
  "/stays",
  "/partner",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const wilayaPaths = getWilayas().flatMap((w) => [`/destinations/${w.slug}`, `/explore-360?destination=${w.slug}`]);
  return [...paths, ...wilayaPaths].flatMap((path) =>
    ["", "/en", "/fr", "/ar"].map((locale) => ({
      url: `${SITE_URL}${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
  );
}
