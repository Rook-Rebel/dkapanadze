import { Fragment } from "react";
import { Formula } from "./Formula";

/**
 * Plain-text mathematical fragments used in the site copy, mapped to LaTeX so
 * they are typeset by KaTeX instead of inheriting the Georgian interface font
 * (whose Latin glyphs are capitals and would turn "x = a" into "X = A").
 */
const fragments: Record<string, string> = {
  "Tₐ(x) = 2ax − a²": "T_a(x) = 2ax - a^2",
  "f(x) = x²": "f(x) = x^2",
  "(x − a)²": "(x - a)^2",
  "Tₐ(x)": "T_a(x)",
  "Tₐ": "T_a",
  "x = a": "x = a",
  "x²": "x^2",
};

const pattern = new RegExp(
  `(${Object.keys(fragments)
    .sort((a, b) => b.length - a.length)
    .map((fragment) => fragment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|")})`,
  "g",
);

export function MathText({ children }: { children: string }) {
  const parts = children.split(pattern);
  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <Formula key={index}>{fragments[part]}</Formula>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </>
  );
}
