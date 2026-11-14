import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getNavigation, type Locale } from "@/i18n";
import { getPageText } from "@/i18n/content";
import { localizePath } from "@/i18n/paths";

export function notFoundMetadata(locale: Locale): Metadata {
  return {
    title: getPageText(locale).notFound.title,
    robots: { index: false, follow: true },
  };
}

export function NotFoundView({ locale }: { locale: Locale }) {
  const t = getPageText(locale).notFound;
  const sections = getNavigation(locale).filter((item) => item.path !== "/" && !item.path.includes("#"));

  return (
    <div className="site-shell not-found">
      <p className="not-found-code" aria-hidden="true">
        404
      </p>
      <h1 className="page-title">{t.title}</h1>
      <p className="lede">{t.text}</p>
      <ul className="not-found-links">
        {sections.map((item) => (
          <li key={item.href}>
            <Link href={item.href}>{item.label}</Link>
          </li>
        ))}
      </ul>
      <Link className="button button-primary" href={localizePath("/", locale)}>
        <ArrowLeft aria-hidden="true" />
        {t.home}
      </Link>
    </div>
  );
}
