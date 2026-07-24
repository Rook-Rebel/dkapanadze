import { siteConfig } from "@/config/site";

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteConfig.domain}/#person`,
  name: siteConfig.name.english,
  alternateName: siteConfig.name.georgian,
  url: siteConfig.domain,
  image: new URL(siteConfig.portrait.src, siteConfig.domain).toString(),
  jobTitle: siteConfig.academic.jobTitle,
  email: `mailto:${siteConfig.email}`,
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: siteConfig.affiliation.english,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Tbilisi",
      addressCountry: "GE",
    },
  },
  memberOf: {
    "@type": "Organization",
    name: siteConfig.membership.name,
  },
  sameAs: [
    siteConfig.profiles.orcid,
    siteConfig.profiles.academia,
    siteConfig.profiles.linkedin,
    siteConfig.profiles.facebook,
    ...siteConfig.arxivProfiles,
  ],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.domain}/#website`,
  url: siteConfig.domain,
  name: siteConfig.name.georgian,
  alternateName: siteConfig.name.english,
  inLanguage: "ka",
  about: { "@id": `${siteConfig.domain}/#person` },
};

export function breadcrumbJsonLd(
  items: Array<{ name: string; href: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.href, siteConfig.domain).toString(),
    })),
  };
}

export function webPageJsonLd(input: {
  type?: "WebPage" | "ProfilePage" | "CollectionPage" | "ContactPage";
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": input.type ?? "WebPage",
    "@id": `${new URL(input.path, siteConfig.domain).toString()}#webpage`,
    url: new URL(input.path, siteConfig.domain).toString(),
    name: input.name,
    description: input.description,
    inLanguage: "ka",
    isPartOf: { "@id": `${siteConfig.domain}/#website` },
    about: { "@id": `${siteConfig.domain}/#person` },
  };
}
