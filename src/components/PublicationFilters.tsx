"use client";

import { useMemo, useState } from "react";
import type { Publication, PublicationCategory } from "@/data/publications";
import { PublicationCard } from "./PublicationCard";

const filters: Array<{ value: "all" | PublicationCategory; label: string }> = [
  { value: "all", label: "ყველა ნაშრომი" },
  { value: "analysis", label: "მათემატიკური ანალიზი" },
  { value: "education", label: "მათემატიკის განათლება" },
  { value: "fractional", label: "ფრაქციული აღრიცხვა" },
  { value: "monograph", label: "მონოგრაფია" },
  { value: "historical", label: "ისტორიული ნაშრომები" },
];

export function PublicationFilters({
  publications,
}: {
  publications: Publication[];
}) {
  const [active, setActive] = useState<"all" | PublicationCategory>("all");
  const filtered = useMemo(
    () =>
      active === "all"
        ? publications
        : publications.filter((publication) => publication.category === active),
    [active, publications],
  );

  return (
    <div>
      <div className="publication-filters" aria-label="ნაშრომების ფილტრები">
        {filters.map((filter) => (
          <button
            key={filter.value}
            type="button"
            className={active === filter.value ? "active" : ""}
            aria-pressed={active === filter.value}
            onClick={() => setActive(filter.value)}
          >
            {filter.label}
            <span>
              {filter.value === "all"
                ? publications.length
                : publications.filter(
                    (publication) => publication.category === filter.value,
                  ).length}
            </span>
          </button>
        ))}
      </div>
      <p className="filter-result" aria-live="polite">
        ნაჩვენებია {filtered.length} ჩანაწერი
      </p>
      <div className="publication-list">
        {filtered.map((publication) => (
          <PublicationCard key={publication.slug} publication={publication} />
        ))}
      </div>
    </div>
  );
}
