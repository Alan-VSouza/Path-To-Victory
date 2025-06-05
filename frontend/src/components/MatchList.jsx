import React, { useEffect, useState } from 'react';
import MatchCard from './MatchCard';

const API_URL = 'http://localhost:5000/api/match_results';

function MatchList() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error('Erro ao carregar dados');
        return res.json();
      })
      .then(data => {
        const arrData = Array.isArray(data) ? data : Object.values(data);
        setMatches(arrData);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Carregando partidas...</div>;
  if (error) return <div className="error">⚠️ Erro: {error}</div>;

  return (
    <div className="matches-grid">
      {matches
        .filter(match => !!match)
        .map((match, idx) => (
          <MatchCard key={idx} match={match} />
        ))}
    </div>
  );
}

export default MatchList;
