import Link from "next/link";
import { localizePath } from "@/i18n/paths";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getUi, type Locale } from "@/i18n";
import { getSiteText } from "@/i18n/site";

export function FeaturedBook({
  compact = false,
  locale,
  headingId,
}: {
  compact?: boolean;
  locale: Locale;
  headingId?: string;
}) {
  const text = getSiteText(locale);
  const labels = getUi(locale);
  const en = locale === "en";
  const book = siteConfig.book;

  return (
    <article className={`book ${compact ? "book-compact" : ""}`.trim()} aria-labelledby={headingId} data-reveal>
      <figure className="book-plate">
        <div className="book-cover" aria-hidden="true">
          <span className="book-cover-mark">∂</span>
          <strong lang="en">{book.title}</strong>
          <span className="book-cover-subtitle" lang="en">
            {book.subtitle}
          </span>
          <span className="book-cover-author" lang="en">
            {book.author}
          </span>
        </div>
        <figcaption>
          {en ? "Typographic rendering — not the official cover" : "ტიპოგრაფიული გამოსახულება — არა ოფიციალური ყდა"}
        </figcaption>
      </figure>

      <div className="book-content">
        <p className="eyebrow">{en ? "Monograph · " : "მონოგრაფია · "}{book.publisher}</p>
        <h2 id={headingId} className="book-title" lang="en">
          {book.title}
        </h2>
        <p className="book-subtitle" lang="en">
          {book.subtitle}
        </p>
        <p className="book-description">{text.book.description}</p>
        <dl className="book-meta">
          <div>
            <dt>{en ? "Author" : "ავტორი"}</dt>
            <dd lang="en">{book.author}</dd>
          </div>
          <div>
            <dt>{en ? "Publisher" : "გამომცემლობა"}</dt>
            <dd lang="en">{book.publisher}</dd>
          </div>
          <div>
            <dt>{en ? "Published" : "გამოცემის თარიღი"}</dt>
            <dd>{text.book.publicationDate}</dd>
          </div>
          <div>
            <dt>{en ? "Language · Pages" : "ენა · გვერდები"}</dt>
            <dd>
              {text.book.language} · {book.pageCount}
            </dd>
          </div>
          <div>
            <dt>{en ? "Softcover ISBN" : "რბილი ყდა, ISBN"}</dt>
            <dd translate="no">{book.softcoverIsbn}</dd>
          </div>
          <div>
            <dt>{en ? "E-book ISBN" : "ელექტრონული წიგნი, ISBN"}</dt>
            <dd translate="no">{book.ebookIsbn}</dd>
          </div>
        </dl>
        <div className="book-actions">
          <a
            className="button button-primary"
            href={book.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {en ? "View at the publisher" : "გამომცემლის გვერდი"}
            <ArrowUpRight aria-hidden="true" />
            <span className="sr-only"> {labels.newTab}</span>
          </a>
          <Link className="text-link" href={localizePath(`/publications/${book.slug}`, locale)}>
            {en ? "About the book" : "წიგნის შესახებ"}
            <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
