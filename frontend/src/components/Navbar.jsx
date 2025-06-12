import React, { useState, useEffect } from 'react';
import '../styles/Navbar.css';

export default function Navbar({ setPage, page }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuActive, setMenuActive] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="/" className="logo">
        <span className="logo-icon">🏆</span>
        <span className="logo-text">
          <span className="logo-main">Path</span>
          <span className="logo-accent">To</span>
          <span className="logo-main">Victory</span>
        </span>
      </a>
      <div className={`mobile-menu ${menuActive ? 'active' : ''}`} onClick={() => setMenuActive(!menuActive)}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
      <ul className={`nav-list ${menuActive ? 'active' : ''}`}>
        <li>
          <button
            className={`nav-btn${page === 'predict' ? ' active' : ''}`}
            onClick={() => setPage('predict')}
          >
            Busca
          </button>
        </li>
        <li>
          <button
            className={`nav-btn${page === 'sobre' ? ' active' : ''}`}
            onClick={() => setPage('sobre')}
          >
            Sobre
          </button>
        </li>
      </ul>
    </nav>
  );
}
