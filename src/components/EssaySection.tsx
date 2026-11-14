import type { ReactNode } from "react";
import type { Locale } from "@/i18n";

export function EssaySection({
  id,
  number,
  title,
  locale,
  children,
}: {
  id: string;
  number: number;
  title: string;
  locale: Locale;
  children: ReactNode;
}) {
  const anchorLabel =
    locale === "en" ? `Link to section ${number}: ${title}` : `ბმული განყოფილებაზე ${number}: ${title}`;
  return (
    <section id={id} className="essay-section" aria-labelledby={`${id}-heading`} data-reveal>
      <div className="essay-heading-row">
        <p className="essay-number" aria-hidden="true">
          § {number}
        </p>
        <h2 id={`${id}-heading`} className="essay-heading">
          {title}
        </h2>
        <a className="essay-anchor" href={`#${id}`} aria-label={anchorLabel}>
          #
        </a>
      </div>
      {children}
    </section>
  );
}
