import katex from "katex";

type FormulaProps = {
  children: string;
  display?: boolean;
  label?: string;
  className?: string;
};

export function Formula({
  children,
  display = false,
  label,
  className = "",
}: FormulaProps) {
  const html = katex.renderToString(children, {
    displayMode: display,
    throwOnError: false,
    strict: false,
    output: "htmlAndMathml",
  });

  return (
    <span
      className={`formula ${display ? "formula-display" : ""} ${className}`}
      dir="ltr"
      aria-label={label}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
