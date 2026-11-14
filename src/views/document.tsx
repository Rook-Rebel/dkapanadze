import type { ReactNode } from "react";
import "katex/dist/katex.min.css";
import "@/app/globals.css";
import { Footer } from "@/components/Footer";
import { MagicNavbar } from "@/components/MagicNavbar";
import { RevealObserver } from "@/components/RevealObserver";
import { StructuredData } from "@/components/StructuredData";
import { ThemeProvider } from "@/components/ThemeProvider";
import { getUi, type Locale } from "@/i18n";
import { personJsonLd, websiteJsonLd } from "@/lib/json-ld";

/**
 * The HTML document shared by both language roots: app/(ka)/layout.tsx
 * renders it with lang="ka", app/en/layout.tsx with lang="en".
 */
export function SiteDocument({
  locale,
  fontVariables,
  children,
}: {
  locale: Locale;
  fontVariables: string;
  children: ReactNode;
}) {
  const labels = getUi(locale);
  return (
    <html lang={locale} suppressHydrationWarning className={fontVariables}>
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
