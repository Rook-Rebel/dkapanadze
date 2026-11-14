import type { Metadata } from "next";
import { FeaturedBook } from "@/components/FeaturedBook";
import { PageHeader } from "@/components/PageHeader";
import { PublicationCard } from "@/components/PublicationCard";
import { PublicationFilters } from "@/components/PublicationFilters";
import { StructuredData } from "@/components/StructuredData";
import type { PublicationCategory } from "@/data/publications";
import { getLocale } from "@/i18n/server";
import { getPageText } from "@/i18n/content";
import { getUi } from "@/i18n";
import { getPublications } from "@/i18n/publications";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getPageText(locale).publications;
  return createMetadata({ title: t.title, description: t.description, path: "/publications", locale });
}

export default async function PublicationsPage() {
  const locale = await getLocale();
  const t = getPageText(locale).publications;
  const labels = getUi(locale);
  const publications = getPublications(locale);
  const crumbs = [
    { name: labels.home, href: "/" },
    { name: t.title, href: "/publications" },
  ];

  const counts: Record<"all" | PublicationCategory, number> = {
    all: publications.length,
    analysis: 0,
    education: 0,
    fractional: 0,
    monograph: 0,
    historical: 0,
  };
  for (const publication of publications) counts[publication.category] += 1;

  // Group by year, newest first (years such as "1999/2000" sort by their first year).
  const groups: Array<{ year: string; key: string; items: typeof publications }> = [];
  for (const publication of publications) {
    let group = groups.find((item) => item.year === publication.year);
    if (!group) {
      group = { year: publication.year, key: publication.year.replace(/\D+/g, "-"), items: [] };
      groups.push(group);
    }
    group.items.push(publication);
  }
  groups.sort((a, b) => Number.parseInt(b.year, 10) - Number.parseInt(a.year, 10));

  return (
    <>
      <StructuredData
        data={[
          webPageJsonLd({
            type: "CollectionPage",
            name: locale === "en" ? "Publications by Davit Kapanadze" : "დავით კაპანაძის ნაშრომები",
            description: t.description,
            path: "/publications",
            locale,
          }),
          breadcrumbJsonLd(crumbs),
        ]}
      />
      <PageHeader
        locale={locale}
        breadcrumbs={[{ label: t.title }]}
        eyebrow={t.eyebrow}
        title={t.title}
        lede={t.lede}
      />

      <div className="site-shell page-body">
        <section aria-labelledby="publication-list-title">
          <h2 id="publication-list-title" className="sr-only">
            {t.listTitle}
          </h2>
          <PublicationFilters counts={counts} locale={locale} label={t.filterLabel} emptyText={t.empty}>
            {groups.map((group) => (
              <section
                key={group.year}
                className="pub-year-group"
                aria-labelledby={`year-${group.key}`}
              >
                <h3 id={`year-${group.key}`} className="pub-year-heading">
                  <span>{group.year}</span>
                  <span className="pub-year-count">
                    {group.items.length} {locale === "en" ? (group.items.length === 1 ? "entry" : "entries") : "ჩანაწერი"}
                  </span>
                </h3>
                <div className="pub-year-items">
                  {group.items.map((publication) => (
                    <PublicationCard
                      key={publication.slug}
                      publication={publication}
                      showYear={false}
                      headingLevel={4}
                      locale={locale}
                    />
                  ))}
                </div>
              </section>
            ))}
          </PublicationFilters>
        </section>

        <section className="publications-book" aria-label={t.featuredBook}>
          <FeaturedBook compact locale={locale} headingId="publications-book-title" />
        </section>
      </div>
    </>
  );
}
