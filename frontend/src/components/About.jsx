import React from "react";
import { ChartIcon, CpuIcon, DatabaseIcon, GithubIcon, SparkIcon } from "./Icons";

const steps = [
  { icon: <DatabaseIcon size={20} />, title: "Coleta", text: "Partidas ranqueadas Diamante+ buscadas na Riot API." },
  { icon: <ChartIcon size={20} />, title: "Estatísticas", text: "Winrate, KDA, builds e bans agregados por campeão e posição." },
  { icon: <CpuIcon size={20} />, title: "Modelo", text: "Random Forest (scikit-learn) treinado com campeão, posição e elo." },
  { icon: <SparkIcon size={20} />, title: "Previsão", text: "API em Flask devolve a chance de vitória e os argumentos do pick." },
];

const stack = ["React", "Python", "Flask", "pandas", "scikit-learn", "Node.js", "Riot API", "Data Dragon"];

export default function About() {
  return (
    <div className="page">
      <div className="backdrop" aria-hidden="true" />
      <header className="page-header">
        <span className="eyebrow">Sobre o projeto</span>
        <h1>
          Path<span className="accent">To</span>Victory
        </h1>
        <p>
          Uma IA gratuita para League of Legends focada em partidas Diamante+. Ela transforma o histórico de partidas em
          previsões, argumentos e estatísticas para você escolher melhor o seu campeão.
        </p>
      </header>

      <section className="steps">
        {steps.map((s, i) => (
          <div key={s.title} className="panel step">
            <span className="step-index">0{i + 1}</span>
            <span className="step-icon">{s.icon}</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </div>
        ))}
      </section>

      <section className="panel about-footer">
        <div>
          <h3>Tecnologias</h3>
          <div className="chip-row">
            {stack.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
          <p className="muted small">
            Os dados que acompanham o repositório são uma amostra pequena para o app rodar de imediato. Rode o pipeline com
            sua chave da Riot API para coletar um conjunto real e retreinar o modelo.
          </p>
        </div>
        <a href="https://github.com/Alan-VSouza/Path-To-Victory" className="btn btn-primary" target="_blank" rel="noopener noreferrer">
          <GithubIcon /> Ver no GitHub
        </a>
      </section>
    </div>
  );
}
