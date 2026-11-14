import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Only the server-side contact endpoint is non-public.
      disallow: ["/api/"],
    },
    sitemap: `${siteConfig.domain}/sitemap.xml`,
  };
}
