import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  keywords?: string[];
  image?: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
};

export function createMetadata({
  title,
  description,
  path,
  type = "website",
  keywords = [],
  image,
}: MetadataInput): Metadata {
  const url = new URL(path, siteConfig.domain).toString();
  const shareImage = image ?? {
    url: "/og.png",
    width: 1731,
    height: 909,
    alt: `${siteConfig.name.georgian} — აკადემიური პორტფოლიო`,
  };

  return {
    title,
    description,
    keywords: [...siteConfig.keywords, ...keywords],
    alternates: { canonical: url },
    openGraph: {
      type,
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name.georgian,
      title,
      description,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [shareImage.url],
    },
  };
}
