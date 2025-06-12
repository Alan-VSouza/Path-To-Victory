import React from "react";
import "../styles/Sobre.css";

const Sobre = () => (
  <section className="sobre-hero">
    <div className="sobre-content">
      <h1>
        Sobre o <span className="sobre-logo">PathToVictory</span>
      </h1>
      <p>
        O <strong>PathToVictory</strong> é uma ferramenta gratuita e inteligente para jogadores de League of Legends que querem saber suas chances de vitória antes da partida.
      </p>
      <p>
        Basta informar o campeão e a posição, e nosso sistema prevê se a combinação é <span className="win-text">provável de vencer</span> ou não, usando dados reais de partidas ranqueadas e inteligência artificial.
      </p>
      <p>
        Nosso objetivo é ajudar você a tomar decisões melhores, descobrir novas estratégias e evoluir no jogo!
      </p>
      <a href="https://github.com/seu-usuario/path-to-victory" className="btn-primary" target="_blank" rel="noopener noreferrer">
        Ver no GitHub
      </a>
    </div>
  </section>
);

export default Sobre;
