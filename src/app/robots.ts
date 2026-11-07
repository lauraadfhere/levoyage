import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots { return { rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/dashboard", "/profile", "/admin", "/partner/studio", "/partner/reservations"] }, sitemap: "https://piolian.com/sitemap.xml", host: "piolian.com" }; }
