import React from "react";
import "../styles/About.css";

export default function About() {
  return (
    <section className="about-hero">
      <div className="about-content">
        <h1>Sobre o <span className="about-logo">PathToVictory</span></h1>
        <p>
          <strong>PathToVictory</strong> é uma IA gratuita para League of Legends focada em partidas Diamante+. Receba previsões, argumentos, dicas e estatísticas de alto nível para melhorar seu desempenho.
        </p>
        <a href="https://github.com/Alan-VSouza/Path-To-Victory.git" className="btn-primary" target="_blank" rel="noopener noreferrer">
          Ver no GitHub
        </a>
      </div>
    </section>
  );
}
