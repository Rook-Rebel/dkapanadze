import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { getNavigation, type Locale } from "@/i18n";
import { getPageText } from "@/i18n/content";
import { localizePath } from "@/i18n/paths";
import { kaFontVariables } from "@/lib/fonts-ka";

export const metadata: Metadata = {
  title: "გვერდი ვერ მოიძებნა · Page not found | დავით კაპანაძე",
  robots: { index: false, follow: true },
};

function NotFoundBlock({ locale }: { locale: Locale }) {
  const t = getPageText(locale).notFound;
  const sections = getNavigation(locale).filter((item) => item.path !== "/" && !item.path.includes("#"));
  const Heading = locale === "ka" ? "h1" : "h2";
  return (
    <section className="global-404-block" lang={locale} aria-labelledby={`not-found-${locale}`}>
      <Heading id={`not-found-${locale}`} className="page-title">
        {t.title}
      </Heading>
      <p className="lede">{t.text}</p>
      <ul className="not-found-links">
        {sections.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
      <Link className="button button-primary" href={localizePath("/", locale)}>
        {t.home}
      </Link>
    </section>
  );
}

/**
 * Served (with HTTP 404) for any URL that matches no route. It cannot know
 * which language the visitor expected, so it offers both.
 */
export default function GlobalNotFound() {
  return (
    <html lang="ka" suppressHydrationWarning className={kaFontVariables}>
      <body>
        <ThemeProvider>
          <main className="site-shell not-found global-404">
            <Link className="monogram" href="/" aria-label="დავით კაპანაძე — მთავარი გვერდი">
              <span aria-hidden="true">DK</span>
              <i aria-hidden="true">∂</i>
            </Link>
            <p className="not-found-code" aria-hidden="true">
              404
            </p>
            <NotFoundBlock locale="ka" />
            <NotFoundBlock locale="en" />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
