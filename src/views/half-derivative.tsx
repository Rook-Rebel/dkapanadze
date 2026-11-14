import type { Metadata } from "next";
import type { Locale } from "@/i18n";
import { EssaySection } from "@/components/EssaySection";
import { EssayToc } from "@/components/EssayToc";
import { Formula } from "@/components/Formula";
import { PageHeader } from "@/components/PageHeader";
import { PublicationCard } from "@/components/PublicationCard";
import { HalfDerivativeScheme } from "@/components/ResearchDiagrams";
import { StructuredData } from "@/components/StructuredData";
import { getPageText } from "@/i18n/content";
import { getUi } from "@/i18n";
import { getPublicationsBySlug, researchPublications } from "@/i18n/publications";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";

const path = "/research/half-derivative";

export function halfDerivativeMetadata(locale: Locale): Metadata {
  const t = getPageText(locale).half;
  return createMetadata({
    title: t.title,
    description: t.description,
    path,
    type: "article",
    keywords:
      locale === "en"
        ? ["half-derivative", "operator construction"]
        : ["ნახევარწარმოებული", "ოპერატორული კონსტრუქცია"],
    locale,
  });
}

export function HalfDerivativeView({ locale }: { locale: Locale }) {
  const t = getPageText(locale).half;
  const research = getPageText(locale).research.title;
  const labels = getUi(locale);
  const related = getPublicationsBySlug(researchPublications.half, locale);
  const crumbs = [
    { name: labels.home, href: "/" },
    { name: research, href: "/research" },
    { name: t.title, href: path },
  ];
  const contents = [
    { id: "operator", label: t.operator },
    { id: "graded-space", label: t.monomial },
    { id: "recurrence", label: t.recurrenceShort },
    { id: "publication", label: t.publicationShort },
  ];

  return (
    <>
      <StructuredData
        data={[
          webPageJsonLd({ name: t.heading, description: t.description, path, locale }),
          breadcrumbJsonLd(crumbs, locale),
        ]}
      />
      <PageHeader
        locale={locale}
        breadcrumbs={[{ label: research, href: "/research" }, { label: t.title }]}
        eyebrow={t.eyebrow}
        title={t.heading}
        lede={t.lede}
        motif="operator"
      />

      <div className="site-shell page-body article-layout">
        <aside className="article-aside">
          <EssayToc items={contents} title={t.contents} />
        </aside>

        <article className="essay">
          <EssaySection id="operator" number={1} title={t.operator} locale={locale}>
            <p>{t.operatorText}</p>
            <div className="formula-panel essay-wide">
              <Formula display>{"D^{1/2} \\circ D^{1/2} = D"}</Formula>
            </div>
          </EssaySection>

          <EssaySection id="graded-space" number={2} title={t.space} locale={locale}>
            <p>{t.spaceText}</p>
            <div className="formula-panel essay-wide">
              <Formula display>{"c(\\beta)c(\\beta - 1/2)=\\beta"}</Formula>
            </div>
            <HalfDerivativeScheme locale={locale} />
          </EssaySection>

          <EssaySection id="recurrence" number={3} title={t.recurrence} locale={locale}>
            <p>{t.recurrenceText}</p>
          </EssaySection>

          <EssaySection id="publication" number={4} title={t.publication} locale={locale}>
            <p>{t.publicationText}</p>
            <div className="pub-list pub-list-tight essay-wide">
              {related.map((publication) => (
                <PublicationCard key={publication.slug} publication={publication} compact locale={locale} />
              ))}
            </div>
          </EssaySection>
        </article>
      </div>
    </>
  );
}
