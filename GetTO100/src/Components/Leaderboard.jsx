// src/components/Leaderboard.jsx
import React from 'react';
import '../css/Leaderboard.css';

const Leaderboard = ({ players }) => {
  const topPlayers = [...players]
    .filter((player) => player.games.length > 0)
    .sort((a, b) => a.averageSteps - b.averageSteps)
    .slice(0, 3);

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <ol>
        {topPlayers.map((player) => (
          <li key={player.name}>
            {player.name} - Average Steps: {player.averageSteps.toFixed(2)}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Leaderboard;
