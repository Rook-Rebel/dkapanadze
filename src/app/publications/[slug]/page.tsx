import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, FileText } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CopyButton } from "@/components/CopyButton";
import { Formula } from "@/components/Formula";
import { GlassCard } from "@/components/GlassCard";
import { PublicationCard } from "@/components/PublicationCard";
import { StructuredData } from "@/components/StructuredData";
import { siteConfig } from "@/config/site";
import {
  getCitation,
  getPublication,
  publications,
  type Publication,
} from "@/data/publications";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { createMetadata } from "@/lib/metadata";

type PublicationPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return publications.map((publication) => ({ slug: publication.slug }));
}

export async function generateMetadata({
  params,
}: PublicationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const publication = getPublication(slug);
  if (!publication) return {};

  return createMetadata({
    title: publication.georgianTitle,
    description: publication.summary,
    path: `/publications/${publication.slug}`,
    type: "article",
    keywords: publication.keywords,
  });
}

function scholarlyArticleJsonLd(publication: Publication) {
  const article: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    "@id": `${siteConfig.domain}/publications/${publication.slug}#article`,
    url: `${siteConfig.domain}/publications/${publication.slug}`,
    name: publication.title,
    headline: publication.title,
    alternativeHeadline: publication.georgianTitle,
    author: { "@id": `${siteConfig.domain}/#person` },
    inLanguage: "en",
    abstract: publication.abstract,
    keywords: publication.keywords.join(", "),
    isPartOf: { "@id": `${siteConfig.domain}/#website` },
  };

  if (/^\d{4}$/.test(publication.year)) {
    article.dateCreated = publication.year;
  }
  if (publication.externalUrl) article.sameAs = publication.externalUrl;
  if (publication.arxivId) article.identifier = `arXiv:${publication.arxivId}`;
  if (publication.publisher) {
    article.publisher = {
      "@type": "Organization",
      name: publication.publisher,
    };
  }
  if (publication.isbn) article.isbn = publication.isbn;

  return article;
}

function bookJsonLd(publication: Publication) {
  return {
    "@context": "https://schema.org",
    "@type": "Book",
    "@id": `${siteConfig.domain}/publications/${publication.slug}#book`,
    url: `${siteConfig.domain}/publications/${publication.slug}`,
    name: publication.title,
    alternateName: publication.georgianTitle,
    author: { "@id": `${siteConfig.domain}/#person` },
    publisher: publication.publisher
      ? { "@type": "Organization", name: publication.publisher }
      : undefined,
    datePublished: publication.publicationDate,
    inLanguage: publication.language === "English" ? "en" : undefined,
    numberOfPages: publication.pageCount,
    isbn: [publication.isbn, publication.ebookIsbn].filter(Boolean),
    description: publication.abstract,
    sameAs: publication.externalUrl,
  };
}

