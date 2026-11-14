import type { Locale } from ".";
import { publications, type Publication, type PublicationCategory } from "@/data/publications";

type Translation = Pick<
  Publication,
  "type" | "status" | "categoryLabel" | "summary" | "abstract" | "keywords"
> & { verificationNote?: string };

const english: Record<string, Translation> = {
  "cognitive-constructivist-foundations-derivative-without-limits": {
    type: "Research manuscript",
    status: "Manuscript",
    categoryLabel: "Mathematics education",
    summary:
      "The derivative is first introduced without the formal definition of a limit, using the quadratic function, the double root, geometric tangency, Bézout’s theorem, and an algebraic–geometric criterion.",
    abstract:
      "The central idea is to construct the concept of the derivative from algebraic and geometric structures already familiar to the learner. The quadratic function, the double root, and the tangent form the initial model, while the factorisation criterion extends the approach to polynomials.",
    keywords: ["derivative without limits", "constructivist teaching", "double root", "tangent"],
    verificationNote: "Publication details and a permanent link are not yet available.",
  },
  "teaching-derivative-polynomial-case": {
    type: "Research manuscript",
    status: "Manuscript",
    categoryLabel: "Mathematics education and polynomial calculus",
    summary:
      "A model for teaching the derivative of polynomial functions that unites the double root, the tangent line, and factorisation in a single conceptual chain.",
    abstract:
      "The manuscript examines the polynomial case, in which the tangency condition is expressed algebraically through a double root of the difference between a function and the corresponding line. The approach develops the rules of differentiation from previously familiar structures.",
    keywords: ["polynomial", "derivative", "algebraic geometry", "teaching"],
    verificationNote: "Publication details are not yet available.",
  },
  "algebraic-operator-half-derivative": {
    type: "Preprint",
    status: "arXiv preprint",
    categoryLabel: "Fractional calculus",
    summary:
      "The paper constructs a half-order differentiation operator on a graded monomial space, using operator composition, recurrence relations, double factorials, and the Wallis product.",
    abstract:
      "The paper studies an operator whose composition with itself yields ordinary differentiation. Its coefficients are determined by a recurrence relation connected with double factorials and the Wallis product.",
    keywords: ["half-derivative", "fractional calculus", "operator", "Wallis product"],
  },
  "limit-free-elementary-functions": {
    type: "Preprint",
    status: "arXiv preprint",
    categoryLabel: "Mathematical analysis",
    summary:
      "The paper extends the limit-free algebraic–geometric construction of the derivative to rational power, exponential, logarithmic, trigonometric, and inverse trigonometric functions.",
    abstract:
      "The preprint extends the algebraic–geometric approach to constructing the derivative without limits to the elementary functions. The full text is available on arXiv.",
    keywords: ["limit-free derivative", "elementary functions", "algebraic–geometric derivative"],
  },
  "limit-free-polynomial-foundational-model": {
    type: "Preprint",
    status: "arXiv preprint",
    categoryLabel: "Mathematical analysis and mathematics education",
    summary:
      "The paper constructs the derivative in the class of polynomial functions from the tangent line and the algebraic double-root condition, without using the limit as the initial definition.",
    abstract:
      "The foundational model for the derivative in the class of polynomial functions rests on the algebraic relationship between the tangent line and a double root. The preprint formulates the approach without using the limit as the initial definition.",
    keywords: ["derivative without limits", "polynomial functions", "double root", "mathematics education"],
  },
  "calculus-without-limits-monograph": {
    type: "Monograph",
    status: "Published monograph",
    categoryLabel: "Monograph",
    summary:
      "The book presents an algebraic and geometric-functional construction of the derivative for elementary functions without using the limit as the initial definition.",
    abstract:
      "The book presents an algebraic and geometric-functional construction of the derivative for elementary functions without using the limit as the initial definition. The classical limiting representation appears later as an analytic formalisation of the already constructed geometric differential.",
    keywords: ["calculus without limits", "monograph", "derivative"],
  },
  "foundations-analysis-school-course": {
    type: "Article",
    status: "Bibliographic details being verified",
    categoryLabel: "Earlier works",
    summary:
      "A historical and methodological review of the relationship between the foundations of mathematical analysis and the school mathematics curriculum.",
    abstract:
      "An abstract of this earlier work is not yet available online. The record lists the known title, author, and date.",
    keywords: ["mathematical analysis", "school mathematics", "history", "methodology"],
    verificationNote: "The journal, volume, issue, pages, and exact year are being verified.",
  },
  "methodology-introducing-function": {
    type: "Article",
    status: "Bibliographic record",
    categoryLabel: "Earlier works",
    summary:
      "A methodological article on introducing the concept of function in a progressive and comprehensible way.",
    abstract:
      "This record is based on the article’s title and publication details. A full abstract and a digital copy are not yet available online.",
    keywords: ["function", "mathematics education", "methodology"],
    verificationNote: "The page range and full publication details are being verified.",
  },
};

export const categoryFilters: Record<Locale, Record<"all" | PublicationCategory, string>> = {
  ka: {
    all: "ყველა",
    analysis: "მათემატიკური ანალიზი",
    education: "მათემატიკის განათლება",
    fractional: "ფრაქციული აღრიცხვა",
    monograph: "მონოგრაფია",
    historical: "ადრეული ნაშრომები",
  },
  en: {
    all: "All",
    analysis: "Mathematical analysis",
    education: "Mathematics education",
    fractional: "Fractional calculus",
    monograph: "Monograph",
    historical: "Earlier works",
  },
};

export type LocalizedPublication = Publication & { showGeorgianTitle: boolean };

export function getPublications(locale: Locale): LocalizedPublication[] {
  return publications.map((publication) => {
    const translated = locale === "en" ? english[publication.slug] : undefined;
    return {
      ...publication,
      ...(translated ?? {}),
      // Never fall back to a Georgian-only note on English pages.
      verificationNote: translated ? translated.verificationNote : publication.verificationNote,
      showGeorgianTitle: locale === "ka",
    };
  });
}

export function getLocalizedPublication(slug: string, locale: Locale) {
  return getPublications(locale).find((publication) => publication.slug === slug);
}

export function getPublicationsBySlug(slugs: readonly string[], locale: Locale) {
  const all = getPublications(locale);
  return slugs
    .map((slug) => all.find((publication) => publication.slug === slug))
    .filter((publication): publication is LocalizedPublication => Boolean(publication));
}

/** Publications that directly develop each research direction (by slug). */
export const researchPublications = {
  derivative: [
    "limit-free-polynomial-foundational-model",
    "limit-free-elementary-functions",
    "calculus-without-limits-monograph",
  ],
  half: ["algebraic-operator-half-derivative"],
  teaching: [
    "cognitive-constructivist-foundations-derivative-without-limits",
    "teaching-derivative-polynomial-case",
  ],
} as const;
