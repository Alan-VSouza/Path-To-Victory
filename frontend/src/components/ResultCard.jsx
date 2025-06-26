import React from "react";
import "../styles/ResultCard.css";

export default function ResultCard({ result }) {
  if (!result) return null;
  if (result.error) return <div className="result-card error">{result.error}</div>;

  const winrate = typeof result.winrate === "number" ? result.winrate : null;
  // Derrota provável se winrate < 0.4 (ou seja, 40%)
  let isVictory = !!result.vencedor;
  if (winrate !== null && winrate < 0.4) isVictory = false;

  const show = val =>
    val !== undefined &&
    val !== null &&
    (Array.isArray(val) ? val.length > 0 && val.some(v => v && v !== "-1") : String(val).trim() !== "" && val !== "-1");

  const formatList = val => {
    if (!val) return "";
    if (Array.isArray(val)) return val.filter(v => v && v !== "-1").join(", ");
    return val
      .split(/[;,]/)
      .map(s => s.trim())
      .filter(s => s && s !== "-1")
      .join(", ");
  };

  const formatExplicacao = () => {
    const champ = result.champion || "";
    const role = result.role || "";
    const winrateStr = show(result.winrate) ? (result.winrate * 100).toFixed(1) : "–";
    const partidas = show(result.sample_size) ? result.sample_size : "–";
    return `Sua escolha de ${champ} ${role} tem winrate de ${winrateStr}% em ${partidas} partidas.`;
  };

  return (
    <div className="result-card">
      <h3>{isVictory ? "Vitória provável" : "Derrota provável"}</h3>
      {show(result.winrate) && (
        <p>
          Winrate: <b>{(result.winrate * 100).toFixed(1)}%</b>
          {show(result.sample_size) && ` (${result.sample_size} partidas)`}
        </p>
      )}
      <ul>
        {show(result.pontos_fortes) && (
          <li>
            <b>Pontos fortes:</b> {formatList(result.pontos_fortes)}
          </li>
        )}
        {show(result.pontos_fracos) && (
          <li>
            <b>Pontos fracos:</b> {formatList(result.pontos_fracos)}
          </li>
        )}
        {show(result.bans_recomendados) && (
          <li>
            <b>Banimentos sugeridos:</b> {formatList(result.bans_recomendados)}
          </li>
        )}
        {show(result.ajustes_build) && (
          <li>
            <b>Dicas:</b> {formatList(result.ajustes_build)}
          </li>
        )}
        {show(result.estatisticas?.kda_medio) && (
          <li>
            <b>KDA médio:</b> {result.estatisticas.kda_medio}
          </li>
        )}
        {show(result.estatisticas?.build_mais_usada) && (
          <li>
            <b>Build mais usada:</b> {formatList(result.estatisticas.build_mais_usada)}
          </li>
        )}
      </ul>
      <div className="argumento-ia">{formatExplicacao()}</div>
    </div>
  );
}
