import Link from "next/link";
import { ArrowUpRight, ExternalLink, FileText } from "lucide-react";
import type { Publication } from "@/data/publications";
import { getCitation } from "@/data/publications";
import { CopyButton } from "./CopyButton";

export function PublicationCard({
  publication,
  compact = false,
}: {
  publication: Publication;
  compact?: boolean;
}) {
  return (
    <article className={`publication-card ${compact ? "publication-card-compact" : ""}`}>
      <div className="publication-meta">
        <span>{publication.year}</span>
        <span>{publication.type}</span>
        <span>{publication.status}</span>
        {publication.arxivId ? (
          <span className="arxiv-badge">arXiv:{publication.arxivId}</span>
        ) : null}
      </div>
      <div className="publication-main">
        <p className="publication-category">{publication.categoryLabel}</p>
        <h3 lang="en">
          <Link href={`/publications/${publication.slug}`}>{publication.title}</Link>
        </h3>
        {publication.subtitle ? (
          <p className="publication-subtitle" lang="en">
            {publication.subtitle}
          </p>
        ) : null}
        <p className="publication-georgian-title">{publication.georgianTitle}</p>
        {!compact ? <p className="publication-summary">{publication.summary}</p> : null}
        <p className="publication-author">{publication.author}</p>
      </div>
      <div className="publication-actions">
        <CopyButton value={getCitation(publication)} label="ციტირების კოპირება" />
        {publication.externalUrl ? (
          <a
            href={publication.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${publication.title} — გარე წყაროს გახსნა ახალ ჩანართში`}
          >
            <ExternalLink aria-hidden="true" />
            {publication.arxivId ? "arXiv-ზე ნახვა" : "გარე წყაროს ნახვა"}
          </a>
        ) : null}
        {publication.pdfUrl ? (
          <a
            href={publication.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${publication.title} — PDF-ის გახსნა ახალ ჩანართში`}
          >
            <FileText aria-hidden="true" />
            PDF-ის გახსნა
          </a>
        ) : null}
        <Link href={`/publications/${publication.slug}`}>
          ვრცლად
          <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
