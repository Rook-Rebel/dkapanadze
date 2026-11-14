import type { Metadata } from "next";
import type { Locale } from "@/i18n";
import { ArrowUpRight } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { CopyButton } from "@/components/CopyButton";
import { PageHeader } from "@/components/PageHeader";
import { PortraitFrame } from "@/components/PortraitFrame";
import { SocialLinks } from "@/components/SocialLinks";
import { StructuredData } from "@/components/StructuredData";
import { siteConfig } from "@/config/site";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";
import { getPageText } from "@/i18n/content";
import { getUi } from "@/i18n";
import { getSiteText } from "@/i18n/site";

export function contactMetadata(locale: Locale): Metadata {
  const t = getPageText(locale).contact;
  return createMetadata({
    title: t.title,
    description: t.description,
    path: "/contact",
    image: {
      url: siteConfig.portrait.src,
      width: siteConfig.portrait.width,
      height: siteConfig.portrait.height,
      alt: getSiteText(locale).portraitAlt,
    },
    locale,
  });
}

export function ContactView({ locale }: { locale: Locale }) {
  const t = getPageText(locale).contact;
  const site = getSiteText(locale);
  const labels = getUi(locale);
  const orcidId = siteConfig.profiles.orcid.replace("https://orcid.org/", "");
  const crumbs = [
    { name: labels.home, href: "/" },
    { name: t.title, href: "/contact" },
  ];

  return (
    <>
      <StructuredData
        data={[
          webPageJsonLd({
            type: "ContactPage",
            name: locale === "en" ? "Contact Davit Kapanadze" : "დავით კაპანაძესთან დაკავშირება",
            description: t.description,
            path: "/contact",
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
      />

      <div className="site-shell page-body contact-layout">
        <section className="contact-details" aria-labelledby="contact-info-title">
          <div className="contact-person">
            <PortraitFrame variant="contact" locale={locale} />
            <div>
              <p className="contact-name">{site.name}</p>
              <p className="muted">{site.position}</p>
            </div>
          </div>
          <h2 id="contact-info-title" className="subheading">
            {t.info}
          </h2>
          <p className="muted">{t.infoText}</p>
          <dl className="contact-facts">
            <div>
              <dt>{t.email}</dt>
              <dd className="contact-email">
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
                <CopyButton value={siteConfig.email} label={t.copyEmail} locale={locale} />
              </dd>
            </div>
            <div>
              <dt>{t.affiliation}</dt>
              <dd>
                {site.affiliation}
                <span className="muted">{site.faculty}</span>
              </dd>
            </div>
            <div>
              <dt>{t.location}</dt>
              <dd>{site.location}</dd>
            </div>
            <div>
              <dt>ORCID iD</dt>
              <dd>
                <a href={siteConfig.profiles.orcid} target="_blank" rel="noopener noreferrer" translate="no">
                  {orcidId}
                  <ArrowUpRight aria-hidden="true" />
                  <span className="sr-only"> {labels.newTab}</span>
                </a>
              </dd>
            </div>
            <div>
              <dt>{t.areas}</dt>
              <dd>{t.areasText}</dd>
            </div>
          </dl>
          <SocialLinks locale={locale} exclude={["ORCID"]} />
        </section>

        <section className="contact-form-card" aria-labelledby="contact-form-title">
          <h2 id="contact-form-title" className="subheading">
            {t.form}
          </h2>
          <ContactForm locale={locale} headingId="contact-form-title" />
        </section>
      </div>
    </>
  );
}
