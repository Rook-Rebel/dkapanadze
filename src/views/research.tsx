import type { Metadata } from "next";
import type { Locale } from "@/i18n";
import { localizePath } from "@/i18n/paths";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Formula } from "@/components/Formula";
import { PageHeader } from "@/components/PageHeader";
import { StructuredData } from "@/components/StructuredData";
import { getContent, getPageText } from "@/i18n/content";
import { getUi } from "@/i18n";
import { getPublicationsBySlug, researchPublications } from "@/i18n/publications";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";

export function researchMetadata(locale: Locale): Metadata {
  const t = getPageText(locale).research;
  return createMetadata({ title: t.title, description: t.description, path: "/research", locale });
}

const relatedByArea = [researchPublications.derivative, researchPublications.half, researchPublications.teaching];

export function ResearchView({ locale }: { locale: Locale }) {
  const t = getPageText(locale).research;
  const labels = getUi(locale);
  const { researchFocus } = getContent(locale);
  const crumbs = [
    { name: labels.home, href: "/" },
    { name: t.title, href: "/research" },
  ];

  return (
    <>
      <StructuredData
        data={[
          webPageJsonLd({
            type: "CollectionPage",
            name: t.areasTitle,
            description: t.description,
            path: "/research",
            locale,
          }),
          breadcrumbJsonLd(crumbs, locale),
        ]}
      />
      <PageHeader
        locale={locale}
        breadcrumbs={[{ label: t.title }]}
        eyebrow={t.eyebrow}
        title={t.title}
        lede={t.lede}
        motif="tangent"
      />

      <div className="site-shell page-body">
        <h2 className="sr-only">{t.areasTitle}</h2>
        <div className="area-list">
          {researchFocus.map((research, index) => {
            const related = getPublicationsBySlug(relatedByArea[index] ?? [], locale);
            const isTeaching = research.href === "/teaching";
            return (
              <article key={research.title} className="area" aria-labelledby={`area-${research.index}`} data-reveal>
                <p className="area-index" aria-hidden="true">
                  {research.index}
                </p>
                <div className="area-main">
                  <h3 id={`area-${research.index}`} className="area-title">
                    {research.title}
                  </h3>
                  <p className="area-text">{research.description}</p>
                  {research.formula ? (
                    <div className="formula-panel">
                      <Formula display>{research.formula}</Formula>
                    </div>
                  ) : null}
                  <Link className="text-link" href={localizePath(research.href, locale)}>
                    {isTeaching ? t.teachingExplore : t.explore}
                    <span className="sr-only">: {research.title}</span>
                    <ArrowRight aria-hidden="true" />
                  </Link>
                </div>
                {related.length ? (
                  <aside className="area-related" aria-label={`${t.relatedPublications}: ${research.title}`}>
                    <p className="subheading">{t.relatedPublications}</p>
                    <ul>
                      {related.map((publication) => (
                        <li key={publication.slug}>
                          <Link href={localizePath(`/publications/${publication.slug}`, locale)} lang="en">
                            {publication.title}
                          </Link>
                          <span>
                            {publication.year} · {publication.status}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </aside>
                ) : null}
              </article>
            );
          })}
        </div>

        <section className="area-connections" aria-labelledby="connections-title" data-reveal>
          <h2 id="connections-title" className="section-title">
            {t.connections}
          </h2>
          <p>{t.connectionsText}</p>
          <Link className="button button-secondary" href={localizePath("/publications", locale)}>
            {t.related}
            <ArrowRight aria-hidden="true" />
          </Link>
        </section>
      </div>
    </>
  );
}
