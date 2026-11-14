import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n";
import { getSiteText } from "@/i18n/site";

type MetadataInput = {
  title: string;
  /** Use the title as-is, without the "— Davit Kapanadze" suffix (home page). */
  absoluteTitle?: boolean;
  description: string;
  path: string;
  type?: "website" | "article" | "profile" | "book";
  keywords?: readonly string[];
  image?: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
  locale?: Locale;
};

export const defaultShareImage = {
  url: "/og.png",
  width: 1731,
  height: 909,
};

export function canonicalUrl(path: string) {
  return new URL(path, siteConfig.domain).toString();
}

export function createMetadata({
  title,
  absoluteTitle = false,
  description,
  path,
  type = "website",
  keywords = [],
  image,
  locale = "ka",
}: MetadataInput): Metadata {
  const site = getSiteText(locale);
  const url = canonicalUrl(path);
  const shareImage = image ?? {
    ...defaultShareImage,
    alt:
      locale === "en"
        ? `${siteConfig.name.english} — academic website`
        : `${siteConfig.name.georgian} — აკადემიური ვებსაიტი`,
  };
  const socialTitle = absoluteTitle ? title : `${title} — ${site.name}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: { canonical: url },
    openGraph: {
      type: type === "book" ? "book" : type === "profile" ? "profile" : type,
      locale: locale === "en" ? "en_US" : siteConfig.locale,
      alternateLocale: locale === "en" ? [siteConfig.locale] : ["en_US"],
      url,
      siteName: site.name,
      title: socialTitle,
      description,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [shareImage.url],
    },
  };
}
