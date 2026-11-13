import React from "react";
import { LogoMark } from "./Icons";

const tabs = [
  { key: "predict", label: "Previsão" },
  { key: "compare", label: "Comparar" },
  { key: "about", label: "Sobre" },
];

export default function Navbar({ page, setPage }) {
  const go = (target) => {
    setPage(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="nav">
      <div className="nav-inner">
        <button className="brand" onClick={() => go("predict")} aria-label="PathToVictory, ir para a previsão">
          <LogoMark />
          <span className="brand-name">
            Path<span className="accent">To</span>Victory
          </span>
          <span className="brand-badge">Diamante+</span>
        </button>
        <div className="tabs" role="tablist">
          {tabs.map((t) => (
            <button key={t.key} role="tab" aria-selected={page === t.key} className={`tab ${page === t.key ? "active" : ""}`} onClick={() => go(t.key)}>
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
