import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n";
import { absoluteUrl, languageAlternates } from "@/i18n/paths";
import { getSiteText } from "@/i18n/site";

export const siteName = siteConfig.name.english;

export const defaultShareImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  type: "image/png",
};

const ogLocale = { ka: "ka_GE", en: "en_US" } as const;

function shareImageAlt(locale: Locale) {
  return locale === "en"
    ? "Davit Kapanadze — mathematics, research and education"
    : "დავით კაპანაძე — მათემატიკა, კვლევა და განათლება";
}

type MetadataInput = {
  title: string;
  /** Use the title as-is, without the "| Davit Kapanadze" suffix (home page). */
  absoluteTitle?: boolean;
  description: string;
  /** Unprefixed route, e.g. "/research". The locale prefix is added here. */
  path: string;
  locale: Locale;
  type?: "website" | "article" | "profile" | "book";
  keywords?: readonly string[];
  image?: { url: string; width: number; height: number; alt: string };
  /** Extra Open Graph fields for articles/books (only verified values). */
  article?: { authors?: string[]; tags?: string[] };
  book?: { authors?: string[]; isbn?: string; releaseDate?: string; tags?: string[] };
};

export function createMetadata({
  title,
  absoluteTitle = false,
  description,
  path,
  locale,
  type = "website",
  keywords = [],
  image,
  article,
  book,
}: MetadataInput): Metadata {
  const site = getSiteText(locale);
  const url = absoluteUrl(path, locale);
  const socialTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  const shareImage = image ?? { ...defaultShareImage, alt: shareImageAlt(locale) };

  const base = {
    url,
    siteName,
    locale: ogLocale[locale],
    alternateLocale: [ogLocale[locale === "en" ? "ka" : "en"]],
    title: socialTitle,
    description,
    images: [shareImage],
  };

  const openGraph: Metadata["openGraph"] =
    type === "article"
      ? { ...base, type: "article", authors: article?.authors, tags: article?.tags }
      : type === "book"
        ? {
            ...base,
            type: "book",
            authors: book?.authors,
            isbn: book?.isbn,
            releaseDate: book?.releaseDate,
            tags: book?.tags,
          }
        : type === "profile"
          ? { ...base, type: "profile", firstName: "Davit", lastName: "Kapanadze" }
          : { ...base, type: "website" };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: keywords.length ? [...keywords] : undefined,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    openGraph,
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [{ url: shareImage.url, alt: shareImage.alt }],
    },
  };
}

/** Root (layout-level) metadata for one language. Pages override title/description/canonical. */
export function rootMetadata(locale: Locale): Metadata {
  const site = getSiteText(locale);
  return {
    metadataBase: new URL(siteConfig.domain),
    title: {
      default: site.title,
      template: `%s | ${site.name}`,
    },
    description: site.description,
    applicationName: siteName,
    authors: [{ name: siteConfig.name.english, url: siteConfig.domain }],
    creator: siteConfig.name.english,
    publisher: siteConfig.name.english,
    referrer: "origin-when-cross-origin",
    formatDetection: { email: false, telephone: false, address: false },
    robots: { index: true, follow: true },
    icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
    manifest: "/manifest.webmanifest",
    category: "education",
    openGraph: {
      type: "website",
      siteName,
      locale: ogLocale[locale],
      title: site.title,
      description: site.description,
      images: [{ ...defaultShareImage, alt: shareImageAlt(locale) }],
    },
    twitter: {
      card: "summary_large_image",
      title: site.title,
      description: site.description,
      images: [{ url: defaultShareImage.url, alt: shareImageAlt(locale) }],
    },
  };
}

export const siteViewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1222" },
  ],
};
