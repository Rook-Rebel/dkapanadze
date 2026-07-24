"use client";

import { useMemo, useState } from "react";
import { Formula } from "./Formula";

const graph = {
  left: 46,
  top: 28,
  width: 568,
  height: 344,
  xMin: -3,
  xMax: 3,
  yMin: -2,
  yMax: 9,
};

function mapX(x: number) {
  return (
    graph.left +
    ((x - graph.xMin) / (graph.xMax - graph.xMin)) * graph.width
  );
}

function mapY(y: number) {
  return (
    graph.top +
    graph.height -
    ((y - graph.yMin) / (graph.yMax - graph.yMin)) * graph.height
  );
}

function formatNumber(value: number) {
  if (Object.is(value, -0)) return "0";
  return Number.isInteger(value) ? String(value) : value.toFixed(2).replace(/0+$/, "");
}

export function TangentDemo() {
  const [a, setA] = useState(1);
  const curvePath = useMemo(() => {
    return Array.from({ length: 121 }, (_, index) => {
      const x = graph.xMin + (index / 120) * (graph.xMax - graph.xMin);
      return `${index === 0 ? "M" : "L"} ${mapX(x).toFixed(2)} ${mapY(x * x).toFixed(2)}`;
    }).join(" ");
  }, []);

  const tangent = (x: number) => 2 * a * x - a * a;
  const tangentPath = `M ${mapX(graph.xMin)} ${mapY(tangent(graph.xMin))} L ${mapX(graph.xMax)} ${mapY(tangent(graph.xMax))}`;
  const pointX = mapX(a);
  const pointY = mapY(a * a);
  const aText = formatNumber(a);
  const slopeText = formatNumber(2 * a);
  const constantText = formatNumber(-(a * a));
  const tangentLatex = `T_{${aText}}(x) = ${slopeText}x ${Number(constantText) < 0 ? constantText : `+ ${constantText}`}`;
  const differenceLatex = `x^2 - (${slopeText}x ${Number(constantText) < 0 ? constantText : `+ ${constantText}`}) = (x - ${aText})^2`;

  return (
    <section className="tangent-demo" aria-labelledby="tangent-demo-title">
      <div className="demo-header">
        <div>
          <p className="eyebrow">სამუშაო დემონსტრაცია</p>
          <h2 id="tangent-demo-title">მხები და ორმაგი ფესვი</h2>
          <p>
            შეცვალეთ შეხების წერტილი. გრაფიკი, მხები და ალგებრული ფაქტორიზაცია
            ერთდროულად განახლდება.
          </p>
        </div>
        <div className="demo-function">
          <span>ფუნქცია</span>
          <Formula display>{"f(x) = x^2"}</Formula>
        </div>
      </div>

      <div className="demo-grid">
        <div className="demo-graph">
          <svg
            viewBox="0 0 660 410"
            role="img"
            aria-label={`ეფ იქსი უდრის იქს კვადრატს და მხები წერტილში ა უდრის ${aText}`}
          >
            <g className="demo-grid-lines" aria-hidden="true">
              {[-3, -2, -1, 0, 1, 2, 3].map((x) => (
                <line
                  key={`x-${x}`}
                  x1={mapX(x)}
                  y1={graph.top}
                  x2={mapX(x)}
                  y2={graph.top + graph.height}
                />
              ))}
              {[0, 2, 4, 6, 8].map((y) => (
                <line
                  key={`y-${y}`}
                  x1={graph.left}
                  y1={mapY(y)}
                  x2={graph.left + graph.width}
                  y2={mapY(y)}
                />
              ))}
            </g>
            <line
              className="demo-axis"
              x1={graph.left}
              y1={mapY(0)}
              x2={graph.left + graph.width}
              y2={mapY(0)}
            />
            <line
              className="demo-axis"
              x1={mapX(0)}
              y1={graph.top}
              x2={mapX(0)}
              y2={graph.top + graph.height}
            />
            <path className="demo-curve" d={curvePath} />
            <path className="demo-tangent" d={tangentPath} />
            <circle className="demo-point-glow" cx={pointX} cy={pointY} r="18" />
            <circle className="demo-point" cx={pointX} cy={pointY} r="6" />
            <text className="demo-label" x={pointX + 12} y={pointY - 12}>
              ({aText}, {formatNumber(a * a)})
            </text>
          </svg>
        </div>

        <div className="demo-controls">
          <label htmlFor="point-a">
            <span>
              შეხების წერტილი{" "}
              <strong className="math-inline" dir="ltr">
                a = {aText}
              </strong>
            </span>
            <input
              id="point-a"
              type="range"
              min="-2"
              max="2"
              step="0.25"
              value={a}
              onChange={(event) => setA(Number(event.target.value))}
            />
            <span className="range-labels" aria-hidden="true">
              <i>−2</i>
              <i>0</i>
              <i>2</i>
            </span>
          </label>
          <div className="demo-equation">
            <span>მხები წრფე</span>
            <Formula display>{tangentLatex}</Formula>
          </div>
          <div className="demo-equation demo-equation-accent">
            <span>ალგებრული სხვაობა</span>
            <Formula display>{differenceLatex}</Formula>
            <p>
              სხვაობა შეიცავს{" "}
              <strong className="math-inline" dir="ltr">
                (x − a)²
              </strong>{" "}
              ფაქტორს — ამიტომ <span className="math-inline">x = a</span> ორმაგი
              ფესვია.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
