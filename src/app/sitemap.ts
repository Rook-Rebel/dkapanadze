import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { publications } from "@/data/publications";

const staticRoutes = [
  "",
  "/davit-kapanadze",
  "/research",
  "/research/derivative-without-limits",
  "/research/half-derivative",
  "/publications",
  "/teaching",
  "/interactive",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-11-13T00:00:00.000Z");
  const staticEntries = staticRoutes.map((path) => ({
    url: `${siteConfig.domain}${path}`,
    lastModified,
    changeFrequency: path === "" ? ("monthly" as const) : ("yearly" as const),
    priority: path === "" ? 1 : path === "/publications" ? 0.9 : 0.8,
  }));
  const publicationEntries = publications.map((publication) => ({
    url: `${siteConfig.domain}/publications/${publication.slug}`,
    lastModified,
    changeFrequency: "yearly" as const,
    priority: 0.72,
  }));

  return [...staticEntries, ...publicationEntries];
}

