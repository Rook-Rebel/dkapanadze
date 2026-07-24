import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import localFont from "next/font/local";
import "katex/dist/katex.min.css";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Footer } from "@/components/Footer";
import { MagicNavbar } from "@/components/MagicNavbar";
import { ScrollProgress } from "@/components/ScrollProgress";
import { StructuredData } from "@/components/StructuredData";
import { ThemeProvider } from "@/components/ThemeProvider";
import { personJsonLd, websiteJsonLd } from "@/lib/json-ld";

const notoSerifGeorgian = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource-variable/noto-serif-georgian/files/noto-serif-georgian-georgian-wght-normal.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource-variable/noto-serif-georgian/files/noto-serif-georgian-latin-wght-normal.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  variable: "--font-georgian-serif",
  display: "swap",
});

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
});

const archyBold = localFont({
  src: "../assets/fonts/archyedt/archyedt-bold-60540591796.otf",
  variable: "--font-archy-bold",
  weight: "700",
  style: "normal",
  display: "swap",
});

const archyThin = localFont({
  src: "../assets/fonts/archyedt/ar-archy-thin-60540591796.ttf",
  variable: "--font-archy-thin",
  weight: "300",
  style: "normal",
  display: "swap",
});

const bpgBannerCaps = localFont({
  src: "../assets/fonts/zarapxana/bpg_banner_caps_alpha-48070231387.ttf",
  variable: "--font-bpg-banner",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: siteConfig.title,
    template: `%s — ${siteConfig.name.georgian}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name.georgian,
  authors: [{ name: siteConfig.name.english, url: siteConfig.domain }],
  creator: siteConfig.name.english,
  publisher: siteConfig.name.english,
  keywords: [...siteConfig.keywords],
  referrer: "origin-when-cross-origin",
  alternates: { canonical: siteConfig.domain },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.domain,
    siteName: siteConfig.name.georgian,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: "/og.png",
        width: 1731,
        height: 909,
        alt: `${siteConfig.name.georgian} — აკადემიური პორტფოლიო`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/og.png"],
  },
  category: "education",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF6" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1020" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ka" suppressHydrationWarning>
      <body
        className={`${notoSerifGeorgian.variable} ${stixTwoText.variable} ${archyBold.variable} ${archyThin.variable} ${bpgBannerCaps.variable}`}
      >
        <ThemeProvider>
          <a className="skip-link" href="#main-content">
            მთავარ შინაარსზე გადასვლა
          </a>
          <ScrollProgress />
          <MagicNavbar />
          <StructuredData data={[websiteJsonLd, personJsonLd]} />
          <main id="main-content">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
