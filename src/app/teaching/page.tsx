import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LearningSequence } from "@/components/LearningSequence";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { StructuredData } from "@/components/StructuredData";
import { getLocale } from "@/i18n/server";
import { getContent, getPageText } from "@/i18n/content";
import { getUi } from "@/i18n";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getPageText(locale).teaching;
  return createMetadata({
    title: t.title,
    description: t.description,
    path: "/teaching",
    keywords:
      locale === "en"
        ? ["mathematics education", "cognitive-constructivist model"]
        : ["მათემატიკის სწავლება", "კოგნიტურ-კონსტრუქტივისტული მოდელი"],
    locale,
  });
}

export default async function TeachingPage() {
  const locale = await getLocale();
  const t = getPageText(locale).teaching;
  const labels = getUi(locale);
  const { teachingPrinciples } = getContent(locale);
  const crumbs = [
    { name: labels.home, href: "/" },
    { name: t.title, href: "/teaching" },
  ];
  const resources = [
    { title: t.notes, text: t.notesText },
    { title: t.demos, text: t.demosText },
    { title: t.guide, text: t.guideText },
  ];

  return (
    <>
      <StructuredData
        data={[
          webPageJsonLd({
            name: locale === "en" ? "Mathematics education" : "მათემატიკის სწავლება",
            description: t.description,
            path: "/teaching",
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
        motif="steps"
      />

      <section className="section" aria-labelledby="philosophy-title">
        <div className="site-shell">
          <SectionHeading
            id="philosophy-title"
            eyebrow={t.philosophy}
            title={t.philosophyTitle}
            description={t.philosophyText}
          />
          <ol className="principles">
            {teachingPrinciples.map((principle, index) => (
              <li key={principle.title} className="principle" data-reveal>
                <span className="principle-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section-band section-wash" aria-labelledby="path-title">
        <div className="site-shell">
          <SectionHeading id="path-title" eyebrow={t.path} title={t.pathTitle} description={t.pathText} />
          <LearningSequence locale={locale} />
        </div>
      </section>

      <section className="section" aria-labelledby="resources-title">
        <div className="site-shell">
          <SectionHeading
            id="resources-title"
            eyebrow={t.resources}
            title={t.resourcesTitle}
            description={t.resourcesText}
          />
          <ul className="resources">
            {resources.map((resource) => (
              <li key={resource.title} className="resource" data-reveal>
                <span className="status-tag">{t.inPreparation}</span>
                <h3>{resource.title}</h3>
                <p>{resource.text}</p>
              </li>
            ))}
          </ul>
          <div className="section-footer">
            <Link className="button button-secondary" href="/interactive">
              {t.action}
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
