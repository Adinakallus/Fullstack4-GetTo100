import React, { useEffect, useState } from 'react';
import '../css/Leaderboard.css';

const Leaderboard = ({ players }) => {
  const [topPlayers, setTopPlayers] = useState([]);

  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem('players')) || {};
    const sortedPlayers = Object.values(storedPlayers)
      .filter((player) => player.highScore > 0)
      .sort((a, b) => a.highScore - b.highScore)
      .slice(0, 3);
    setTopPlayers(sortedPlayers);
  }, []);

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
      <h3>Current Players High Scores</h3>
      <ol>
        {players
          .filter((player) => player.games.length > 0)
          .sort((a, b) => a.highScore - b.highScore)
          .map((player) => (
            <li key={player.name}>
              {player.name} - High Score: {player.highScore}
            </li>
          ))}
      </ol>
    </div>
  );
};

export default Leaderboard;
