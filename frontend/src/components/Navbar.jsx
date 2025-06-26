import React from "react";
import "../styles/Navbar.css";

export default function Navbar({ page, setPage }) {
  const handleNav = (targetPage) => {
    setPage(targetPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="nav">
      <div className="logo" onClick={() => handleNav("predict")}>
        <span className="logo-icon">🤖</span>
        <span className="logo-text">
          <span className="logo-main">Path</span>
          <span className="logo-accent">To</span>
          <span className="logo-main">Victory</span>
        </span>
        <span className="logo-badge">IA <span className="elo-badge">Diamante+</span></span>
      </div>
      <ul className="nav-list">
        <li>
          <button className={`nav-btn${page === "predict" ? " active" : ""}`} onClick={() => handleNav("predict")}>Previsão</button>
        </li>
        <li>
          <button className={`nav-btn${page === "compare" ? " active" : ""}`} onClick={() => handleNav("compare")}>Comparar</button>
        </li>
        <li>
          <button className={`nav-btn${page === "about" ? " active" : ""}`} onClick={() => handleNav("about")}>Sobre</button>
        </li>
      </ul>
    </nav>
  );
}
