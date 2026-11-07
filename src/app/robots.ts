import type { MetadataRoute } from "next";
import { SITE_DOMAIN, SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/dashboard", "/profile", "/admin", "/partner/studio", "/partner/reservations"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_DOMAIN,
  };
}
