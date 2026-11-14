import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import "katex/dist/katex.min.css";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Footer } from "@/components/Footer";
import { MagicNavbar } from "@/components/MagicNavbar";
import { RevealObserver } from "@/components/RevealObserver";
import { StructuredData } from "@/components/StructuredData";
import { ThemeProvider } from "@/components/ThemeProvider";
import { personJsonLd, websiteJsonLd } from "@/lib/json-ld";
import { defaultShareImage } from "@/lib/metadata";
import { getUi } from "@/i18n";
import { getLocale } from "@/i18n/server";
import { getSiteText } from "@/i18n/site";

/* Georgian display (headings): ArchyEDT Bold. */
const archyBold = localFont({
  src: "../assets/fonts/archyedt/archyedt-bold.woff2",
  variable: "--font-archy-bold",
  weight: "700",
  style: "normal",
  display: "swap",
});

/* Georgian decorative: ArchyEDT Thin (large decorative numerals only). */
const archyThin = localFont({
  src: "../assets/fonts/archyedt/archyedt-thin.woff2",
  variable: "--font-archy-thin",
  weight: "300",
  style: "normal",
  display: "swap",
  preload: false,
});

/* Georgian body and interface: BPG Banner Caps Alpha. */
const bpgBannerCaps = localFont({
  src: "../assets/fonts/zarapxana/bpg-banner-caps-alpha.woff2",
  variable: "--font-bpg-banner",
  weight: "400",
  style: "normal",
  display: "swap",
});

/* English and publication titles: STIX Two Text. */
const stixTwoText = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource-variable/stix-two-text/files/stix-two-text-latin-wght-normal.woff2",
      weight: "400 700",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource-variable/stix-two-text/files/stix-two-text-latin-wght-italic.woff2",
      weight: "400 700",
      style: "italic",
    },
  ],
  variable: "--font-academic-latin",
  display: "swap",
  // Georgian is the default language; English text is mostly below the fold.
  preload: false,
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const text = getSiteText(locale);
  return {
    metadataBase: new URL(siteConfig.domain),
    title: {
      default: text.title,
      template: `%s — ${text.name}`,
    },
    description: text.description,
    applicationName: text.name,
    authors: [{ name: siteConfig.name.english, url: siteConfig.domain }],
    creator: siteConfig.name.english,
    publisher: siteConfig.name.english,
    keywords: [...siteConfig.keywords],
    referrer: "origin-when-cross-origin",
    formatDetection: { email: false, telephone: false, address: false },
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    manifest: "/manifest.webmanifest",
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : siteConfig.locale,
      url: siteConfig.domain,
      siteName: text.name,
      title: text.title,
      description: text.description,
      images: [
        {
          ...defaultShareImage,
          alt: locale === "en" ? `${siteConfig.name.english} — academic website` : `${siteConfig.name.georgian} — აკადემიური ვებსაიტი`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: text.title,
      description: text.description,
      images: [defaultShareImage.url],
    },
    category: "education",
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1222" },
  ],
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const locale = await getLocale();
  const labels = getUi(locale);
  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${archyBold.variable} ${archyThin.variable} ${bpgBannerCaps.variable} ${stixTwoText.variable}`}
    >
      <body>
        <ThemeProvider>
          <a className="skip-link" href="#main-content">
            {labels.skip}
          </a>
          <div className="scroll-progress" aria-hidden="true" />
          <MagicNavbar locale={locale} />
          <StructuredData data={[websiteJsonLd(locale), personJsonLd]} />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer locale={locale} />
          <RevealObserver locale={locale} />
        </ThemeProvider>
      </body>
    </html>
  );
}
