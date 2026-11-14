import Link from "next/link";
import { localizePath } from "@/i18n/paths";
import { ArrowRight } from "lucide-react";
import { Formula } from "./Formula";
import { getUi, type Locale } from "@/i18n";

type ResearchCardProps = {
  index: string;
  title: string;
  description: string;
  formula: string | null;
  href: string;
  locale: Locale;
  headingLevel?: 2 | 3;
};

export function ResearchCard({
  index,
  title,
  description,
  formula,
  href,
  locale,
  headingLevel = 3,
}: ResearchCardProps) {
  const labels = getUi(locale);
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const en = locale === "en";
  return (
    <article className="research-item" data-reveal>
      <p className="research-index" aria-hidden="true">
        {index}
      </p>
      <Heading className="research-title">{title}</Heading>
      <p className="research-text">{description}</p>
      <div className="research-figure">
        {formula ? (
          <Formula display>{formula}</Formula>
        ) : (
          <p className="research-chain">
            <span>{en ? "Algebra" : "ალგებრა"}</span>
            <span aria-hidden="true">→</span>
            <span>{en ? "Geometry" : "გეომეტრია"}</span>
            <span aria-hidden="true">→</span>
            <span>{en ? "Analysis" : "ანალიზი"}</span>
          </p>
        )}
      </div>
      <Link className="text-link" href={localizePath(href, locale)}>
        {labels.viewDirection}
        <span className="sr-only">: {title}</span>
        <ArrowRight aria-hidden="true" />
      </Link>
    </article>
  );
}
