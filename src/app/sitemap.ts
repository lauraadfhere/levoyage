import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

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
  return paths.flatMap((path) =>
    ["", "/en", "/fr", "/ar"].map((locale) => ({
      url: `${SITE_URL}${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
  );
}
