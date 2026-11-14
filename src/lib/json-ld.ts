import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n";
import type { Publication } from "@/data/publications";
import { absoluteUrl } from "@/i18n/paths";
import { getSiteText } from "@/i18n/site";

const personId = `${siteConfig.domain}/#person`;
const websiteId = `${siteConfig.domain}/#website`;
const orcidId = siteConfig.profiles.orcid.replace("https://orcid.org/", "");

/** The person behind the site — verified facts only. Emitted once per page (root layout). */
export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": personId,
  name: siteConfig.name.english,
  alternateName: siteConfig.name.georgian,
  url: siteConfig.domain,
  image: new URL(siteConfig.portrait.src, siteConfig.domain).toString(),
  jobTitle: "Professor",
  honorificSuffix: siteConfig.membership.postNominal,
  email: `mailto:${siteConfig.email}`,
  identifier: {
    "@type": "PropertyValue",
    propertyID: "ORCID",
    value: orcidId,
    url: siteConfig.profiles.orcid,
  },
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: siteConfig.affiliation.english,
    alternateName: siteConfig.affiliation.name,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tbilisi",
      addressCountry: "GE",
    },
  },
  worksFor: {
    "@type": "CollegeOrUniversity",
    name: siteConfig.affiliation.english,
  },
  memberOf: {
    "@type": "Organization",
    name: siteConfig.membership.name,
  },
  knowsAbout: [
    "Mathematics",
    "Mathematical analysis",
    "Derivative without limits",
    "Half-derivative operator",
    "Fractional calculus",
    "Mathematics education",
  ],
  sameAs: [
    siteConfig.profiles.orcid,
    siteConfig.profiles.academia,
    siteConfig.profiles.linkedin,
    siteConfig.profiles.facebook,
  ],
};

export function websiteJsonLd(locale: Locale) {
  const text = getSiteText(locale);
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId,
    url: absoluteUrl("/", locale),
    name: siteConfig.name.english,
    alternateName: siteConfig.name.georgian,
    description: text.description,
    inLanguage: ["ka", "en"],
    about: { "@id": personId },
    publisher: { "@id": personId },
  };
}

/** Breadcrumb trail; `href` values are unprefixed paths, localized here. */
export function breadcrumbJsonLd(items: Array<{ name: string; href: string }>, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href, locale),
    })),
  };
}

export function webPageJsonLd(input: {
  type?: "WebPage" | "ProfilePage" | "CollectionPage" | "ContactPage";
  name: string;
  description: string;
  path: string;
  locale: Locale;
}) {
  const url = absoluteUrl(input.path, input.locale);
  const page: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": input.type ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: input.name,
    description: input.description,
    inLanguage: input.locale,
    isPartOf: { "@id": websiteId },
    about: { "@id": personId },
  };
  if (input.type === "ProfilePage") page.mainEntity = { "@id": personId };
  return page;
}

/** Preprints and manuscripts: no journal, DOI or peer-review claims are made. */
export function scholarlyArticleJsonLd(publication: Publication & { summary: string }, locale: Locale) {
  const url = absoluteUrl(`/publications/${publication.slug}`, locale);
  const article: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    "@id": `${url}#article`,
    url,
    mainEntityOfPage: url,
    name: publication.title,
    headline: publication.title,
    alternativeHeadline: publication.georgianTitle,
    author: { "@id": personId },
    inLanguage: "en",
    description: publication.summary,
    abstract: publication.abstract,
    keywords: publication.keywords.join(", "),
    isPartOf: { "@id": websiteId },
  };

  if (/^\d{4}$/.test(publication.year)) article.dateCreated = publication.year;
  if (publication.externalUrl) article.sameAs = publication.externalUrl;
  if (publication.arxivId) {
    article.identifier = { "@type": "PropertyValue", propertyID: "arXiv", value: publication.arxivId };
  }
  if (publication.pdfUrl) {
    article.encoding = { "@type": "MediaObject", encodingFormat: "application/pdf", contentUrl: publication.pdfUrl };
  }
  return article;
}

export function bookJsonLd(publication: Publication & { summary: string }, locale: Locale) {
  const url = absoluteUrl(`/publications/${publication.slug}`, locale);
  const editions = [
    publication.isbn
      ? { "@type": "Book", bookFormat: "https://schema.org/Paperback", isbn: publication.isbn }
      : null,
    publication.ebookIsbn
      ? { "@type": "Book", bookFormat: "https://schema.org/EBook", isbn: publication.ebookIsbn }
      : null,
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Book",
    "@id": `${url}#book`,
    url,
    mainEntityOfPage: url,
    name: publication.title,
    alternateName: publication.georgianTitle,
    author: { "@id": personId },
    publisher: publication.publisher ? { "@type": "Organization", name: publication.publisher } : undefined,
    datePublished: publication.publicationDate,
    inLanguage: publication.language === "English" ? "en" : undefined,
    numberOfPages: publication.pageCount,
    isbn: publication.isbn,
    workExample: editions.length ? editions : undefined,
    description: publication.summary,
    sameAs: publication.externalUrl,
  };
}
