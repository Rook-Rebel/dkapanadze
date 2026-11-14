import type { ReactNode } from "react";
import { enFontVariables } from "@/lib/fonts-en";
import { rootMetadata, siteViewport } from "@/lib/metadata";
import { SiteDocument } from "@/views/document";

export const metadata = rootMetadata("en");
export const viewport = siteViewport;

/** Root layout for English pages (<html lang="en">). */
export default function EnglishLayout({ children }: { children: ReactNode }) {
  return (
    <SiteDocument locale="en" fontVariables={enFontVariables}>
      {children}
    </SiteDocument>
  );
}
