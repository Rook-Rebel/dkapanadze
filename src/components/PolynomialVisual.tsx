import type { Locale } from "@/i18n";
import { Formula } from "./Formula";

/*
 * f(x) = x³/6 − x/2 + 1 with its tangent at a = 3/2.
 * f(x) − Tₐ(x) = (1/6)(x − 3/2)²(x + 3), so the line genuinely touches the
 * curve at x = a (a double root) and the drawing is mathematically exact.
 */
const view = { width: 360, height: 250, left: 22, right: 340, top: 18, bottom: 226 };
const domain = { xMin: -2.6, xMax: 3, yMin: -1.9, yMax: 4.2 };
const a = 1.5;

const f = (x: number) => x ** 3 / 6 - x / 2 + 1;
const fPrime = (x: number) => x ** 2 / 2 - 1 / 2;
const tangent = (x: number) => f(a) + fPrime(a) * (x - a);

const sx = (x: number) =>
  view.left + ((x - domain.xMin) / (domain.xMax - domain.xMin)) * (view.right - view.left);
const sy = (y: number) =>
  view.bottom - ((y - domain.yMin) / (domain.yMax - domain.yMin)) * (view.bottom - view.top);

const curvePath = Array.from({ length: 81 }, (_, index) => {
  const x = domain.xMin + (index / 80) * (domain.xMax - domain.xMin);
  return `${index === 0 ? "M" : "L"}${sx(x).toFixed(1)} ${sy(f(x)).toFixed(1)}`;
}).join(" ");

const tangentStart = { x: sx(-1.2), y: sy(tangent(-1.2)) };
const tangentEnd = { x: sx(3), y: sy(tangent(3)) };
const point = { x: sx(a), y: sy(f(a)) };
const gridX = [-2, -1, 0, 1, 2, 3];
const gridY = [-1, 0, 1, 2, 3, 4];

export function PolynomialVisual({ locale }: { locale: Locale }) {
  const en = locale === "en";
  return (
    <figure className="graph-card">
      <svg
        viewBox={`0 0 ${view.width} ${view.height}`}
        role="img"
        aria-labelledby="hero-graph-title hero-graph-desc"
      >
        <title id="hero-graph-title">
          {en ? "A polynomial graph and its tangent line" : "მრავალწევრის გრაფიკი და მისი მხები წრფე"}
        </title>
        <desc id="hero-graph-desc">
          {en
            ? "The line touches the curve at x = a; there the difference between the function and the line has a double root."
            : "წრფე მრუდს x = a წერტილში ეხება; ამ წერტილში ფუნქციისა და წრფის სხვაობას ორმაგი ფესვი აქვს."}
        </desc>
        <g className="graph-grid">
          {gridX.map((x) => (
            <line key={`x${x}`} x1={sx(x)} x2={sx(x)} y1={view.top} y2={view.bottom} />
          ))}
          {gridY.map((y) => (
            <line key={`y${y}`} x1={view.left} x2={view.right} y1={sy(y)} y2={sy(y)} />
          ))}
        </g>
        <line className="graph-axis" x1={view.left} x2={view.right} y1={sy(0)} y2={sy(0)} />
        <line className="graph-axis" x1={sx(0)} x2={sx(0)} y1={view.top} y2={view.bottom} />
        <line
          className="graph-guide"
          x1={point.x}
          x2={point.x}
          y1={point.y}
          y2={sy(0)}
        />
        <path className="graph-curve" d={curvePath} pathLength={1} />
        <line
          className="graph-tangent"
          x1={tangentStart.x}
          y1={tangentStart.y}
          x2={tangentEnd.x}
          y2={tangentEnd.y}
        />
        <circle className="graph-point-ring" cx={point.x} cy={point.y} r="9" />
        <circle className="graph-point" cx={point.x} cy={point.y} r="4" />
        <text className="graph-label graph-label-curve" x={sx(2.05)} y={sy(3.45)}>
          f(x)
        </text>
        <text className="graph-label graph-label-tangent" x={sx(2.35)} y={sy(tangent(2.35)) + 22}>
          Tₐ(x)
        </text>
        <text className="graph-label graph-label-axis" x={point.x} y={sy(0) + 17} textAnchor="middle">
          a
        </text>
      </svg>
      <figcaption>
        <span>{en ? "Tangency" : "შეხება"}</span>
        <span aria-hidden="true">⇔</span>
        <span className="sr-only">{en ? "is equivalent to the factor" : "ტოლფასია მამრავლისა"}</span>
        <Formula>{"(x-a)^2"}</Formula>
      </figcaption>
    </figure>
  );
}
