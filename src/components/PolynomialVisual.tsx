"use client";

import { motion, useReducedMotion } from "framer-motion";

export function PolynomialVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="polynomial-visual">
      <div className="visual-caption">
        <span>ორმაგი ფესვი</span>
        <span className="caption-line" />
        <span>მხები</span>
      </div>
      <svg
        viewBox="0 0 620 520"
        role="img"
        aria-labelledby="polynomial-title polynomial-description"
      >
        <title id="polynomial-title">მრავალწევრის გრაფიკი და მხები წრფე</title>
        <desc id="polynomial-description">
          მრუდი და მხები ერთმანეთს მონიშნულ წერტილში ეხება; ორმაგი რგოლი
          ორმაგი ფესვის ალგებრულ პირობას აღნიშნავს.
        </desc>
        <defs>
          <linearGradient id="curveGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--graph-purple)" />
            <stop offset="1" stopColor="var(--graph-purple-strong)" />
          </linearGradient>
          <radialGradient id="pointGlow">
            <stop offset="0" stopColor="var(--graph-point)" stopOpacity=".95" />
            <stop offset=".35" stopColor="var(--graph-green)" stopOpacity=".72" />
            <stop offset="1" stopColor="var(--graph-green)" stopOpacity="0" />
          </radialGradient>
          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="visual-grid">
          {Array.from({ length: 9 }, (_, index) => (
            <line
              key={`v-${index}`}
              x1={70 + index * 60}
              y1="48"
              x2={70 + index * 60}
              y2="454"
            />
          ))}
          {Array.from({ length: 7 }, (_, index) => (
            <line
              key={`h-${index}`}
              x1="48"
              y1={76 + index * 58}
              x2="572"
              y2={76 + index * 58}
            />
          ))}
        </g>

        <line className="axis" x1="48" y1="396" x2="572" y2="396" />
        <line className="axis" x1="126" y1="48" x2="126" y2="454" />

        <motion.path
          className="curve-path"
          d="M54 374 C120 330 174 302 230 289 C300 272 338 257 378 203 C421 145 462 79 560 56"
          fill="none"
          stroke="url(#curveGradient)"
          strokeWidth="5"
          strokeLinecap="round"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: reduceMotion ? 0 : 1.5, ease: "easeInOut" }}
        />
        <motion.line
          x1="98"
          y1="370"
          x2="548"
          y2="92"
          stroke="var(--graph-green)"
          strokeWidth="2.5"
          strokeDasharray="8 8"
          initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.9 }}
          transition={{ duration: reduceMotion ? 0 : 1.15, delay: 0.5 }}
        />

        <motion.circle
          cx="326"
          cy="229"
          r="35"
          fill="url(#pointGlow)"
          animate={
            reduceMotion
              ? undefined
              : { scale: [0.92, 1.08, 0.92], opacity: [0.65, 1, 0.65] }
          }
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "326px 229px" }}
        />
        <circle
          cx="326"
          cy="229"
          r="8"
          fill="var(--graph-point)"
          stroke="var(--graph-purple)"
          strokeWidth="3"
          filter="url(#softGlow)"
        />
        <circle
          cx="326"
          cy="229"
          r="17"
          fill="none"
          stroke="var(--graph-green)"
          strokeWidth="1.5"
          strokeDasharray="3 5"
        />

        <g className="visual-label">
          <rect x="350" y="233" width="132" height="38" rx="19" />
          <text x="416" y="258" textAnchor="middle">
            x = a
          </text>
        </g>
        <text className="line-label" x="463" y="118">
          Tₐ(x)
        </text>
        <text className="curve-label" x="505" y="68">
          f(x)
        </text>
      </svg>
      <div className="visual-equation">
        <span>შეხება</span>
        <strong>⇔</strong>
        <span>(x − a)²</span>
      </div>
    </div>
  );
}
