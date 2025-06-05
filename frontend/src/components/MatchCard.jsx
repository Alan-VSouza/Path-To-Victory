import React from 'react';
import '../styles/MatchCard.css';

function MatchCard({ match }) {
  const vencedores = match?.teams?.VENCEDOR || [];
  const perdedores = match?.teams?.PERDEDOR || [];

  return (
    <div className="match-card">
      <div className="card-header">
        <h3>Partida #{match.match_id?.slice(-4)}</h3>
      </div>
      
      <div className="teams-container">
        <div className="team winner">
          <h4>Time Vencedor</h4>
          {vencedores.map((p, idx) => (
            <div key={idx} className="player">
              <div className="player-info">
                <span className="champion">{p.champion}</span>
                <span className="role">{p.role || p.individualPosition}</span>
              </div>
              <div className="rank" style={{ 
                backgroundColor: getRankColor(p.rank?.split(' ')[0] || p.tier?.split(' ')[0]),
                color: getContrastColor(p.rank?.split(' ')[0] || p.tier?.split(' ')[0])
              }}>
                {p.rank || p.tier}
              </div>
            </div>
          ))}
        </div>

        <div className="vs">VS</div>

        <div className="team loser">
          <h4>Time Perdedor</h4>
          {perdedores.map((p, idx) => (
            <div key={idx} className="player">
              <div className="player-info">
                <span className="champion">{p.champion}</span>
                <span className="role">{p.role || p.individualPosition}</span>
              </div>
              <div className="rank" style={{ 
                backgroundColor: getRankColor(p.rank?.split(' ')[0] || p.tier?.split(' ')[0]),
                color: getContrastColor(p.rank?.split(' ')[0] || p.tier?.split(' ')[0])
              }}>
                {p.rank || p.tier}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const getRankColor = (rank) => ({
  'IRON': '#5C5C5C',
  'BRONZE': '#CD7F32',
  'SILVER': '#C0C0C0',
  'GOLD': '#FFD700',
  'PLATINUM': '#00C9B6',
  'EMERALD': '#50C878',
  'DIAMOND': '#0095B6',
  'MASTER': '#9B30FF',
  'GRANDMASTER': '#FF3030',
  'CHALLENGER': '#FF8C00'
}[rank] || '#333');

const getContrastColor = (rank) => {
  const darkRanks = ['IRON', 'BRONZE', 'SILVER', 'DIAMOND', 'MASTER'];
  return darkRanks.includes(rank) ? '#FFF' : '#000';
};

export default MatchCard;
