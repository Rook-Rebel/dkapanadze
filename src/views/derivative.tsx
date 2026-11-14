import type { Metadata } from "next";
import type { Locale } from "@/i18n";
import { localizePath } from "@/i18n/paths";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EssaySection } from "@/components/EssaySection";
import { EssayToc } from "@/components/EssayToc";
import { Formula } from "@/components/Formula";
import { MathText } from "@/components/MathText";
import { PageHeader } from "@/components/PageHeader";
import { PublicationCard } from "@/components/PublicationCard";
import { QuadraticGapDiagram } from "@/components/ResearchDiagrams";
import { StructuredData } from "@/components/StructuredData";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";
import { getPageText } from "@/i18n/content";
import { getUi } from "@/i18n";
import { getPublicationsBySlug, researchPublications } from "@/i18n/publications";

const path = "/research/derivative-without-limits";

export function derivativeMetadata(locale: Locale): Metadata {
  const t = getPageText(locale).derivative;
  return createMetadata({
    title: t.title,
    description: t.description,
    path,
    type: "article",
    keywords: locale === "en" ? ["double root", "tangent line"] : ["ორმაგი ფესვი", "მხები წრფე"],
    locale,
  });
}

export function DerivativeView({ locale }: { locale: Locale }) {
  const t = getPageText(locale).derivative;
  const research = getPageText(locale).research.title;
  const labels = getUi(locale);
  const related = getPublicationsBySlug(researchPublications.derivative, locale);
  const crumbs = [
    { name: labels.home, href: "/" },
    { name: research, href: "/research" },
    { name: t.title, href: path },
  ];
  const contents = [
    { id: "idea", label: t.idea },
    { id: "quadratic", label: t.quadratic },
    { id: "meaning", label: t.meaning },
    { id: "scope", label: t.scope },
    { id: "related", label: t.related },
  ];

  return (
    <>
      <StructuredData
        data={[
          webPageJsonLd({ name: t.title, description: t.description, path, locale }),
          breadcrumbJsonLd(crumbs, locale),
        ]}
      />
      <PageHeader
        locale={locale}
        breadcrumbs={[{ label: research, href: "/research" }, { label: t.title }]}
        eyebrow={t.eyebrow}
        title={t.title}
        lede={t.lede}
        motif="parabola"
      />

      <div className="site-shell page-body article-layout">
        <aside className="article-aside">
          <EssayToc items={contents} title={t.contents} />
        </aside>

        <article className="essay">
          <EssaySection id="idea" number={1} title={t.idea} locale={locale}>
            <p>
              <MathText>{t.ideaText}</MathText>
            </p>
            <div className="formula-panel essay-wide">
              <Formula display>{"f(x) - T_a(x) = (x - a)^2 Q(x)"}</Formula>
            </div>
          </EssaySection>

          <EssaySection id="quadratic" number={2} title={t.quadratic} locale={locale}>
            <p>
              <MathText>{t.quadraticText}</MathText>
            </p>
            <div className="formula-panel formula-panel-stack essay-wide">
              <Formula display>{"T_a(x) = 2ax - a^2"}</Formula>
              <Formula display>{"x^2 - (2ax - a^2) = (x - a)^2"}</Formula>
            </div>
            <QuadraticGapDiagram locale={locale} />
          </EssaySection>

          <EssaySection id="meaning" number={3} title={t.meaning} locale={locale}>
            <p>{t.meaningText}</p>
          </EssaySection>

          <EssaySection id="scope" number={4} title={t.scope} locale={locale}>
            <p>{t.scopeText}</p>
          </EssaySection>

          <EssaySection id="related" number={5} title={t.related} locale={locale}>
            <p>{t.relatedText}</p>
            <div className="pub-list pub-list-tight essay-wide">
              {related.map((publication) => (
                <PublicationCard key={publication.slug} publication={publication} compact locale={locale} />
              ))}
            </div>
            <div className="callout essay-wide">
              <h3>{t.interactive}</h3>
              <p>{t.interactiveText}</p>
              <Link className="button button-secondary" href={localizePath("/interactive", locale)}>
                {t.action}
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </EssaySection>
        </article>
      </div>
    </>
  );
}
