import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { CopyButton } from "@/components/CopyButton";
import { Formula } from "@/components/Formula";
import { PageHeader } from "@/components/PageHeader";
import { PublicationCard } from "@/components/PublicationCard";
import { StructuredData } from "@/components/StructuredData";
import { getCitation, publications } from "@/data/publications";
import { bookJsonLd, breadcrumbJsonLd, scholarlyArticleJsonLd } from "@/lib/json-ld";
import { formatIsoDate } from "@/lib/format";
import { createMetadata } from "@/lib/metadata";
import { getLocale } from "@/i18n/server";
import { getLocalizedPublication, getPublications } from "@/i18n/publications";
import { getUi } from "@/i18n";

type PublicationPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return publications.map((publication) => ({ slug: publication.slug }));
}

export async function generateMetadata({ params }: PublicationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const publication = getLocalizedPublication(slug, locale);
  if (!publication) return {};

  return createMetadata({
    title: locale === "en" ? publication.title : publication.georgianTitle,
    description: publication.summary,
    path: `/publications/${publication.slug}`,
    type: publication.category === "monograph" ? "book" : "article",
    keywords: publication.keywords,
    locale,
  });
}

export default async function PublicationDetailPage({ params }: PublicationPageProps) {
  const { slug } = await params;
  const locale = await getLocale();
  const publication = getLocalizedPublication(slug, locale);
  if (!publication) notFound();

  const en = locale === "en";
  const labels = getUi(locale);
  const all = getPublications(locale);
  const currentIndex = all.findIndex((item) => item.slug === slug);
  const previous = currentIndex > 0 ? all[currentIndex - 1] : null;
  const next = currentIndex < all.length - 1 ? all[currentIndex + 1] : null;
  const related = all
    .filter(
      (item) =>
        item.slug !== publication.slug &&
        (item.category === publication.category ||
          item.keywords.some((keyword) => publication.keywords.includes(keyword))),
    )
    .slice(0, 2);
  const citation = getCitation(publication);
  const publicationsLabel = en ? "Publications" : "ნაშრომები";
  const crumbs = [
    { name: labels.home, href: "/" },
    { name: publicationsLabel, href: "/publications" },
    { name: en ? publication.title : publication.georgianTitle, href: `/publications/${publication.slug}` },
  ];

  const details: Array<{ term: string; value: string; lang?: string; translate?: boolean }> = [
    { term: en ? "Author" : "ავტორი", value: publication.author, lang: "en" },
    { term: en ? "Year" : "წელი", value: publication.year },
    { term: en ? "Type" : "ტიპი", value: publication.type },
    { term: en ? "Status" : "სტატუსი", value: publication.status },
    { term: en ? "Category" : "კატეგორია", value: publication.categoryLabel },
  ];
  if (publication.arxivId) details.push({ term: "arXiv", value: publication.arxivId, translate: false });
  if (publication.publication)
    details.push({ term: en ? "Published in" : "გამოცემა", value: publication.publication, lang: "en" });
  if (publication.publisher)
    details.push({ term: en ? "Publisher" : "გამომცემლობა", value: publication.publisher, lang: "en" });
  if (publication.publicationDate)
    details.push({ term: en ? "Publication date" : "გამოცემის თარიღი", value: formatIsoDate(publication.publicationDate, locale) });
  if (publication.language)
    details.push({ term: en ? "Language" : "ენა", value: en ? publication.language : publication.language === "English" ? "ინგლისური" : publication.language });
  if (publication.pageCount)
    details.push({ term: en ? "Pages" : "გვერდები", value: String(publication.pageCount) });
  if (publication.isbn)
    details.push({ term: en ? "Softcover ISBN" : "ISBN (რბილი ყდა)", value: publication.isbn, translate: false });
  if (publication.ebookIsbn)
    details.push({ term: en ? "E-book ISBN" : "ISBN (ელექტრონული)", value: publication.ebookIsbn, translate: false });

  return (
    <>
      <StructuredData
        data={[
          publication.category === "monograph" ? bookJsonLd(publication) : scholarlyArticleJsonLd(publication),
          breadcrumbJsonLd(crumbs),
        ]}
      />
      <PageHeader
        locale={locale}
        variant="publication"
        breadcrumbs={[
          { label: publicationsLabel, href: "/publications" },
          en ? { label: publication.title, lang: "en" } : { label: publication.georgianTitle },
        ]}
        eyebrow={`${publication.categoryLabel} · ${publication.type}`}
        title={publication.title}
        titleLang="en"
      >
        {publication.subtitle ? (
          <p className="publication-subtitle" lang="en">
            {publication.subtitle}
          </p>
        ) : null}
        {publication.showGeorgianTitle ? (
          <p className="publication-title-ka">{publication.georgianTitle}</p>
        ) : null}
        <p className="publication-meta-line">
          <span lang="en">{publication.author}</span>
          <span>{publication.year}</span>
          <span>{publication.status}</span>
          {publication.arxivId ? <span translate="no">arXiv:{publication.arxivId}</span> : null}
        </p>
      </PageHeader>

      <div className="site-shell page-body detail-layout">
        <article className="prose detail-body">
          <section aria-labelledby="abstract-heading">
            <h2 id="abstract-heading">{en ? "Abstract" : "ანოტაცია"}</h2>
            <p>{publication.abstract}</p>
          </section>

          {publication.formulas.length ? (
            <section aria-labelledby="formulas-heading">
              <h2 id="formulas-heading">{en ? "Key formulas" : "ძირითადი ფორმულები"}</h2>
              <div className="formula-panel formula-panel-stack">
                {publication.formulas.map((formula) => (
                  <Formula display key={formula}>
                    {formula}
                  </Formula>
                ))}
              </div>
            </section>
          ) : null}

          <section aria-labelledby="keywords-heading">
            <h2 id="keywords-heading">{en ? "Keywords" : "საკვანძო სიტყვები"}</h2>
            <ul className="keyword-list">
              {publication.keywords.map((keyword) => (
                <li key={keyword}>{keyword}</li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="citation-heading">
            <h2 id="citation-heading">{en ? "Citation" : "ციტირება"}</h2>
            <div className="citation">
              <p lang="en">{citation}</p>
              <CopyButton value={citation} label={labels.copyCitation} locale={locale} />
            </div>
          </section>

          {related.length ? (
            <section aria-labelledby="related-heading">
              <h2 id="related-heading">{en ? "Related publications" : "დაკავშირებული ნაშრომები"}</h2>
              <div className="pub-list pub-list-tight">
                {related.map((item) => (
                  <PublicationCard key={item.slug} publication={item} compact locale={locale} />
                ))}
              </div>
            </section>
          ) : null}
        </article>

        <aside className="detail-aside" aria-labelledby="details-heading">
          <h2 id="details-heading" className="subheading">
            {en ? "Bibliographic details" : "ბიბლიოგრაფიული მონაცემები"}
          </h2>
          <dl className="detail-facts">
            {details.map((row) => (
              <div key={row.term}>
                <dt>{row.term}</dt>
                <dd lang={row.lang} translate={row.translate === false ? "no" : undefined}>
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
          {publication.externalUrl || publication.pdfUrl ? (
          <div className="detail-actions">
            {publication.externalUrl ? (
              <a
                className="button button-primary"
                href={publication.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {publication.arxivId
                  ? en
                    ? "View on arXiv"
                    : "arXiv-ზე ნახვა"
                  : publication.category === "monograph"
                    ? en
                      ? "View at the publisher"
                      : "გამომცემლის გვერდი"
                    : labels.externalSource}
                <ArrowUpRight aria-hidden="true" />
                <span className="sr-only"> {labels.newTab}</span>
              </a>
            ) : null}
            {publication.pdfUrl ? (
              <a
                className="button button-secondary"
                href={publication.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {en ? "Open PDF" : "PDF-ის გახსნა"}
                <ArrowUpRight aria-hidden="true" />
                <span className="sr-only"> {labels.newTab}</span>
              </a>
            ) : null}
          </div>
          ) : null}
          {publication.verificationNote ? (
            <p className="detail-note">
              <strong>{en ? "Note" : "შენიშვნა"}:</strong> {publication.verificationNote}
            </p>
          ) : null}
        </aside>
      </div>

      <nav
        className="site-shell pager"
        aria-label={en ? "Previous and next publication" : "წინა და შემდეგი ნაშრომი"}
      >
        {previous ? (
          <Link className="pager-link pager-prev" href={`/publications/${previous.slug}`} rel="prev">
            <span className="pager-label">
              <ArrowLeft aria-hidden="true" />
              {en ? "Previous" : "წინა"}
            </span>
            <span className="pager-title" lang={en ? "en" : undefined}>
              {en ? previous.title : previous.georgianTitle}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link className="pager-link pager-next" href={`/publications/${next.slug}`} rel="next">
            <span className="pager-label">
              {en ? "Next" : "შემდეგი"}
              <ArrowRight aria-hidden="true" />
            </span>
            <span className="pager-title" lang={en ? "en" : undefined}>
              {en ? next.title : next.georgianTitle}
            </span>
          </Link>
        ) : null}
      </nav>
    </>
  );
}
