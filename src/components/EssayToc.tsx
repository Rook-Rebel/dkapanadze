"use client";

import { useEffect, useState } from "react";

type TocItem = { id: string; label: string };

/** Sticky in-page navigation; marks the section currently being read. */
export function EssayToc({ items, title }: { items: TocItem[]; title: string }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length || typeof IntersectionObserver === "undefined") return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.boundingClientRect.top);
          else visible.delete(entry.target.id);
        }
        const current = items.find((item) => visible.has(item.id));
        if (current) setActive(current.id);
      },
      { rootMargin: "-20% 0px -55% 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav className="toc" aria-labelledby="toc-title">
      <p id="toc-title" className="subheading">
        {title}
      </p>
      <ol>
        {items.map((item, index) => (
          <li key={item.id}>
            <a href={`#${item.id}`} aria-current={active === item.id ? "location" : undefined}>
              <span className="toc-number" aria-hidden="true">
                {index + 1}
              </span>
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
