import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MembershipCard } from "@/components/MembershipCard";
import { PageHeader } from "@/components/PageHeader";
import { ProfileSidebar } from "@/components/ProfileSidebar";
import { StructuredData } from "@/components/StructuredData";
import { siteConfig } from "@/config/site";
import { getLocale } from "@/i18n/server";
import { getContent, getPageText } from "@/i18n/content";
import { getUi } from "@/i18n";
import { getSiteText } from "@/i18n/site";
import { breadcrumbJsonLd, personJsonLd, webPageJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getPageText(locale).about;
  return createMetadata({
    title: t.metaTitle,
    description: t.description,
    path: "/davit-kapanadze",
    type: "profile",
    image: {
      url: siteConfig.portrait.src,
      width: siteConfig.portrait.width,
      height: siteConfig.portrait.height,
      alt: getSiteText(locale).portraitAlt,
    },
    locale,
  });
}

export default async function AboutPage() {
  const locale = await getLocale();
  const t = getPageText(locale).about;
  const { aboutContent } = getContent(locale);
  const labels = getUi(locale);
  const crumbs = [
    { name: labels.home, href: "/" },
    { name: t.title, href: "/davit-kapanadze" },
  ];

  return (
    <>
      <StructuredData
        data={[
          personJsonLd,
          webPageJsonLd({
            type: "ProfilePage",
            name: `${t.title} — ${t.eyebrow}`,
            description: t.description,
            path: "/davit-kapanadze",
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

      <div className="site-shell page-body profile-layout">
        <article className="prose">
          <section aria-labelledby="bio-title">
            <h2 id="bio-title">{t.biography}</h2>
            {aboutContent.biography.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>

          <section aria-labelledby="interests-title">
            <h2 id="interests-title">{t.interests}</h2>
            <ul>
              {aboutContent.interests.map((interest) => (
                <li key={interest}>{interest}</li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="activity-title">
            <h2 id="activity-title">{t.activity}</h2>
            <p>{aboutContent.academicActivity}</p>
            <Link className="text-link" href="/publications">
              {t.bibliography}
              <ArrowRight aria-hidden="true" />
            </Link>
          </section>

          <section aria-labelledby="vision-title">
            <h2 id="vision-title">{t.teaching}</h2>
            <p>{aboutContent.teachingVision}</p>
            <Link className="text-link" href="/teaching">
              {t.teachingAction}
              <ArrowRight aria-hidden="true" />
            </Link>
          </section>

          <section aria-labelledby="connections-title">
            <h2 id="connections-title">{t.connections}</h2>
            <p>{t.connectionsText}</p>
          </section>

          <section aria-labelledby="profiles-title">
            <h2 id="profiles-title">{t.profiles}</h2>
            <p>{t.profilesText}</p>
          </section>
        </article>
        <ProfileSidebar locale={locale} label={t.summaryLabel} />
      </div>

      <section className="section section-band">
        <div className="site-shell">
          <MembershipCard locale={locale} />
        </div>
      </section>
    </>
  );
}
