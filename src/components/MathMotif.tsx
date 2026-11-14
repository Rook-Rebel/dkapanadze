import type { JSX } from "react";

/*
 * Low-contrast mathematical line drawings used as structural ornaments.
 * Every motif depicts an actual construction (a double root touching an
 * axis, a tangent perpendicular to a radius, composed half-steps), so the
 * decoration stays meaningful. All are aria-hidden: they carry no content.
 */

type Point = { x: number; y: number };

function polyline(points: Point[]) {
  return points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
}

/* --------------------------------------------------------------------------
   Hero background: f(x) = 0.06x³ − 0.6x with its tangent at a = 0.35,
   drawn across the whole hero. Affine stretching preserves tangency, so
   preserveAspectRatio="none" keeps the construction exact.
   -------------------------------------------------------------------------- */
const hero = { w: 1440, h: 760, xMin: -5, xMax: 5, yMin: -5.4, yMax: 5.4 };
const heroF = (x: number) => 0.06 * x ** 3 - 0.6 * x;
const heroDf = (x: number) => 0.18 * x ** 2 - 0.6;
const heroA = 0.35;
const hx = (x: number) => ((x - hero.xMin) / (hero.xMax - hero.xMin)) * hero.w;
const hy = (y: number) => hero.h - ((y - hero.yMin) / (hero.yMax - hero.yMin)) * hero.h;
const heroCurve = polyline(
  Array.from({ length: 121 }, (_, i) => {
    const x = hero.xMin + (i / 120) * (hero.xMax - hero.xMin);
    return { x: hx(x), y: hy(heroF(x)) };
  }),
);
const heroTangent = (x: number) => heroF(heroA) + heroDf(heroA) * (x - heroA);

