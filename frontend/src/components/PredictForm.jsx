import React, { useState } from "react";
import { predictChampion } from "../Api";
import { SAMPLE_PICKS, roleLabel } from "../champions";
import { ChampionInput } from "./ChampionPicker";
import RoleSelect from "./RoleSelect";
import ResultCard from "./ResultCard";
import Backdrop from "./Backdrop";
import { SparkIcon } from "./Icons";

// Only ranks the bundled model was trained with (see columns.pkl); "" sends no rank.
const RANKS = [
  { value: "", label: "Qualquer elo" },
  { value: "GRANDMASTER I", label: "Grão-Mestre" },
  { value: "MASTER I", label: "Mestre" },
  { value: "DIAMOND I", label: "Diamante I" },
  { value: "DIAMOND II", label: "Diamante II" },
  { value: "DIAMOND III", label: "Diamante III" },
  { value: "EMERALD IV", label: "Esmeralda IV" },
  { value: "GOLD II", label: "Ouro II" },
  { value: "SILVER II", label: "Prata II" },
  { value: "BRONZE I", label: "Bronze I" },
  { value: "BRONZE III", label: "Bronze III" },
  { value: "IRON II", label: "Ferro II" },
  { value: "UNRANKED", label: "Sem ranque" },
];

export default function PredictForm({ champions }) {
  const [champion, setChampion] = useState("");
  const [role, setRole] = useState("");
  const [rank, setRank] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [formError, setFormError] = useState("");

  const match = champions.find(champion);
  const rankLabel = RANKS.find((r) => r.value === rank)?.label;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!role) {
      setFormError("Escolha a posição do campeão.");
      return;
    }
    setFormError("");
    setLoading(true);

    const payload = {
      // Send the Data Dragon id when the name is recognised ("Kai'Sa" -> "Kaisa"), which is what the dataset uses.
      champion: match ? match.id : champion.trim(),
      role,
      rank: rank.trim(),
      kills: 0,
      deaths: 0,
      assists: 0,
    };

    try {
      const res = await predictChampion(payload);
      setResult({ ...res, displayName: match?.name ?? res.champion, rankLabel: rank ? rankLabel : null });
    } catch (err) {
      setResult({ error: err.message || "Erro ao prever. Tente novamente." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <Backdrop src={match ? champions.splash(match.id) : null} />
      <header className="page-header">
        <span className="eyebrow">
          <SparkIcon size={14} /> Previsão com IA
        </span>
        <h1>Seu pick tem caminho para a vitória?</h1>
        <p>
          Informe o campeão, a posição e o elo. O modelo cruza o histórico de partidas ranqueadas e devolve a chance de
          vitória e o que observar.
        </p>
      </header>

      <div className="predict-layout">
        <form className="panel form-panel" onSubmit={handleSubmit}>
          <ChampionInput id="predict-champion" label="Campeão" value={champion} onChange={setChampion} champions={champions} />
          <RoleSelect value={role} onChange={setRole} />
          {role && (
            <div className="field">
              <span className="field-label">Com dados na amostra · {roleLabel(role)}</span>
              <div className="chip-row">
                {SAMPLE_PICKS[role].map((id) => {
                  const c = champions.find(id);
                  const icon = champions.icon(id);
                  return (
                    <button type="button" key={id} className="pick-chip" onClick={() => setChampion(c?.name ?? id)}>
                      {icon && <img src={icon} alt="" />}
                      {c?.name ?? id}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          <div className="field">
            <label htmlFor="predict-rank">Elo</label>
            <select id="predict-rank" className="input" value={rank} onChange={(e) => setRank(e.target.value)}>
              {RANKS.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>
          {formError && <div className="alert">{formError}</div>}
          <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
            {loading ? "Analisando partidas..." : "Prever resultado"}
          </button>
        </form>

        <div className="result-area">
          {loading ? (
            <div className="panel skeleton" style={{ height: 420 }} />
          ) : result ? (
            <ResultCard result={result} champions={champions} />
          ) : (
            <div className="panel empty-state">
              <div className="empty-art">
                <SparkIcon size={30} />
              </div>
              <h3>Pronto para analisar</h3>
              <p>Escolha um campeão e uma posição. A previsão aparece aqui com winrate, KDA médio e dicas do pick.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
