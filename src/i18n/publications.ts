import type { Locale } from ".";
import { publications, type Publication, type PublicationCategory } from "@/data/publications";

type Translation = Pick<
  Publication,
  "type" | "status" | "categoryLabel" | "summary" | "abstract" | "keywords"
> & { verificationNote?: string; publication?: string };

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
    status: "Journal article",
    categoryLabel: "Earlier works",
    summary:
      "A historical and methodological review of the relationship between the foundations of mathematical analysis and the school mathematics curriculum.",
    abstract:
      "An early article on the relationship between the foundations of mathematical analysis and the school mathematics course, published in Physics and Mathematics at School (No. 116). It is available on Academia.edu.",
    keywords: ["mathematical analysis", "school mathematics", "history", "methodology"],
    publication: "Physics and Mathematics at School, No. 116",
    verificationNote:
      "The page range and a direct link to the paper have not been added yet; the link points to the author's Academia.edu profile.",
  },
  "methodology-introducing-function": {
    type: "Article",
    status: "Journal article",
    categoryLabel: "Earlier works",
    summary:
      "A methodological article on introducing the concept of function in a progressive and comprehensible way.",
    abstract:
      "A methodological article on introducing the concept of function, published in Physics and Mathematics at School, pp. 52–57. It is available on Academia.edu.",
    keywords: ["function", "mathematics education", "methodology"],
    publication: "Physics and Mathematics at School, No. 121",
  },
  "teaching-derivative-tangent-model-dynamic-visualization": {
    type: "Article",
    status: "Journal article",
    categoryLabel: "Mathematics education",
    summary:
      "The article examines teaching the derivative through an algebraic–geometric tangent model combined with dynamic visualization.",
    abstract:
      "Published in the International Journal on Integrating Technology in Education (IJITE), vol. 15, no. 2, pp. 15–27. The full text is available on the journal's website.",
    keywords: ["derivative", "tangent", "dynamic visualization", "mathematics education"],
  },
  "teaching-derivative-without-initial-limits": {
    type: "Article",
    status: "Journal article",
    categoryLabel: "Mathematics education",
    summary:
      "The article examines teaching the derivative without the initial use of limits, from a cognitive-constructivist and algebraic–geometric perspective.",
    abstract:
      "Published in the journal Intellecti, No. 2(82), pp. 107–114 (ISSN 1512-0333). The article is written in Georgian.",
    keywords: ["derivative without limits", "constructivist teaching", "mathematics education"],
    publication: "Intellecti, No. 2(82), pp. 107–114",
  },
  "half-order-recurrence-fractional-differentiation-monomials": {
    type: "Preprint",
    status: "arXiv preprint",
    categoryLabel: "Fractional calculus",
    summary:
      "The paper extends the half-order recurrence on monomials to differentiation of general fractional order, using functional continuation and operator composition.",
    abstract:
      "The paper extends the half-order recurrence on monomials to differentiation of general fractional order, using functional continuation and operator composition. The full text is available on arXiv.",
    keywords: ["fractional differentiation", "half-derivative", "operator composition", "monomials"],
  },
  "student-question-half-derivative-teaching-model": {
    type: "Preprint",
    status: "arXiv preprint",
    categoryLabel: "Mathematics education",
    summary:
      "The paper presents a constructivist teaching model that leads from a student's question to the concept of the half-derivative (Part I).",
    abstract:
      "The paper presents a constructivist teaching model that leads from a student's question to the concept of the half-derivative. This is the first part of a series; the full text is available on arXiv.",
    keywords: ["half-derivative", "constructivist teaching", "mathematics education"],
  },
  "derivative-without-limits-review-comparative-analysis": {
    type: "Review",
    status: "Available on Academia.edu",
    categoryLabel: "Mathematical analysis",
    summary:
      "A review of the algebraic–geometric construction of the derivative without limits, with a comparative analysis.",
    abstract:
      "A review of the algebraic–geometric construction of the derivative without limits, with a comparative analysis. The paper is available on Academia.edu.",
    keywords: ["derivative without limits", "review", "comparative analysis"],
    verificationNote: "A direct link to the paper has not been added yet; the link points to the author's Academia.edu profile.",
  },
  "fractional-derivatives-constructive-research-programme": {
    type: "Research paper",
    status: "Available on Academia.edu",
    categoryLabel: "Fractional calculus",
    summary:
      "The paper discusses the motivation for and applications of fractional derivatives, and sets out a constructive research programme.",
    abstract:
      "The paper discusses the motivation for and applications of fractional derivatives, and sets out a constructive research programme. The full text is available on Academia.edu.",
    keywords: ["fractional derivatives", "fractional calculus", "research programme"],
  },
  "algebraic-geometric-model-teaching-derivative-guide": {
    type: "Methodological guide",
    status: "Available on Academia.edu",
    categoryLabel: "Mathematics education",
    summary:
      "A methodological guide to an algebraic–geometric model for teaching the derivative, with two lesson scenarios.",
    abstract:
      "A methodological guide to an algebraic–geometric model for teaching the derivative, with two lesson scenarios. The full text is available on Academia.edu.",
    keywords: ["derivative", "methodological guide", "lesson scenarios", "mathematics education"],
  },
  "mathematics-10-school-textbook": {
    type: "School textbook",
    status: "Published textbook",
    categoryLabel: "Earlier works",
    summary:
      "A Grade 10 school mathematics textbook (co-authored). Selected sections are available on Academia.edu.",
    abstract:
      "A Grade 10 school mathematics textbook, published by Diogene Publishing House (Tbilisi, 2006). Selected sections are available on Academia.edu.",
    keywords: ["school textbook", "mathematics", "Grade 10"],
  },
  "polynomial-behaviour-derivatives": {
    type: "Research paper",
    status: "Available on Academia.edu",
    categoryLabel: "Earlier works",
    summary: "A study of the behaviour of polynomials using derivatives.",
    abstract: "An early paper on investigating the behaviour of polynomials using derivatives. The paper is available on Academia.edu.",
    keywords: ["polynomial", "derivative", "function analysis"],
    verificationNote: "A direct link to the paper has not been added yet; the link points to the author's Academia.edu profile.",
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
    "derivative-without-limits-review-comparative-analysis",
  ],
  half: [
    "algebraic-operator-half-derivative",
    "half-order-recurrence-fractional-differentiation-monomials",
    "fractional-derivatives-constructive-research-programme",
  ],
  teaching: [
    "teaching-derivative-tangent-model-dynamic-visualization",
    "teaching-derivative-without-initial-limits",
    "student-question-half-derivative-teaching-model",
    "algebraic-geometric-model-teaching-derivative-guide",
    "cognitive-constructivist-foundations-derivative-without-limits",
    "teaching-derivative-polynomial-case",
  ],
} as const;
