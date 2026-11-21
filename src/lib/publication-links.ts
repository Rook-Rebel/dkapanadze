import type { Publication } from "@/data/publications";
import type { Locale } from "@/i18n";

/** Where a record's main external link leads, so the label can say so plainly. */
export function externalDestination(publication: Publication) {
  if (publication.arxivId) return "arxiv" as const;
  if (publication.externalUrl?.includes("academia.edu")) return "academia" as const;
  if (publication.kind === "journal") return "journal" as const;
  if (publication.category === "monograph" || publication.publisher) return "publisher" as const;
  return "other" as const;
}

const labels = {
  short: {
    en: { arxiv: "arXiv", academia: "Academia.edu", journal: "Journal", publisher: "Publisher", other: "External source" },
    ka: { arxiv: "arXiv", academia: "Academia.edu", journal: "ჟურნალი", publisher: "გამომცემელი", other: "გარე წყარო" },
  },
  long: {
    en: {
      arxiv: "View on arXiv",
      academia: "View on Academia.edu",
      journal: "View in the journal",
      publisher: "View at the publisher",
      other: "External source",
    },
    ka: {
      arxiv: "arXiv-ზე ნახვა",
      academia: "Academia.edu-ზე ნახვა",
      journal: "ჟურნალში ნახვა",
      publisher: "გამომცემლის გვერდი",
      other: "გარე წყარო",
    },
  },
} as const;

export function externalLinkLabel(publication: Publication, locale: Locale, length: "short" | "long" = "short") {
  return labels[length][locale][externalDestination(publication)];
}

/** Display string for the author list (English names, publication order). */
export function authorLine(publication: Publication) {
  return publication.authors?.join(", ") ?? publication.author;
}

/** Visual kind for the list marker — always paired with a text label. */
export function publicationKind(publication: Publication) {
  if (publication.category === "monograph" || publication.kind === "textbook") return "book";
  if (publication.kind === "journal") return "journal";
  if (publication.arxivId) return "preprint";
  if (publication.category === "historical") return "article";
  return "manuscript";
}
