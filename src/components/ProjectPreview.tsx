/*
 * Small, accurate mathematical previews for the external projects.
 * Computed at render time on the server; no client JavaScript.
 */

const W = 320;
const H = 150;
const pad = { l: 26, r: 10, t: 12, b: 22 };

/* Goldbach "comet": r(n) = number of ways to write an even n as p + q, p ≤ q prime. */
function goldbachPoints(limit: number) {
  const sieve = new Array<boolean>(limit + 1).fill(true);
  sieve[0] = sieve[1] = false;
  for (let i = 2; i * i <= limit; i += 1) {
    if (sieve[i]) for (let j = i * i; j <= limit; j += i) sieve[j] = false;
  }
  const points: Array<{ n: number; r: number }> = [];
  for (let n = 4; n <= limit; n += 2) {
    let r = 0;
    for (let p = 2; p <= n / 2; p += 1) if (sieve[p] && sieve[n - p]) r += 1;
    points.push({ n, r });
  }
  return points;
}

const goldbach = goldbachPoints(500);
const goldbachMax = Math.max(...goldbach.map((p) => p.r));

function Goldbach() {
  const sx = (n: number) => pad.l + ((n - 4) / (500 - 4)) * (W - pad.l - pad.r);
  const sy = (r: number) => H - pad.b - (r / (goldbachMax + 1)) * (H - pad.t - pad.b);
  return (
    <>
      <line className="preview-axis" x1={pad.l} x2={W - pad.r} y1={H - pad.b} y2={H - pad.b} />
      <line className="preview-axis" x1={pad.l} x2={pad.l} y1={pad.t} y2={H - pad.b} />
      {goldbach.map((p) => (
        <circle key={p.n} className="preview-dot" cx={sx(p.n)} cy={sy(p.r)} r="1.5" />
      ))}
      <text className="preview-label" x={W - pad.r} y={H - 6} textAnchor="end">
        n
      </text>
      <text className="preview-label" x={4} y={pad.t + 8}>
        r(n)
      </text>
    </>
  );
}

/* Tangent to y = x² at a = 0.8, with its slope triangle (run 0.6, rise 2a·0.6). */
function TangentPreview() {
  const xMin = -2;
  const xMax = 2;
  const yMin = -1;
  const yMax = 4.2;
  const sx = (x: number) => pad.l + ((x - xMin) / (xMax - xMin)) * (W - pad.l - pad.r);
  const sy = (y: number) => H - pad.b - ((y - yMin) / (yMax - yMin)) * (H - pad.t - pad.b);
  const a = 0.8;
  const t = (x: number) => 2 * a * x - a * a;
  const curve = Array.from({ length: 61 }, (_, i) => {
    const x = xMin + (i / 60) * (xMax - xMin);
    return `${i === 0 ? "M" : "L"}${sx(x).toFixed(1)} ${sy(x * x).toFixed(1)}`;
  }).join(" ");
  const run = 0.6;
  return (
    <>
      <line className="preview-axis" x1={pad.l} x2={W - pad.r} y1={sy(0)} y2={sy(0)} />
      <line className="preview-axis" x1={sx(0)} x2={sx(0)} y1={pad.t} y2={H - pad.b} />
      <path className="preview-curve" d={curve} />
      <line className="preview-tangent" x1={sx(-0.4)} y1={sy(t(-0.4))} x2={sx(2)} y2={sy(t(2))} />
      <path
        className="preview-triangle"
        d={`M${sx(a)} ${sy(t(a))} H${sx(a + run)} V${sy(t(a + run))}`}
      />
      <circle className="preview-point" cx={sx(a)} cy={sy(a * a)} r="3.5" />
      <text className="preview-label" x={sx(1.62)} y={sy(3.5)}>
        x²
      </text>
    </>
  );
}

export function ProjectPreview({ index, label }: { index: number; label: string }) {
  return (
    <figure className="project-preview">
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label}>
        {index === 0 ? <Goldbach /> : <TangentPreview />}
      </svg>
    </figure>
  );
}
