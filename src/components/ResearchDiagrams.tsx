import type { Locale } from "@/i18n";
import { Formula } from "./Formula";

/*
 * Exact figures for the research essays.
 */

/* f(x) = x², tangent at a = 1: T₁(x) = 2x − 1. The vertical gap is (x − 1)². */
export function QuadraticGapDiagram({ locale }: { locale: Locale }) {
  const en = locale === "en";
  const view = { w: 560, h: 320, l: 40, r: 530, t: 18, b: 290 };
  const dom = { xMin: -1.6, xMax: 3.4, yMin: -3.6, yMax: 10.2 };
  const sx = (x: number) => view.l + ((x - dom.xMin) / (dom.xMax - dom.xMin)) * (view.r - view.l);
  const sy = (y: number) => view.b - ((y - dom.yMin) / (dom.yMax - dom.yMin)) * (view.b - view.t);
  const f = (x: number) => x * x;
  const t = (x: number) => 2 * x - 1;
  const curve = Array.from({ length: 101 }, (_, i) => {
    const x = dom.xMin + (i / 100) * (dom.xMax - dom.xMin);
    return `${i === 0 ? "M" : "L"}${sx(x).toFixed(1)} ${sy(f(x)).toFixed(1)}`;
  }).join(" ");
  const gaps = [-1, 0, 2, 3];

  return (
    <figure className="essay-figure" data-reveal="draw">
      <svg
        viewBox={`0 0 ${view.w} ${view.h}`}
        role="img"
        aria-label={
          en
            ? "Graph of y = x² and its tangent y = 2x − 1 at x = 1, with the vertical gaps between them"
            : "y = x² ფუნქციის გრაფიკი, მისი მხები y = 2x − 1 წერტილში x = 1 და მათ შორის ვერტიკალური მანძილები"
        }
      >
        <g className="figure-grid">
          {[-1, 0, 1, 2, 3].map((x) => (
            <line key={`x${x}`} x1={sx(x)} x2={sx(x)} y1={view.t} y2={view.b} />
          ))}
          {[-2, 0, 2, 4, 6, 8, 10].map((y) => (
            <line key={`y${y}`} x1={view.l} x2={view.r} y1={sy(y)} y2={sy(y)} />
          ))}
        </g>
        <line className="figure-axis" x1={view.l} x2={view.r} y1={sy(0)} y2={sy(0)} />
        <line className="figure-axis" x1={sx(0)} x2={sx(0)} y1={view.t} y2={view.b} />
        {[1, 2, 3].map((x) => (
          <text key={`tx${x}`} className="figure-tick" x={sx(x)} y={sy(0) + 17} textAnchor="middle">
            {x}
          </text>
        ))}
        {gaps.map((x) => (
          <g key={`g${x}`}>
            <line className="figure-gap" x1={sx(x)} x2={sx(x)} y1={sy(t(x))} y2={sy(f(x))} />
            <text className="figure-gap-label" x={sx(x) + 7} y={(sy(t(x)) + sy(f(x))) / 2 + 4}>
              {(x - 1) ** 2}
            </text>
          </g>
        ))}
        <path className="figure-curve draw" d={curve} pathLength={1} />
        <line className="figure-tangent" x1={sx(-1.4)} y1={sy(t(-1.4))} x2={sx(3.4)} y2={sy(t(3.4))} />
        <circle className="figure-point" cx={sx(1)} cy={sy(1)} r="5" />
        <text className="figure-label figure-label-curve" x={sx(2.55)} y={sy(8.9)}>
          y = x²
        </text>
        <text className="figure-label figure-label-tangent" x={sx(2.2)} y={sy(t(2.2)) + 24}>
          y = 2x − 1
        </text>
      </svg>
      <figcaption>
        {en ? (
          <>
            The vertical gap between the curve and its tangent at <Formula>{"a = 1"}</Formula> equals{" "}
            <Formula>{"(x - 1)^2"}</Formula>: it vanishes only at the point of contact, where it has a double
            root.
          </>
        ) : (
          <>
            მრუდსა და მის მხებს შორის ვერტიკალური მანძილი (შეხების წერტილი <Formula>{"a = 1"}</Formula>) უდრის{" "}
            <Formula>{"(x - 1)^2"}</Formula>-ს: ის ნულდება მხოლოდ შეხების წერტილში, სადაც მას ორმაგი ფესვი აქვს.
          </>
        )}
      </figcaption>
    </figure>
  );
}

/* Two half-steps on the graded monomial scale compose into one step of D. */
export function HalfDerivativeScheme({ locale }: { locale: Locale }) {
  const en = locale === "en";
  return (
    <figure className="essay-figure operator-scheme" data-reveal="draw">
      <div className="operator-canvas">
        <svg viewBox="0 0 600 230" aria-hidden="true" focusable="false">
          <line className="figure-axis" x1="30" x2="570" y1="120" y2="120" />
          <path className="figure-curve draw" d="M90 120 Q195 20 300 120" pathLength={1} />
          <path className="figure-curve draw" d="M300 120 Q405 20 510 120" pathLength={1} />
          <path className="figure-tangent" d="M90 120 Q300 300 510 120" fill="none" />
          {[90, 300, 510].map((x) => (
            <circle key={x} className="figure-point" cx={x} cy="120" r="5" />
          ))}
        </svg>
        <span className="operator-node" style={{ left: "15%" }}>
          <Formula>{"x^{\\beta}"}</Formula>
        </span>
        <span className="operator-node" style={{ left: "50%" }}>
          <Formula>{"x^{\\beta - 1/2}"}</Formula>
        </span>
        <span className="operator-node" style={{ left: "85%" }}>
          <Formula>{"x^{\\beta - 1}"}</Formula>
        </span>
        <span className="operator-label" style={{ left: "32.5%", top: "4%" }}>
          <Formula>{"D^{1/2}:\\ c(\\beta)"}</Formula>
        </span>
        <span className="operator-label" style={{ left: "67.5%", top: "4%" }}>
          <Formula>{"D^{1/2}:\\ c(\\beta - 1/2)"}</Formula>
        </span>
        <span className="operator-label operator-label-green" style={{ left: "50%", top: "86%" }}>
          <Formula>{"D:\\ \\beta"}</Formula>
        </span>
      </div>
      <figcaption>
        {en
          ? "Two half-steps on the graded monomial scale compose into one step of ordinary differentiation; hence the coefficient condition "
          : "გრადუირებულ მონომურ სკალაზე ორი ნახევარი ნაბიჯის კომპოზიცია ჩვეულებრივი დიფერენცირების ერთ ნაბიჯს იძლევა; აქედან კოეფიციენტების პირობა "}
        <Formula>{"c(\\beta)c(\\beta - 1/2)=\\beta"}</Formula>.
      </figcaption>
    </figure>
  );
}
