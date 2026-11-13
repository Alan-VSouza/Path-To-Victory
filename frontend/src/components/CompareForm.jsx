import React, { useState } from "react";
import { compareChampions } from "../Api";
import { roleLabel } from "../champions";
import { ChampionInput } from "./ChampionPicker";
import RoleSelect from "./RoleSelect";
import Backdrop from "./Backdrop";
import { formatPercent } from "./WinrateRing";
import { InfoIcon, SwordsIcon } from "./Icons";

const winrateOf = (result, champ) => {
  const value = result?.[champ]?.winrate;
  return typeof value === "number" ? value : null;
};

function verdictOf(w1, w2, name1, name2) {
  if (w1 === null || w2 === null) {
    return "Não há dados suficientes dos dois campeões nessa posição para comparar.";
  }
  if (w1 === w2) return "Os dois campeões têm o mesmo winrate nessa posição.";
  const best = w1 > w2 ? name1 : name2;
  return `${best} compensa mais: winrate de ${formatPercent(Math.max(w1, w2))} contra ${formatPercent(Math.min(w1, w2))}.`;
}

export default function CompareForm({ champions }) {
  const [champion1, setChampion1] = useState("");
  const [champion2, setChampion2] = useState("");
  const [position, setPosition] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const m1 = champions.find(champion1);
  const m2 = champions.find(champion2);

  async function handleCompare(e) {
    e.preventDefault();
    if (!position) {
      setFormError("Escolha a posição para comparar.");
      return;
    }
    setFormError("");
    setLoading(true);
    setResult(null);
    const sides = [
      { key: m1 ? m1.id : champion1.trim(), name: m1?.name ?? champion1.trim() },
      { key: m2 ? m2.id : champion2.trim(), name: m2?.name ?? champion2.trim() },
    ];
    try {
      const res = await compareChampions({ champion1: sides[0].key, champion2: sides[1].key, position });
      setResult({ data: res, sides, position });
    } catch {
      setResult({ error: "Não foi possível comparar agora. Verifique se a API está rodando." });
    }
    setLoading(false);
  }

  const w = result?.data ? result.sides.map((s) => winrateOf(result.data, s.key)) : [];
  const leader = w.length && w[0] !== null && w[1] !== null && w[0] !== w[1] ? (w[0] > w[1] ? 0 : 1) : -1;

  return (
    <div className="page">
      <Backdrop src={m1 ? champions.splash(m1.id) : m2 ? champions.splash(m2.id) : null} />
      <header className="page-header">
        <span className="eyebrow">
          <SwordsIcon size={14} /> Comparar campeões
        </span>
        <h1>Qual dos dois rende mais na sua rota?</h1>
        <p>Coloque dois campeões frente a frente na mesma posição e veja quem tem o melhor winrate nas partidas analisadas.</p>
      </header>

      <form className="panel compare-form" onSubmit={handleCompare}>
        <div className="versus-row">
          <ChampionInput id="cmp-1" label="Campeão 1" value={champion1} onChange={setChampion1} champions={champions} placeholder="Ex.: Renekton" />
          <span className="vs-badge">VS</span>
          <ChampionInput id="cmp-2" label="Campeão 2" value={champion2} onChange={setChampion2} champions={champions} placeholder="Ex.: Gnar" />
        </div>
        <RoleSelect value={position} onChange={setPosition} />
        {formError && <div className="alert">{formError}</div>}
        <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
          {loading ? "Comparando..." : "Comparar"}
        </button>
      </form>

      {result?.error && <div className="panel result-error">{result.error}</div>}

      {result?.data && (
        <section className="compare-result" aria-label="Resultado da comparação">
          <div className="duel">
            {result.sides.map((side, i) => (
              <div key={side.key} className={`duel-card ${leader === i ? "leader" : ""}`}>
                <div className="duel-art" style={{ backgroundImage: `url(${champions.splash(side.key)})` }} />
                <div className="duel-body">
                  {leader === i && <span className="leader-badge">Melhor escolha</span>}
                  <div className="row">
                    {champions.icon(side.key) && <img className="duel-portrait" src={champions.icon(side.key)} alt="" />}
                    <div>
                      <h3>{side.name}</h3>
                      <span className="muted">{roleLabel(result.position)}</span>
                    </div>
                  </div>
                  <div className="duel-value">{w[i] === null ? "sem dados para essa posição" : formatPercent(w[i])}</div>
                  <div className="bar">
                    <span style={{ width: `${(w[i] ?? 0) * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="argument">
            <InfoIcon size={18} />
            <p>{verdictOf(w[0], w[1], result.sides[0].name, result.sides[1].name)}</p>
          </div>
        </section>
      )}
    </div>
  );
}
