import type { ReactNode } from "react";
import type { Locale } from "@/i18n";
import { Breadcrumbs, type BreadcrumbItem } from "./Breadcrumbs";
import { HeaderMotif, type HeaderMotifName } from "./MathMotif";

type PageHeaderProps = {
  locale: Locale;
  breadcrumbs: BreadcrumbItem[];
  eyebrow?: ReactNode;
  title: ReactNode;
  titleLang?: string;
  lede?: ReactNode;
  children?: ReactNode;
  variant?: "default" | "publication";
  /** Optional low-contrast construction drawn on the right (desktop only). */
  motif?: HeaderMotifName;
};

export function PageHeader({
  locale,
  breadcrumbs,
  eyebrow,
  title,
  titleLang,
  lede,
  children,
  variant = "default",
  motif,
}: PageHeaderProps) {
  return (
    <header className={`page-header page-header-${variant} ${motif ? "page-header-with-motif" : ""}`.trim()}>
      {motif ? <HeaderMotif name={motif} /> : null}
      <div className="site-shell page-header-inner">
        <Breadcrumbs locale={locale} items={breadcrumbs} />
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 className="page-title" lang={titleLang}>
          {title}
        </h1>
        {lede ? <p className="lede">{lede}</p> : null}
        {children}
      </div>
    </header>
  );
}
