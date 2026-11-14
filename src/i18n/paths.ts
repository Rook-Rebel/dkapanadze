import { siteConfig } from "@/config/site";
import type { Locale } from ".";

/**
 * URL scheme: Georgian (default) is unprefixed, English lives under /en.
 *   /research        ↔  /en/research
 *   /                ↔  /en
 * `path` arguments are always the unprefixed (Georgian) form, e.g. "/research".
 */

export const englishPrefix = "/en";

/** Adds the locale prefix to an internal path. Hash-only and external links pass through. */
export function localizePath(path: string, locale: Locale) {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  if (locale === "ka") return path;
  if (path === "/") return englishPrefix;
  if (path.startsWith("/#")) return `${englishPrefix}${path.slice(1)}`;
  return `${englishPrefix}${path}`;
}

/** Splits a browser pathname into its locale and the unprefixed path. */
export function splitLocalePath(pathname: string): { locale: Locale; path: string } {
  if (pathname === englishPrefix || pathname.startsWith(`${englishPrefix}/`)) {
    return { locale: "en", path: pathname.slice(englishPrefix.length) || "/" };
  }
  return { locale: "ka", path: pathname || "/" };
}

/** Absolute production URL for a path in a given locale. */
export function absoluteUrl(path: string, locale: Locale) {
  return new URL(localizePath(path, locale), siteConfig.domain).toString();
}

/** hreflang map for a page that exists in both languages (x-default → Georgian). */
export function languageAlternates(path: string) {
  return {
    ka: absoluteUrl(path, "ka"),
    en: absoluteUrl(path, "en"),
    "x-default": absoluteUrl(path, "ka"),
  };
}
