import React from 'react';
import '../css/Leaderboard.css';

const Leaderboard = ({ players }) => {
  const topPlayers = [...players]
    .filter((player) => player.games.length > 0)
    .sort((a, b) => a.highScore - b.highScore)
    .slice(0, 3);

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <ol>
        {topPlayers.map((player) => (
          <li key={player.name}>
            {player.name} - High Score: {player.highScore}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Leaderboard;