export default async function PublicationDetailPage({
  params,
}: PublicationPageProps) {
  const { slug } = await params;
  const publication = getPublication(slug);
  if (!publication) notFound();

  const currentIndex = publications.findIndex((item) => item.slug === slug);
  const previous = currentIndex > 0 ? publications[currentIndex - 1] : null;
  const next =
    currentIndex < publications.length - 1
      ? publications[currentIndex + 1]
      : null;
  const related = publications
    .filter(
      (item) =>
        item.slug !== publication.slug &&
        (item.category === publication.category ||
          item.keywords.some((keyword) => publication.keywords.includes(keyword))),
    )
    .slice(0, 2);
  const citation = getCitation(publication);
  const crumbs = [
    { name: "მთავარი", href: "/" },
    { name: "ნაშრომები", href: "/publications" },
    {
      name: publication.georgianTitle,
      href: `/publications/${publication.slug}`,
    },
  ];

  return (
    <>
      <StructuredData
        data={[
          publication.category === "monograph"
            ? bookJsonLd(publication)
            : scholarlyArticleJsonLd(publication),
          breadcrumbJsonLd(crumbs),
        ]}
      />
      <header className="page-hero publication-detail">
        <div className="site-shell page-hero-inner">
          <Breadcrumbs
            items={[
              { label: "ნაშრომები", href: "/publications" },
              { label: publication.georgianTitle },
            ]}
          />
          <p className="eyebrow">{publication.categoryLabel}</p>
          <h1 lang="en">{publication.title}</h1>
          {publication.subtitle ? (
            <p className="publication-detail-subtitle" lang="en">
              {publication.subtitle}
            </p>
          ) : null}
          <p className="publication-detail-georgian">
            {publication.georgianTitle}
          </p>
          <div className="publication-detail-meta">
            <span className="badge badge-status">{publication.status}</span>
            <span className="badge">{publication.type}</span>
            <span className="badge">{publication.year}</span>
            <span className="badge" lang="en">
              {publication.author}
            </span>
            {publication.arxivId ? (
              <span className="badge arxiv-badge">
                arXiv:{publication.arxivId}
              </span>
            ) : null}
          </div>
        </div>
      </header>

      <div className="site-shell page-content publication-detail-grid">
        <article>
          <section className="editorial-section">
            <h2>ანოტაცია</h2>
            <p>{publication.abstract}</p>
          </section>

          {publication.formulas.length ? (
            <section className="editorial-section">
              <h2>ძირითადი ფორმულები</h2>
              <div className="formula-stack">
                {publication.formulas.map((formula) => (
                  <div className="formula-panel" key={formula}>
                    <Formula display>{formula}</Formula>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <section className="editorial-section">
            <h2>საკვანძო სიტყვები</h2>
            <ul className="keyword-list">
              {publication.keywords.map((keyword) => (
                <li key={keyword}>{keyword}</li>
              ))}
            </ul>
          </section>

          <section className="editorial-section">
            <h2>ციტირება</h2>
            <div className="citation-block">
              <p>{citation}</p>
              <CopyButton value={citation} label="ციტირების კოპირება" />
            </div>
          </section>

          {related.length ? (
            <section className="editorial-section">
              <h2>დაკავშირებული კვლევა</h2>
              <div className="publication-list">
                {related.map((item) => (
                  <PublicationCard key={item.slug} publication={item} compact />
                ))}
              </div>
            </section>
          ) : null}

          <nav className="publication-pagination" aria-label="ნაშრომებს შორის გადასვლა">
            {previous ? (
              <Link href={`/publications/${previous.slug}`}>
                <span>← წინა ნაშრომი</span>
                <strong>{previous.georgianTitle}</strong>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={`/publications/${next.slug}`}>
                <span>შემდეგი ნაშრომი →</span>
                <strong>{next.georgianTitle}</strong>
              </Link>
            ) : null}
          </nav>
        </article>

        <GlassCard as="aside" className="detail-sidebar">
          <dl>
            <div>
              <dt>ავტორი</dt>
              <dd>{publication.author}</dd>
            </div>
            <div>
              <dt>წელი</dt>
              <dd>{publication.year}</dd>
            </div>
            <div>
              <dt>ტიპი</dt>
              <dd>{publication.type}</dd>
            </div>
            <div>
              <dt>კატეგორია</dt>
              <dd>{publication.categoryLabel}</dd>
            </div>
            {publication.publisher ? (
              <div>
                <dt>გამომცემლობა</dt>
                <dd>{publication.publisher}</dd>
              </div>
            ) : null}
            {publication.isbn ? (
              <div>
                <dt>ISBN</dt>
                <dd>{publication.isbn}</dd>
              </div>
            ) : null}
            {publication.ebookIsbn ? (
              <div>
                <dt>ელექტრონული ISBN</dt>
                <dd>{publication.ebookIsbn}</dd>
              </div>
            ) : null}
            {publication.publicationDate ? (
              <div>
                <dt>გამოცემის თარიღი</dt>
                <dd>{publication.publicationDate}</dd>
              </div>
            ) : null}
            {publication.pageCount ? (
              <div>
                <dt>გვერდები</dt>
                <dd>{publication.pageCount}</dd>
              </div>
            ) : null}
            {publication.publication ? (
              <div>
                <dt>გამოცემა</dt>
                <dd>{publication.publication}</dd>
              </div>
            ) : null}
          </dl>
          <div className="detail-actions">
            <CopyButton value={citation} label="ციტირების კოპირება" />
            {publication.externalUrl ? (
              <a
                className="copy-button"
                href={publication.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="გარე წყაროს გახსნა ახალ ჩანართში"
              >
                <ExternalLink aria-hidden="true" />
                {publication.arxivId
                  ? "arXiv-ზე ნახვა"
                  : "გარე წყაროს ნახვა"}
              </a>
            ) : null}
            {publication.pdfUrl ? (
              <a
                className="copy-button"
                href={publication.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ნაშრომის PDF-ის გახსნა ახალ ჩანართში"
              >
                <FileText aria-hidden="true" />
                PDF-ის გახსნა
              </a>
            ) : null}
          </div>
          {publication.verificationNote ? (
            <p className="verification-note">{publication.verificationNote}</p>
          ) : null}
        </GlassCard>
      </div>
    </>
  );
}
