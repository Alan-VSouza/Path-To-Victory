import React, { useState } from "react";
import { predictChampion } from "../Api";
import ResultCard from "./ResultCard";
import "../styles/PredictForm.css";

export default function PredictForm() {
  const [champion, setChampion] = useState("");
  const [role, setRole] = useState("");
  const [rank, setRank] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const roles = [
    { value: "", label: "Selecione a posição" },
    { value: "TOP", label: "Topo" },
    { value: "JUNGLE", label: "Selva" },
    { value: "MIDDLE", label: "Meio" },
    { value: "BOTTOM", label: "Atirador" },
    { value: "UTILITY", label: "Suporte" },
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const payload = {
      champion: champion.trim(),
      role,
      rank: rank.trim(),
      kills: 0,
      deaths: 0,
      assists: 0,
    };

    try {
      const res = await predictChampion(payload);
      setResult(res);
    } catch (err) {
      setResult({ error: err.message || "Erro ao prever. Tente novamente." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="predict-form-container">
      <form className="predict-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Campeão (ex: Ahri)"
          value={champion}
          onChange={e => setChampion(e.target.value)}
          required
        />
        <select value={role} onChange={e => setRole(e.target.value)} required>
          {roles.map(pos => (
            <option key={pos.value} value={pos.value} disabled={pos.value === ""}>
              {pos.label}
            </option>
          ))}
        </select>
        <button type="submit" disabled={loading}>
          {loading ? "Calculando..." : "Prever Resultado"}
        </button>
      </form>
      {result && <ResultCard result={result} />}
    </div>
  );
}
