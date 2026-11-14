"use client";

import { useState, type ReactNode } from "react";
import type { PublicationCategory } from "@/data/publications";
import type { Locale } from "@/i18n";
import { categoryFilters } from "@/i18n/publications";

type Filter = "all" | PublicationCategory;

/**
 * The publication archive itself is rendered on the server (children); this
 * component only owns the filter state and hides non-matching entries (and
 * empty year groups) via CSS.
 */
export function PublicationFilters({
  counts,
  locale,
  label,
  emptyText,
  children,
}: {
  counts: Record<Filter, number>;
  locale: Locale;
  label: string;
  emptyText: string;
  children: ReactNode;
}) {
  const [active, setActive] = useState<Filter>("all");
  const labels = categoryFilters[locale];
  const filters = (Object.keys(labels) as Filter[]).filter(
    (filter) => filter === "all" || counts[filter] > 0,
  );
  const shown = counts[active];
  const total = counts.all;

  return (
    <div className="pub-browser">
      <div className="pub-toolbar">
        <div className="pub-filters" role="group" aria-label={label}>
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              aria-pressed={active === filter}
              onClick={() => setActive(filter)}
            >
              {labels[filter]}
              <span className="pub-filter-count">{counts[filter]}</span>
            </button>
          ))}
        </div>
        <p className="pub-filter-result" aria-live="polite">
          {locale === "en"
            ? `Showing ${shown} of ${total} ${total === 1 ? "entry" : "entries"}`
            : `ნაჩვენებია ${shown} ჩანაწერი ${total}-დან`}
        </p>
      </div>
      <div className="pub-archive" data-filter={active}>
        {children}
      </div>
      {shown === 0 ? <p className="empty-state">{emptyText}</p> : null}
    </div>
  );
}
