import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getLocale } from "@/i18n/server";
import { getPageText } from "@/i18n/content";
import { getNavigation } from "@/i18n";

export default async function NotFound() {
  const locale = await getLocale();
  const t = getPageText(locale).notFound;
  const sections = getNavigation(locale).filter((item) => item.href !== "/" && !item.href.includes("#"));

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
      <Link className="button button-primary" href="/">
        <ArrowLeft aria-hidden="true" />
        {t.home}
      </Link>
    </div>
  );
}
