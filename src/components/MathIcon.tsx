import type { ReactNode } from "react";

export type MathIconName =
  | "double-root"
  | "tangent"
  | "slope"
  | "derivative"
  | "rules"
  | "functions"
  | "limit"
  | "operator";

/**
 * Small line diagrams for the conceptual steps (24×24 grid, currentColor).
 * Each one depicts its idea literally: a parabola touching the axis for the
 * double root, a line touching a circle for the tangent, and so on.
 */
const paths: Record<MathIconName, ReactNode> = {
  "double-root": (
    <>
      <path d="M2.5 16.5h19" opacity="0.45" />
      <path d="M4 5.5c2.6 7.3 5 11 8 11s5.4-3.7 8-11" />
      <circle cx="12" cy="16.5" r="1.6" fill="currentColor" stroke="none" />
    </>
  ),
  tangent: (
    <>
      <circle cx="10" cy="13.5" r="6" />
      <path d="M7.2 3.6 21.6 18" />
      <circle cx="14.25" cy="9.25" r="1.5" fill="currentColor" stroke="none" />
    </>
  ),
  slope: (
    <>
      <path d="M4 19 20 6" />
      <path d="M4 19h16V6" strokeDasharray="2 2.4" opacity="0.6" />
    </>
  ),
  derivative: (
    <>
      <path d="M3 19c4.5-.5 7-3.2 9-7.2S16.6 4.6 21 4" />
      <path d="M7.5 18.2 17.8 5.2" opacity="0.55" />
      <circle cx="12.6" cy="11.6" r="1.6" fill="currentColor" stroke="none" />
    </>
  ),
  rules: (
    <>
      <path d="M9 7h11M9 12h11M9 17h7" />
      <circle cx="5" cy="7" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="5" cy="12" r="1.2" fill="currentColor" stroke="none" />
      <circle cx="5" cy="17" r="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  functions: (
    <>
      <path d="M2.5 12h19" opacity="0.45" />
      <path d="M2.5 12c2.2-6 4.4-6 6.5 0s4.4 6 6.5 0 4.3-6 6-3" />
    </>
  ),
  limit: (
    <>
      <path d="M3 12h11.5" />
      <path d="m11.5 8.8 3.2 3.2-3.2 3.2" />
      <circle cx="19" cy="12" r="2.3" />
    </>
  ),
  operator: (
    <>
      <path d="M5 15c1.2-4 5.8-4 7 0" />
      <path d="M12 15c1.2-4 5.8-4 7 0" />
      <path d="M5 15c2 5.5 12 5.5 14 0" strokeDasharray="2 2.4" opacity="0.6" />
      <circle cx="5" cy="15" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="12" cy="15" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="19" cy="15" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
};

export function MathIcon({ name, className = "" }: { name: MathIconName; className?: string }) {
  return (
    <svg
      className={`math-icon ${className}`.trim()}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
