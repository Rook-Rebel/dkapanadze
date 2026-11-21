import Link from "next/link";
import { localizePath } from "@/i18n/paths";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getCitation } from "@/data/publications";
import { CopyButton } from "./CopyButton";
import { getUi, type Locale } from "@/i18n";
import type { LocalizedPublication } from "@/i18n/publications";
import { authorLine, externalLinkLabel, publicationKind } from "@/lib/publication-links";

export function PublicationCard({
  publication,
  compact = false,
  showYear = true,
  locale,
  headingLevel = 3,
}: {
  publication: LocalizedPublication;
  compact?: boolean;
  /** Hide the year column when entries are already grouped by year. */
  showYear?: boolean;
  locale: Locale;
  headingLevel?: 2 | 3 | 4;
}) {
  const labels = getUi(locale);
  const href = localizePath(`/publications/${publication.slug}`, locale);
  const Heading = headingLevel === 2 ? "h2" : headingLevel === 4 ? "h4" : "h3";

  return (
    <article
      className={`pub ${compact ? "pub-compact" : ""} ${showYear ? "" : "pub-in-group"}`.replace(/\s+/g, " ").trim()}
      data-category={publication.category}
      data-reveal
    >
      <div className="pub-meta">
        {showYear ? <p className="pub-year">{publication.year}</p> : null}
        <p className="pub-type" data-kind={publicationKind(publication)}>
          {publication.status}
        </p>
      </div>
      <div className="pub-body">
        <p className="pub-kicker">{publication.categoryLabel}</p>
        <Heading className="pub-title" lang="en">
          <Link href={href}>{publication.title}</Link>
        </Heading>
        {publication.subtitle ? (
          <p className="pub-subtitle" lang="en">
            {publication.subtitle}
          </p>
        ) : null}
        {publication.showGeorgianTitle ? (
          <p className="pub-title-ka">{publication.georgianTitle}</p>
        ) : null}
        {compact ? (
          <div className="pub-preview">
            <p className="pub-summary">{publication.summary}</p>
          </div>
        ) : (
          <p className="pub-summary">{publication.summary}</p>
        )}
        <div className="pub-footer">
          <p className="pub-byline">
            <span lang="en">{authorLine(publication)}</span>
            {publication.arxivId ? (
              <span className="pub-id" translate="no">
                arXiv:{publication.arxivId}
              </span>
            ) : null}
            {publication.isbn ? (
              <span className="pub-id" translate="no">
                ISBN {publication.isbn}
              </span>
            ) : null}
            {publication.doi && !publication.arxivId ? (
              <span className="pub-id" translate="no">
                DOI {publication.doi}
              </span>
            ) : null}
            {publication.kind === "journal" && publication.publication ? (
              <span className="pub-venue">{publication.publication}</span>
            ) : null}
          </p>
          <div className="pub-actions">
            <Link className="action-link" href={href}>
              {labels.details}
              <span className="sr-only">: {publication.title}</span>
              <ArrowRight aria-hidden="true" />
            </Link>
            {publication.externalUrl ? (
              <a
                className="action-link"
                href={publication.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {externalLinkLabel(publication, locale)}
                <ArrowUpRight aria-hidden="true" />
                <span className="sr-only"> {labels.newTab}</span>
              </a>
            ) : null}
            {publication.pdfUrl ? (
              <a
                className="action-link"
                href={publication.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {labels.openPdf}
                <ArrowUpRight aria-hidden="true" />
                <span className="sr-only"> {labels.newTab}</span>
              </a>
            ) : null}
            {compact ? null : (
              <CopyButton value={getCitation(publication)} label={labels.copyCitation} locale={locale} />
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
