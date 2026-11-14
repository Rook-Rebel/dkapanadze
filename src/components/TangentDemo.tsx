"use client";

import { useMemo, useState } from "react";
import { Formula } from "./Formula";
import type { Locale } from "@/i18n";

const graph = {
  left: 46,
  top: 24,
  width: 568,
  height: 344,
  xMin: -3,
  xMax: 3,
  yMin: -2,
  yMax: 9,
};

function mapX(x: number) {
  return graph.left + ((x - graph.xMin) / (graph.xMax - graph.xMin)) * graph.width;
}

function mapY(y: number) {
  return graph.top + graph.height - ((y - graph.yMin) / (graph.yMax - graph.yMin)) * graph.height;
}

/** Exact decimal formatting for the slider's quarter steps (e.g. 1.25² = 1.5625). */
function formatNumber(value: number) {
  const rounded = Math.round(value * 10000) / 10000;
  return Object.is(rounded, -0) ? "0" : String(rounded);
}

/** LaTeX for m·x + c with natural signs: "2.5x - 1.5625", "-x - 0.25", "0". */
function linearLatex(m: number, c: number) {
  const slope =
    m === 0 ? "" : m === 1 ? "x" : m === -1 ? "-x" : `${formatNumber(m)}x`;
  if (c === 0) return slope || "0";
  if (!slope) return formatNumber(c);
  return `${slope} ${c < 0 ? "-" : "+"} ${formatNumber(Math.abs(c))}`;
}