export function HeroMotif() {
  const ticks = Array.from({ length: 19 }, (_, i) => hero.xMin + (i + 1) * 0.5);
  return (
    <svg
      className="motif motif-hero"
      viewBox={`0 0 ${hero.w} ${hero.h}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <line className="motif-axis" x1="0" x2={hero.w} y1={hy(0)} y2={hy(0)} />
      {ticks.map((t) => (
        <line key={t} className="motif-axis" x1={hx(t)} x2={hx(t)} y1={hy(0) - 5} y2={hy(0) + 5} />
      ))}
      <path className="motif-line motif-draw" d={heroCurve} pathLength={1} />
      <line
        className="motif-line-green"
        x1={hx(-2.6)}
        y1={hy(heroTangent(-2.6))}
        x2={hx(3.4)}
        y2={hy(heroTangent(3.4))}
      />
      <circle className="motif-point" cx={hx(heroA)} cy={hy(heroF(heroA))} r="4" />
    </svg>
  );
}

/* --------------------------------------------------------------------------
   Section divider: an axis with ticks and a parabola touching it at one
   point — a double root, the central object of the research.
   -------------------------------------------------------------------------- */
export function MathDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`math-divider ${className}`.trim()} aria-hidden="true">
      <svg viewBox="0 0 160 40" focusable="false">
        <line className="motif-axis" x1="0" x2="160" y1="30" y2="30" />
        {[20, 40, 60, 100, 120, 140].map((x) => (
          <line key={x} className="motif-axis" x1={x} x2={x} y1="27" y2="33" />
        ))}
        <path className="motif-line" d="M44 4 Q80 56 116 4" />
        <circle className="motif-point" cx="80" cy="30" r="2.6" />
      </svg>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Page-header constructions (right-hand side of page headers, desktop only).
   -------------------------------------------------------------------------- */
export type HeaderMotifName = "tangent" | "parabola" | "operator" | "steps" | "axes";

function TangentConstruction() {
  // Circle, radius to the point of contact, and the tangent perpendicular to it.
  const c = { x: 190, y: 150 };
  const r = 92;
  const angle = (-50 * Math.PI) / 180;
  const p = { x: c.x + r * Math.cos(angle), y: c.y + r * Math.sin(angle) };
  const dir = { x: -Math.sin(angle), y: Math.cos(angle) };
  const len = 150;
  const marker = 12;
  const u = { x: Math.cos(angle), y: Math.sin(angle) };
  const corner = [
    { x: p.x - u.x * marker, y: p.y - u.y * marker },
    { x: p.x - u.x * marker + dir.x * marker, y: p.y - u.y * marker + dir.y * marker },
    { x: p.x + dir.x * marker, y: p.y + dir.y * marker },
  ];
  return (
    <>
      <circle className="motif-line motif-draw" cx={c.x} cy={c.y} r={r} pathLength={1} />
      <line className="motif-axis" x1={c.x} y1={c.y} x2={p.x} y2={p.y} strokeDasharray="4 5" />
      <line
        className="motif-line-green"
        x1={p.x - dir.x * len}
        y1={p.y - dir.y * len}
        x2={p.x + dir.x * len}
        y2={p.y + dir.y * len}
      />
      <path className="motif-axis" d={polyline(corner)} fill="none" />
      <circle className="motif-point" cx={p.x} cy={p.y} r="4" />
      <circle className="motif-axis-dot" cx={c.x} cy={c.y} r="2.5" />
    </>
  );
}

function ParabolaGap() {
  // y = x² with its tangent at a = 1; dashed segments show the gap (x − 1)².
  const sx = (x: number) => 40 + ((x + 1.3) / 4.6) * 300;
  const sy = (y: number) => 270 - ((y + 3.5) / 13) * 250;
  const curve = polyline(
    Array.from({ length: 61 }, (_, i) => {
      const x = -1.3 + (i / 60) * 4.6;
      return { x: sx(x), y: sy(x * x) };
    }),
  );
  const t = (x: number) => 2 * x - 1;
  return (
    <>
      <line className="motif-axis" x1="30" x2="350" y1={sy(0)} y2={sy(0)} />
      <path className="motif-line motif-draw" d={curve} pathLength={1} />
      <line className="motif-line-green" x1={sx(-1.2)} y1={sy(t(-1.2))} x2={sx(3.2)} y2={sy(t(3.2))} />
      {[-1, 0, 2, 3].map((x) => (
        <line key={x} className="motif-gap" x1={sx(x)} x2={sx(x)} y1={sy(t(x))} y2={sy(x * x)} />
      ))}
      <circle className="motif-point" cx={sx(1)} cy={sy(1)} r="4" />
    </>
  );
}

function OperatorArcs() {
  // Two half-steps composing into one full step.
  const nodes = [70, 190, 310];
  const y = 160;
  return (
    <>
      <line className="motif-axis" x1="30" x2="350" y1={y} y2={y} />
      <path className="motif-line motif-draw" d={`M${nodes[0]} ${y} Q130 70 ${nodes[1]} ${y}`} pathLength={1} />
      <path className="motif-line motif-draw" d={`M${nodes[1]} ${y} Q250 70 ${nodes[2]} ${y}`} pathLength={1} />
      <path className="motif-line-green" d={`M${nodes[0]} ${y} Q190 290 ${nodes[2]} ${y}`} fill="none" />
      {nodes.map((x) => (
        <circle key={x} className="motif-point" cx={x} cy={y} r="4" />
      ))}
    </>
  );
}

function SequenceSteps() {
  // Seven points rising along a curve: the learning sequence.
  const pts = Array.from({ length: 7 }, (_, i) => {
    const x = 50 + i * 47;
    const y = 250 - 200 * Math.sqrt(i / 6);
    return { x, y };
  });
  return (
    <>
      <path className="motif-line motif-draw" d={polyline(pts)} pathLength={1} />
      {pts.map((p, i) => (
        <g key={i}>
          <line className="motif-axis" x1={p.x} x2={p.x} y1={p.y} y2="262" strokeDasharray="3 5" />
          <circle className="motif-point" cx={p.x} cy={p.y} r="4" />
        </g>
      ))}
      <line className="motif-axis" x1="30" x2="350" y1="262" y2="262" />
    </>
  );
}

function AxesGrid() {
  return (
    <>
      {Array.from({ length: 8 }, (_, i) => (
        <line key={`v${i}`} className="motif-grid" x1={40 + i * 44} x2={40 + i * 44} y1="20" y2="280" />
      ))}
      {Array.from({ length: 6 }, (_, i) => (
        <line key={`h${i}`} className="motif-grid" x1="30" x2="350" y1={30 + i * 50} y2={30 + i * 50} />
      ))}
      <line className="motif-axis" x1="30" x2="350" y1="230" y2="230" />
      <line className="motif-axis" x1="84" x2="84" y1="20" y2="280" />
      <path className="motif-line motif-draw" d="M40 262 C120 250 170 200 210 150 S300 60 344 40" pathLength={1} />
    </>
  );
}

const headerMotifs: Record<HeaderMotifName, () => JSX.Element> = {
  tangent: TangentConstruction,
  parabola: ParabolaGap,
  operator: OperatorArcs,
  steps: SequenceSteps,
  axes: AxesGrid,
};

export function HeaderMotif({ name }: { name: HeaderMotifName }) {
  const Motif = headerMotifs[name];
  return (
    <svg className="motif motif-header" viewBox="0 0 380 300" aria-hidden="true" focusable="false">
      <Motif />
    </svg>
  );
}
