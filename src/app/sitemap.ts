import type { MetadataRoute } from "next";
const paths = ["", "/about", "/contact", "/destinations", "/explore", "/explore-360", "/experiences", "/guide", "/planner", "/stays", "/partner", "/privacy", "/terms"];
export default function sitemap(): MetadataRoute.Sitemap { return paths.flatMap(path => ["", "/en", "/fr", "/ar"].map(locale => ({ url: `https://piolian.com${locale}${path}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: path === "" ? 1 : .7 }))); }
