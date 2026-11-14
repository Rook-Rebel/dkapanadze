"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Gentle reveal-on-scroll for elements marked with [data-reveal].
 *
 * Safety rules, so content can never stay hidden:
 * - nothing is hidden until this runs (html gets .reveal-ready here);
 * - reduced-motion users never get the effect;
 * - anything already on screen is revealed immediately, without animation;
 * - if IntersectionObserver is unavailable or silent, everything is revealed.
 */
export function RevealObserver({ locale }: { locale: string }) {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-revealed])"));
    const reveal = (el: Element) => el.setAttribute("data-revealed", "");

    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      elements.forEach(reveal);
      return;
    }

    // Reveal what is already visible before enabling the hidden state.
    const viewportBottom = window.innerHeight;
    const pending = elements.filter((el) => {
      if (el.getBoundingClientRect().top < viewportBottom * 0.92) {
        reveal(el);
        return false;
      }
      return true;
    });
    root.classList.add("reveal-ready");

    let heardBack = false;
    const observer = new IntersectionObserver(
      (entries) => {
        heardBack = true;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            reveal(entry.target);
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    pending.forEach((el) => observer.observe(el));

    const failsafe = window.setTimeout(() => {
      if (!heardBack) pending.forEach(reveal);
    }, 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [pathname, locale]);

  return null;
}
