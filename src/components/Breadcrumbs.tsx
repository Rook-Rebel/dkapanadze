import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getUi, type Locale } from "@/i18n";

export type BreadcrumbItem = {
  label: string;
  href?: string;
  lang?: string;
};

export function Breadcrumbs({ items, locale }: { items: BreadcrumbItem[]; locale: Locale }) {
  const labels = getUi(locale);
  return (
    <nav className="breadcrumbs" aria-label={labels.breadcrumbs}>
      <ol>
        <li>
          <Link href="/">{labels.home}</Link>
        </li>
        {items.map((item) => (
          <li key={`${item.label}-${item.href ?? "current"}`}>
            <ChevronRight aria-hidden="true" />
            {item.href ? (
              <Link href={item.href} lang={item.lang}>
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" lang={item.lang}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
