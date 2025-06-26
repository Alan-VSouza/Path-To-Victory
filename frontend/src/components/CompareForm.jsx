import React, { useState } from "react";
import { compareChampions } from "../Api";
import "../styles/CompareForm.css";

function getComparisonMessage(result, champ1, champ2) {
    if (!result || !result[champ1] || !result[champ2]) return null;
    const w1 = result[champ1]?.winrate ?? 0;
    const w2 = result[champ2]?.winrate ?? 0;
    if (w1 === w2) return "Ambos os campeões têm o mesmo winrate.";
    const melhor = w1 > w2 ? champ1 : champ2;
    const winrate = ((w1 > w2 ? w1 : w2) * 100).toFixed(1);
    return `O campeão ${melhor} compensa mais pois tem maior winrate de ${winrate}%`;
}

export default function CompareForm() {
    const [champion1, setChampion1] = useState("");
    const [champion2, setChampion2] = useState("");
    const [position, setPosition] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const roles = [
        { value: "", label: "Selecione a posição" },
        { value: "TOP", label: "Topo" },
        { value: "JUNGLE", label: "Selva" },
        { value: "MIDDLE", label: "Meio" },
        { value: "BOTTOM", label: "Atirador" },
        { value: "UTILITY", label: "Suporte" },
    ];

    async function handleCompare(e) {
        e.preventDefault();
        setLoading(true);
        setResult(null);
        try {
            const res = await compareChampions({ champion1, champion2, position });
            setResult(res);
        } catch {
            setResult({ error: "Erro ao comparar." });
        }
        setLoading(false);
    }

    return (
        <div className="compare-form-container">
            <form className="compare-form" onSubmit={handleCompare}>
                <input
                    type="text"
                    placeholder="Campeão 1"
                    value={champion1}
                    onChange={e => setChampion1(e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Campeão 2"
                    value={champion2}
                    onChange={e => setChampion2(e.target.value)}
                    required
                />
                <select
                    value={position}
                    onChange={e => setPosition(e.target.value)}
                    required
                >
                    {roles.map(pos => (
                        <option key={pos.value} value={pos.value} disabled={pos.value === ""}>
                            {pos.label}
                        </option>
                    ))}
                </select>
                <button type="submit" disabled={loading}>
                    {loading ? "Comparando..." : "Comparar"}
                </button>
            </form>
            {result && !result.error && (
                <>
                    <div className="compare-result">
                        <div>
                            <strong>{champion1}:</strong> Winrate: {(result[champion1]?.winrate * 100).toFixed(1)}%
                        </div>
                        <div>
                            <strong>{champion2}:</strong> Winrate: {(result[champion2]?.winrate * 100).toFixed(1)}%
                        </div>
                    </div>
                    <div className="compare-argument">
                        {getComparisonMessage(result, champion1, champion2)}
                    </div>
                </>
            )}
            {result && result.error && (
                <div className="compare-result error">{result.error}</div>
            )}
        </div>
    );
}
