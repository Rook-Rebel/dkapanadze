import Link from "next/link";
import { ArrowUpRight, BookOpenText } from "lucide-react";
import { siteConfig } from "@/config/site";

export function FeaturedBook({ compact = false }: { compact?: boolean }) {
  return (
    <article className={`featured-book ${compact ? "featured-book-compact" : ""}`}>
      <div
        className="book-visual"
        role="img"
        aria-label="წიგნის ტიპოგრაფიული ვიზუალი, არა ოფიციალური ყდა"
      >
        <span className="book-visual-note">ტიპოგრაფიული ვიზუალი · არა ოფიციალური ყდა</span>
        <BookOpenText aria-hidden="true" />
        <strong lang="en">{siteConfig.book.title}</strong>
        <i lang="en">{siteConfig.book.subtitle}</i>
        <small lang="en">{siteConfig.book.author}</small>
      </div>
      <div className="book-content">
        <p className="eyebrow font-archy-bold">მთავარი წიგნი</p>
        <h2 lang="en">{siteConfig.book.title}</h2>
        <p className="book-subtitle" lang="en">
          {siteConfig.book.subtitle}
        </p>
        <p>{siteConfig.book.description}</p>
        <dl className="book-metadata">
          <div>
            <dt>ავტორი</dt>
            <dd>{siteConfig.book.author}</dd>
          </div>
          <div>
            <dt>გამომცემლობა</dt>
            <dd>{siteConfig.book.publisher}</dd>
          </div>
          <div>
            <dt>გამოცემის თარიღი</dt>
            <dd>{siteConfig.book.publicationDate}</dd>
          </div>
          <div>
            <dt>ენა / გვერდები</dt>
            <dd>
              {siteConfig.book.language} · {siteConfig.book.pageCount}
            </dd>
          </div>
          <div>
            <dt>რბილი ყდა</dt>
            <dd>ISBN {siteConfig.book.softcoverIsbn}</dd>
          </div>
          <div>
            <dt>ელექტრონული წიგნი</dt>
            <dd>ISBN {siteConfig.book.ebookIsbn}</dd>
          </div>
        </dl>
        <div className="book-actions">
          <a
            className="button button-primary"
            href={siteConfig.book.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Calculus Without Limits-ის ოფიციალური გვერდის გახსნა ახალ ჩანართში"
          >
            წიგნის ნახვა
            <ArrowUpRight aria-hidden="true" />
          </a>
          <Link
            className="button button-secondary"
            href={`/publications/${siteConfig.book.slug}`}
          >
            წიგნის შესახებ
          </Link>
        </div>
      </div>
    </article>
  );
}
