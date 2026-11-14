import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AcademicTimeline } from "@/components/AcademicTimeline";
import { DigitalProjects } from "@/components/DigitalProjects";
import { FeaturedBook } from "@/components/FeaturedBook";
import { Formula } from "@/components/Formula";
import { HeroSection } from "@/components/HeroSection";
import { LearningSequence } from "@/components/LearningSequence";
import { MathDivider } from "@/components/MathMotif";
import { MathText } from "@/components/MathText";
import { MembershipCard } from "@/components/MembershipCard";
import { PublicationCard } from "@/components/PublicationCard";
import { ResearchCard } from "@/components/ResearchCard";
import { SectionHeading } from "@/components/SectionHeading";
import { StructuredData } from "@/components/StructuredData";
import { getLocale } from "@/i18n/server";
import { getContent, getPageText } from "@/i18n/content";
import { getPublicationsBySlug } from "@/i18n/publications";
import { getSiteText } from "@/i18n/site";
import { webPageJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";

const featuredPublications = [
  "limit-free-polynomial-foundational-model",
  "limit-free-elementary-functions",
  "algebraic-operator-half-derivative",
] as const;

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const site = getSiteText(locale);
  return createMetadata({
    title: site.title,
    absoluteTitle: true,
    description: site.description,
    path: "/",
    locale,
  });
}

export default async function HomePage() {
  const locale = await getLocale();
  const { homeContent, researchFocus } = getContent(locale);
  const t = getPageText(locale).home;
  const publications = getPublicationsBySlug(featuredPublications, locale);
  const site = getSiteText(locale);

  return (
    <>
      <StructuredData
        data={webPageJsonLd({ name: site.title, description: site.description, path: "/", locale })}
      />
      <HeroSection locale={locale} />

      {/* 01 — Research focus (paper zone, offset heading) */}
      <section className="section zone-paper" id="research-focus" aria-labelledby="research-focus-title">
        <div className="site-shell">
          <SectionHeading
            id="research-focus-title"
            layout="split"
            index="01"
            eyebrow={t.researchEyebrow}
            title={t.researchTitle}
            description={t.researchDescription}
          />
          <div className="research-grid">
            {researchFocus.map((research) => (
              <ResearchCard key={research.title} {...research} locale={locale} />
            ))}
          </div>
        </div>
      </section>

      {/* Interlude — the central idea: narrow text column beside an open derivation */}
      <section className="section zone-ivory zone-grid" aria-labelledby="idea-title">
        <div className="site-shell idea-grid">
          <div className="idea-copy" data-reveal>
            <p className="eyebrow">{t.ideaEyebrow}</p>
            <h2 id="idea-title" className="section-title idea-title">
              {t.ideaTitle}
            </h2>
            <p className="idea-text">{homeContent.idea}</p>
            <Link className="text-link" href="/research/derivative-without-limits">
              {t.ideaAction}
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <ol className="proof-steps" data-reveal>
            <li>
              <span className="proof-number" aria-hidden="true">
                1
              </span>
              <div>
                <h3>{t.geometricCondition}</h3>
                <p>
                  <MathText>{t.geometricText}</MathText>
                </p>
              </div>
            </li>
            <li>
              <span className="proof-number" aria-hidden="true">
                2
              </span>
              <div>
                <h3>{t.algebraicTranslation}</h3>
                <p>
                  <MathText>{t.algebraicText}</MathText>
                </p>
              </div>
            </li>
            <li>
              <span className="proof-number" aria-hidden="true">
                3
              </span>
              <div>
                <h3>{t.factorisationCriterion}</h3>
                <p>
                  <MathText>{t.criterionText}</MathText>
                </p>
                <div className="equation equation-panel">
                  <Formula display>{"f(x) - T_a(x) = (x - a)^2 Q(x)"}</Formula>
                  <span className="equation-number" aria-hidden="true">
                    (1)
                  </span>
                </div>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* 02 — Selected publications, then the timeline of themes */}
      <section className="section zone-paper" aria-labelledby="featured-publications-title">
        <MathDivider className="section-divider" />
        <div className="site-shell">
          <SectionHeading
            id="featured-publications-title"
            layout="split"
            index="02"
            eyebrow={t.publicationsEyebrow}
            title={t.publicationsTitle}
            description={t.publicationsDescription}
            action={
              <Link className="text-link" href="/publications">
                {t.bibliography}
                <ArrowRight aria-hidden="true" />
              </Link>
            }
          />
          <div className="pub-list pub-list-home">
            {publications.map((publication) => (
              <PublicationCard key={publication.slug} publication={publication} compact locale={locale} />
            ))}
          </div>

          <div className="timeline-block">
            <SectionHeading
              id="timeline-title"
              level={3}
              eyebrow={t.timelineEyebrow}
              title={t.timelineTitle}
              description={t.timelineDescription}
            />
            <AcademicTimeline locale={locale} headingLevel={4} />
          </div>
        </div>
      </section>

      {/* 03 — Teaching perspective */}
      <section className="section zone-ivory section-wash" aria-labelledby="teaching-title">
        <div className="site-shell">
          <SectionHeading
            id="teaching-title"
            layout="split"
            index="03"
            eyebrow={t.teachingEyebrow}
            title={t.teachingTitle}
            description={t.teachingText}
            action={
              <Link className="text-link" href="/teaching">
                {t.teachingAction}
                <ArrowRight aria-hidden="true" />
              </Link>
            }
          />
          <LearningSequence locale={locale} />
        </div>
      </section>

      {/* 04 — Interactive mathematics (layout mirrored: projects left, text right) */}
      <section className="section zone-paper" aria-labelledby="interactive-title">
        <div className="site-shell interactive-intro">
          <div className="interactive-intro-copy" data-reveal>
            <p className="section-index">
              <span className="section-index-number">04</span>
              <span className="section-index-slash" aria-hidden="true">
                /
              </span>
              <span>{t.interactiveEyebrow}</span>
            </p>
            <h2 id="interactive-title" className="section-title">
              {t.interactiveTitle}
            </h2>
            <p className="section-description">{t.interactiveText}</p>
            <Link className="button button-primary" href="/interactive">
              {t.openDemo}
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
          <div className="interactive-intro-projects">
            <h3 className="subheading" id="projects-title">
              {t.projectsTitle}
            </h3>
            <p className="muted">{t.projectsDescription}</p>
            <DigitalProjects locale={locale} headingLevel={4} />
          </div>
        </div>
      </section>

      {/* Book — editorial feature */}
      <section
        className="section book-zone"
        aria-label={locale === "en" ? "Monograph" : "მონოგრაფია"}
      >
        <MathDivider className="section-divider" />
        <div className="site-shell">
          <FeaturedBook locale={locale} headingId="home-book-title" />
        </div>
      </section>

      {/* Professional membership and further contact */}
      <section className="section zone-paper section-closing">
        <div className="site-shell closing-grid">
          <MembershipCard locale={locale} compact headingId="home-membership-title" />
          <div className="contact-callout" data-reveal>
            <p className="eyebrow">{t.contactEyebrow}</p>
            <h2 className="section-title">{t.contactTitle}</h2>
            <p>{t.contactText}</p>
            <Link className="button button-primary" href="/contact">
              {t.contactAction}
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
