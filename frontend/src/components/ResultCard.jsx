import React from "react";
import { roleLabel } from "../champions";
import WinrateRing, { formatPercent } from "./WinrateRing";
import { BanIcon, ChartIcon, InfoIcon, RoleIcon, ShieldIcon, SparkIcon, SwordsIcon } from "./Icons";

const clean = (val) => {
  if (val === undefined || val === null) return [];
  const items = Array.isArray(val) ? val : String(val).split(/[;,]/);
  return items.map((s) => String(s).trim()).filter((s) => s && s !== "-1");
};

const hasValue = (val) => val !== undefined && val !== null && String(val).trim() !== "" && val !== "-1";

export default function ResultCard({ result, champions }) {
  if (!result) return null;
  if (result.error) {
    return (
      <div className="panel result-error">
        <InfoIcon size={22} />
        <div>
          <strong>Não deu para prever esse pick</strong>
          <p>{result.error} Tente um dos campeões sugeridos para a posição.</p>
        </div>
      </div>
    );
  }

  const winrate = typeof result.winrate === "number" ? result.winrate : null;
  // Probable defeat when the win rate is below 40%, whatever the model says.
  let isVictory = !!result.vencedor;
  if (winrate !== null && winrate < 0.4) isVictory = false;

  const name = result.displayName || result.champion;
  const role = roleLabel(result.role);
  const sample = hasValue(result.sample_size) ? Number(result.sample_size) : null;
  const kda = result.estatisticas?.kda_medio;

  const groups = [
    { key: "fortes", title: "Pontos fortes", icon: <ShieldIcon size={16} />, items: clean(result.pontos_fortes), tone: "win" },
    { key: "fracos", title: "Pontos fracos", icon: <SwordsIcon size={16} />, items: clean(result.pontos_fracos), tone: "loss" },
    { key: "bans", title: "Banimentos sugeridos", icon: <BanIcon size={16} />, items: clean(result.bans_recomendados), tone: "neutral" },
    { key: "build", title: "Build mais usada", icon: <ChartIcon size={16} />, items: clean(result.estatisticas?.build_mais_usada), tone: "gold" },
  ].filter((g) => g.items.length > 0);

  const winrateText = winrate === null ? "–" : formatPercent(winrate);
  const explanation = `Sua escolha de ${name} no ${role} tem winrate de ${winrateText} em ${sample ?? "–"} ${sample === 1 ? "partida" : "partidas"}.`;

  return (
    <article className="panel result-card">
      <div className="result-banner" style={{ backgroundImage: `url(${champions.splash(result.champion)})` }}>
        <div className="result-banner-content">
          <div className="result-identity">
            {champions.icon(result.champion) && <img className="result-portrait" src={champions.icon(result.champion)} alt="" />}
            <div>
              <h2>{name}</h2>
              <div className="tag-row">
                <span className="tag">
                  <RoleIcon role={result.role} size={14} /> {role}
                </span>
                {result.rankLabel && <span className="tag">{result.rankLabel}</span>}
              </div>
            </div>
          </div>
          <span className={`verdict ${isVictory ? "win" : "loss"}`}>{isVictory ? "Vitória provável" : "Derrota provável"}</span>
        </div>
      </div>

      <div className="result-stats">
        <WinrateRing value={winrate} />
        <div className="stat-grid">
          <div className="stat">
            <span>Partidas analisadas</span>
            <strong>{sample ?? "–"}</strong>
          </div>
          <div className="stat">
            <span>KDA médio</span>
            <strong>{hasValue(kda) && Number(kda) > 0 ? Number(kda).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "–"}</strong>
          </div>
          <div className="stat">
            <span>Elo</span>
            <strong>{result.rankLabel ?? "Todos"}</strong>
          </div>
          <div className="stat">
            <span>Posição</span>
            <strong>{role}</strong>
          </div>
        </div>
      </div>

      <div className="argument">
        <SparkIcon size={18} />
        <p>{explanation}</p>
      </div>

      {sample !== null && sample < 20 && (
        <p className="sample-note">
          <InfoIcon size={14} /> Amostra pequena: trate o resultado como tendência, não como certeza.
        </p>
      )}

      {groups.length > 0 && (
        <div className="insight-grid">
          {groups.map((g) => (
            <section key={g.key} className={`insight insight-${g.tone}`}>
              <h4>
                {g.icon} {g.title}
              </h4>
              {g.items.some((item) => item.length > 40) ? (
                <ul className="insight-list">
                  {g.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                <div className="chip-row">
                  {g.items.map((item) => (
                    <span key={item} className="tag">
                      {item}
                    </span>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      )}
    </article>
  );
}
