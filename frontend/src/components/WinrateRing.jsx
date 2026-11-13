import React from "react";

export const formatPercent = (value) =>
  `${(value * 100).toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`;

export const toneOf = (value) => (value === null ? "neutral" : value >= 0.52 ? "win" : value < 0.48 ? "loss" : "even");

/* Circular gauge for a 0..1 win rate. */
export default function WinrateRing({ value, size = 132 }) {
  const stroke = 10;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const pct = value === null ? 0 : Math.max(0, Math.min(1, value));
  return (
    <div className={`ring ring-${toneOf(value)}`} style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} className="ring-track" strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          className="ring-value"
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${circ * pct} ${circ}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div className="ring-label">
        <strong>{value === null ? "–" : formatPercent(value)}</strong>
        <span>winrate</span>
      </div>
    </div>
  );
}