export function TangentDemo({ locale }: { locale: Locale }) {
  const [a, setA] = useState(1);
  const en = locale === "en";

  const curvePath = useMemo(
    () =>
      Array.from({ length: 121 }, (_, index) => {
        const x = graph.xMin + (index / 120) * (graph.xMax - graph.xMin);
        return `${index === 0 ? "M" : "L"} ${mapX(x).toFixed(2)} ${mapY(x * x).toFixed(2)}`;
      }).join(" "),
    [],
  );

  const slope = 2 * a;
  const constant = -(a * a);
  const tangent = (x: number) => slope * x + constant;
  const tangentPath = `M ${mapX(graph.xMin)} ${mapY(tangent(graph.xMin))} L ${mapX(graph.xMax)} ${mapY(tangent(graph.xMax))}`;
  const pointX = mapX(a);
  const pointY = mapY(a * a);
  const aText = formatNumber(a);
  // Typographic minus sign for text set outside KaTeX.
  const aDisplay = a < 0 ? `−${formatNumber(-a)}` : aText;
  const tangentExpression = linearLatex(slope, constant);
  const tangentLatex = `T_{${aText}}(x) = ${tangentExpression}`;
  const factor = a === 0 ? "x^2" : `(x ${a < 0 ? "+" : "-"} ${formatNumber(Math.abs(a))})^2`;
  const difference =
    a === 0 ? "x^2 - 0 = x^2" : `x^2 - (${tangentExpression}) = ${factor}`;
  const labelOnLeft = a > 1.25;

  return (
    <section className="tangent-demo" aria-labelledby="tangent-demo-title" data-reveal>
      <div className="demo-header">
        <div>
          <p className="eyebrow">{en ? "Working demonstration" : "სამუშაო დემონსტრაცია"}</p>
          <h2 id="tangent-demo-title" className="section-title">
            {en ? "Tangent and double root" : "მხები და ორმაგი ფესვი"}
          </h2>
          <p className="section-description">
            {en
              ? "Move the point of contact. The graph, the tangent, and the algebraic factorisation update together."
              : "შეცვალეთ შეხების წერტილი. გრაფიკი, მხები და ალგებრული ფაქტორიზაცია ერთდროულად განახლდება."}
          </p>
        </div>
        <div className="demo-function">
          <span>{en ? "Function" : "ფუნქცია"}</span>
          <Formula>{"f(x) = x^2"}</Formula>
        </div>
      </div>

      <div className="demo-grid">
        <div className="demo-graph">
          <svg
            viewBox="0 0 660 400"
            role="img"
            aria-label={
              en
                ? `Graph of f(x) = x² with its tangent line at a = ${aText}`
                : `f(x) = x² ფუნქციის გრაფიკი და მხები წრფე წერტილში a = ${aText}`
            }
          >
            <defs>
              <clipPath id="tangent-demo-plot">
                <rect x={graph.left} y={graph.top} width={graph.width} height={graph.height} />
              </clipPath>
            </defs>
            <g className="demo-grid-lines" aria-hidden="true">
              {[-3, -2, -1, 0, 1, 2, 3].map((x) => (
                <line key={`x-${x}`} x1={mapX(x)} y1={graph.top} x2={mapX(x)} y2={graph.top + graph.height} />
              ))}
              {[-2, 0, 2, 4, 6, 8].map((y) => (
                <line key={`y-${y}`} x1={graph.left} y1={mapY(y)} x2={graph.left + graph.width} y2={mapY(y)} />
              ))}
            </g>
            <g className="demo-ticks" aria-hidden="true">
              {[-2, -1, 1, 2].map((x) => (
                <text key={`tx-${x}`} x={mapX(x)} y={mapY(0) + 18} textAnchor="middle">
                  {x < 0 ? `−${Math.abs(x)}` : x}
                </text>
              ))}
              {[2, 4, 6, 8].map((y) => (
                <text key={`ty-${y}`} x={mapX(0) - 10} y={mapY(y) + 4} textAnchor="end">
                  {y}
                </text>
              ))}
            </g>
            <line className="demo-axis" x1={graph.left} y1={mapY(0)} x2={graph.left + graph.width} y2={mapY(0)} />
            <line className="demo-axis" x1={mapX(0)} y1={graph.top} x2={mapX(0)} y2={graph.top + graph.height} />
            <g clipPath="url(#tangent-demo-plot)">
              <path className="demo-curve" d={curvePath} />
              <path className="demo-tangent" d={tangentPath} />
            </g>
            <circle className="demo-point-ring" cx={pointX} cy={pointY} r="13" />
            <circle className="demo-point" cx={pointX} cy={pointY} r="5.5" />
            <text
              className="demo-label"
              x={labelOnLeft ? pointX - 14 : pointX + 14}
              y={pointY - 14}
              textAnchor={labelOnLeft ? "end" : "start"}
            >
              ({aDisplay}, {formatNumber(a * a)})
            </text>
          </svg>
        </div>

        <div className="demo-controls">
          <div className="demo-slider">
            <label htmlFor="point-a">
              {en ? "Point of contact" : "შეხების წერტილი"}
              <output htmlFor="point-a" className="demo-value" dir="ltr">
                a = {aDisplay}
              </output>
            </label>
            <input
              id="point-a"
              type="range"
              min="-2"
              max="2"
              step="0.25"
              value={a}
              aria-valuetext={`a = ${aText}`}
              onChange={(event) => setA(Number(event.target.value))}
            />
            <span className="range-labels" aria-hidden="true">
              <i>−2</i>
              <i>0</i>
              <i>2</i>
            </span>
          </div>
          <div className="demo-equation">
            <span>{en ? "Tangent line" : "მხები წრფე"}</span>
            <Formula display>{tangentLatex}</Formula>
            <p className="demo-slope">
              {en ? "Slope at the point:" : "დახრილობა წერტილში:"}{" "}
              <Formula>{`2a = ${formatNumber(slope)}`}</Formula>
            </p>
          </div>
          <div className="demo-equation demo-equation-accent">
            <span>{en ? "Algebraic difference" : "ალგებრული სხვაობა"}</span>
            <Formula display>{difference}</Formula>
            <p>
              {en ? "The difference contains the factor " : "სხვაობა შეიცავს მამრავლს "}
              <Formula>{"(x - a)^2"}</Formula>
              {en ? ", so " : ", ამიტომ "}
              <Formula>{`x = ${aText}`}</Formula>
              {en ? " is a double root." : " ორმაგი ფესვია."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
