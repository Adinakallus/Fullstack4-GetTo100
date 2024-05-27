import React, { useEffect, useState } from 'react';
import '../css/Leaderboard.css';

const Leaderboard = ({ players }) => {
  const [topPlayers, setTopPlayers] = useState([]);

  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem('registeredPlayers')) || {};
    const sortedPlayers = Object.values(storedPlayers)
      .filter((player) => player.averageSteps > 0)
      .sort((a, b) => a.averageSteps - b.averageSteps)
      .slice(0, 3);
    setTopPlayers(sortedPlayers);
  }, [players]);

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <ol>
        {topPlayers.map((player) => (
          <li key={player.name}>
            {player.name} - Average Steps: {player.averageSteps}
          </li>
        ))}
      </ol>
      {/* <h3>Current Players Average Steps</h3>
      <ol>
        {players
          .filter((player) => player.games.length > 0)
          .sort((a, b) => a.averageSteps - b.averageSteps)
          .map((player) => (
            <li key={player.name}>
              {player.name} - Average Steps: {player.averageSteps}
            </li>
          ))}
      </ol> */}
    </div>
  );
};

export default Leaderboard;
