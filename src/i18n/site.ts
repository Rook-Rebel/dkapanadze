import type { Locale } from ".";
import { siteConfig } from "@/config/site";
import { formatIsoDate } from "@/lib/format";

export type SiteProject = {
  title: string;
  localizedTitle: string;
  url: string;
  category: string;
  description: string;
};

const englishProjects: Array<Pick<SiteProject, "localizedTitle" | "category" | "description">> = [
  {
    localizedTitle: "Goldbach Conjecture Visual Explorer",
    category: "Number theory · Data visualisation",
    description:
      "An interactive platform for representing even numbers as sums of two primes, visualising the data, and exploring Goldbach’s conjecture experimentally.",
  },
  {
    localizedTitle: "Interactive Derivative Visualisation Platform",
    category: "Mathematics education · Analysis",
    description:
      "An interactive teaching environment for visualising the tangent line, the derivative, the algebraic–geometric criterion, and related mathematical models.",
  },
];

export function getSiteText(locale: Locale) {
  const english = locale === "en";
  const projects: SiteProject[] = siteConfig.projects.map((project, index) => ({
    title: project.title,
    url: project.url,
    localizedTitle: english ? englishProjects[index].localizedTitle : project.georgianTitle,
    category: english ? englishProjects[index].category : project.category,
    description: english ? englishProjects[index].description : project.description,
  }));

  return {
    name: english ? siteConfig.name.english : siteConfig.name.georgian,
    title: english
      ? "Davit Kapanadze — Mathematician, Researcher and Professor"
      : siteConfig.title,
    description: english
      ? "The academic website of Professor Davit Kapanadze: research in mathematical analysis, algebraic–geometric approaches to the derivative, fractional calculus, and mathematics education."
      : siteConfig.description,
    tagline: english ? "Mathematics · Research · Education" : "მათემატიკა · კვლევა · განათლება",
    portraitAlt: english
      ? "Portrait of Davit Kapanadze, mathematician and professor"
      : "მათემატიკოსისა და პროფესორის, დავით კაპანაძის პორტრეტი",
    academicStatus: english ? siteConfig.academic.statusEnglish : siteConfig.academic.status,
    position: english ? siteConfig.academic.positionEnglish : siteConfig.academic.position,
    faculty: english ? siteConfig.academic.facultyEnglish : siteConfig.academic.faculty,
    affiliation: english ? siteConfig.affiliation.english : siteConfig.affiliation.name,
    location: english ? siteConfig.location.english : siteConfig.affiliation.location,
    membershipRole: english ? siteConfig.membership.roleEnglish : siteConfig.membership.role,
    membershipCountry: english ? "United Kingdom" : siteConfig.membership.country,
    electionDate: formatIsoDate(siteConfig.membership.electionDateIso, locale),
    book: {
      description: english
        ? "The book presents an algebraic and geometric-functional construction of the derivative for elementary functions without using the limit as the initial definition. The classical limiting representation appears later as an analytic formalisation of the already constructed geometric differential."
        : siteConfig.book.description,
      publicationDate: formatIsoDate(siteConfig.book.publicationDateIso, locale),
      language: english ? "English" : siteConfig.book.language,
    },
    projects,
  };
}
