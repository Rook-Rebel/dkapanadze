import type { ReactNode } from "react";
import { kaFontVariables } from "@/lib/fonts-ka";
import { rootMetadata, siteViewport } from "@/lib/metadata";
import { SiteDocument } from "@/views/document";

export const metadata = rootMetadata("ka");
export const viewport = siteViewport;

/** Root layout for Georgian pages (<html lang="ka">). */
export default function GeorgianLayout({ children }: { children: ReactNode }) {
  return (
    <SiteDocument locale="ka" fontVariables={kaFontVariables}>
      {children}
    </SiteDocument>
  );
}
