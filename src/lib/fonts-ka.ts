import localFont from "next/font/local";

/* Fonts for Georgian pages: Georgian faces preloaded, STIX loaded on demand. */

/* Georgian display (headings): ArchyEDT Bold. */
export const archyBold = localFont({
  src: "../assets/fonts/archyedt/archyedt-bold.woff2",
  variable: "--font-archy-bold",
  weight: "700",
  style: "normal",
  display: "swap",
});

/* Georgian decorative: ArchyEDT Thin (large decorative numerals only). */
export const archyThin = localFont({
  src: "../assets/fonts/archyedt/archyedt-thin.woff2",
  variable: "--font-archy-thin",
  weight: "300",
  style: "normal",
  display: "swap",
  preload: false,
});

/* Georgian body and interface: BPG Banner Caps Alpha. */
export const bpgBannerCaps = localFont({
  src: "../assets/fonts/zarapxana/bpg-banner-caps-alpha.woff2",
  variable: "--font-bpg-banner",
  weight: "400",
  style: "normal",
  display: "swap",
});

/* English and publication titles: STIX Two Text. */
export const stixTwoText = localFont({
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
  preload: false,
});

export const kaFontVariables = [archyBold, archyThin, bpgBannerCaps, stixTwoText]
  .map((font) => font.variable)
  .join(" ");
