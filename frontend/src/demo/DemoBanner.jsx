import React from "react";
import { isDemo } from "./setup";

// Small floating note shown only in the public demo build.
export default function DemoBanner() {
  if (!isDemo) return null;
  return (
    <div
      role="note"
      style={{
        position: "fixed", left: 12, bottom: 12, zIndex: 2000, maxWidth: "calc(100vw - 24px)",
        display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap",
        padding: "8px 12px", borderRadius: 999, background: "rgba(8, 12, 24, 0.92)", color: "#e2e8f0",
        font: "500 13px/1.3 Inter, system-ui, sans-serif", boxShadow: "0 6px 24px rgba(0,0,0,.4)", border: "1px solid rgba(232,182,76,.35)",
      }}
    >
      <span>Demo: previsões pré-calculadas pelo modelo</span>
      <a href="https://github.com/Alan-VSouza/Path-To-Victory" target="_blank" rel="noreferrer" style={{ color: "#e8b64c" }}>
        Código
      </a>
    </div>
  );
}
