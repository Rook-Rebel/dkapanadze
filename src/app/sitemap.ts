import type { MetadataRoute } from "next";
import { publications } from "@/data/publications";
import { locales } from "@/i18n";
import { absoluteUrl, languageAlternates } from "@/i18n/paths";

/** Public, indexable routes (unprefixed form). English equivalents live under /en. */
const pages = [
  "/",
  "/davit-kapanadze",
  "/research",
  "/research/derivative-without-limits",
  "/research/half-derivative",
  "/publications",
  ...publications.map((publication) => `/publications/${publication.slug}`),
  "/teaching",
  "/interactive",
  "/contact",
];

/**
 * Every page is listed in both languages with reciprocal hreflang alternates.
 * No lastModified is emitted: there is no reliable per-page modification date,
 * and fabricated dates would mislead crawlers.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap((path) =>
    locales.map((locale) => ({
      url: absoluteUrl(path, locale),
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
