import React, { useState } from 'react';
import '../styles/PredictForm.css';

const positions = [
  { value: '', label: 'Selecione a posição' },
  { value: 'TOP', label: 'Topo' },
  { value: 'JUNGLE', label: 'Selva' },
  { value: 'MIDDLE', label: 'Meio' },
  { value: 'BOTTOM', label: 'Atirador' },
  { value: 'UTILITY', label: 'Suporte' },
];

export default function PredictForm() {
  const [champion, setChampion] = useState('');
  const [position, setPosition] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('http://localhost:5001/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ champion, individualPosition: position }),
      });
      const data = await res.json();
      setResult(data.vencedor ? 'Vitória provável' : 'Derrota provável');
    } catch {
      setResult('Erro ao prever. Tente novamente.');
    }
    setLoading(false);
  };

  return (
    <form className="predict-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Campeão"
        value={champion}
        onChange={(e) => setChampion(e.target.value)}
        required
      />
      <select value={position} onChange={(e) => setPosition(e.target.value)} required>
        {positions.map((pos) => (
          <option key={pos.value} value={pos.value} disabled={pos.value === ''}>
            {pos.label}
          </option>
        ))}
      </select>
      <button type="submit" disabled={loading}>
        {loading ? 'Calculando...' : 'Prever Resultado'}
      </button>
      {result && <p className={`result ${result.includes('Vitória') ? 'win' : 'lose'}`}>{result}</p>}
    </form>
  );
}
