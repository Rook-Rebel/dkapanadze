import type { Metadata } from "next";
import type { Locale } from "@/i18n";
import { DigitalProjects } from "@/components/DigitalProjects";
import { MathIcon, type MathIconName } from "@/components/MathIcon";
import { PageHeader } from "@/components/PageHeader";
import { SectionHeading } from "@/components/SectionHeading";
import { StructuredData } from "@/components/StructuredData";
import { TangentDemo } from "@/components/TangentDemo";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";
import { getPageText } from "@/i18n/content";
import { getUi } from "@/i18n";

export function interactiveMetadata(locale: Locale): Metadata {
  const t = getPageText(locale).interactive;
  return createMetadata({ title: t.title, description: t.description, path: "/interactive", locale });
}

export function InteractiveView({ locale }: { locale: Locale }) {
  const t = getPageText(locale).interactive;
  const labels = getUi(locale);
  const crumbs = [
    { name: labels.home, href: "/" },
    { name: t.title, href: "/interactive" },
  ];

  return (
    <>
      <StructuredData
        data={[
          webPageJsonLd({ name: t.title, description: t.description, path: "/interactive", locale }),
          breadcrumbJsonLd(crumbs, locale),
        ]}
      />
      <PageHeader
        locale={locale}
        breadcrumbs={[{ label: t.title }]}
        eyebrow={t.eyebrow}
        title={t.title}
        lede={t.lede}
        motif="axes"
      >
        <ul className="topic-strip" aria-label={t.topicsLabel}>
          {t.topics.map((topic) => (
            <li key={topic.title}>
              <MathIcon name={topic.icon as MathIconName} />
              <div>
                <strong>{topic.title}</strong>
                <span>{topic.description}</span>
              </div>
            </li>
          ))}
        </ul>
      </PageHeader>

      <div className="site-shell page-body">
        <TangentDemo locale={locale} />
      </div>

      <section className="section section-band" id="projects" aria-labelledby="projects-title">
        <div className="site-shell">
          <SectionHeading
            id="projects-title"
            eyebrow={t.projectsEyebrow}
            title={t.projectsTitle}
            description={t.projectsText}
          />
          <DigitalProjects locale={locale} />
        </div>
      </section>
    </>
  );
}
