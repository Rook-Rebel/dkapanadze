import type { ReactNode } from "react";

type SectionHeadingProps = {
  id?: string;
  eyebrow?: string;
  /** Optional section number, shown as a quiet "01 / label" marker. */
  index?: string;
  title: string;
  description?: ReactNode;
  /** Heading level; sections on a page are h2 by default. */
  level?: 2 | 3;
  action?: ReactNode;
  /** "split" sets the label in a narrow left column, offset from the title. */
  layout?: "stacked" | "split";
};

export function SectionHeading({
  id,
  eyebrow,
  index,
  title,
  description,
  level = 2,
  action,
  layout = "stacked",
}: SectionHeadingProps) {
  const Heading = level === 2 ? "h2" : "h3";
  const label =
    index && eyebrow ? (
      <p className="section-index">
        <span className="section-index-number">{index}</span>
        <span className="section-index-slash" aria-hidden="true">
          /
        </span>
        <span>{eyebrow}</span>
      </p>
    ) : eyebrow ? (
      <p className="eyebrow">{eyebrow}</p>
    ) : null;

  return (
    <header
      className={`section-heading section-heading-${layout} ${action ? "section-heading-with-action" : ""}`.trim()}
      data-reveal
    >
      {layout === "split" ? <div className="section-heading-aside">{label}</div> : null}
      <div className="section-heading-copy">
        {layout === "split" ? null : label}
        <Heading id={id} className="section-title">
          {title}
        </Heading>
        {description ? <p className="section-description">{description}</p> : null}
        {action && layout === "split" ? <div className="section-heading-action">{action}</div> : null}
      </div>
      {action && layout !== "split" ? <div className="section-heading-action">{action}</div> : null}
    </header>
  );
}
