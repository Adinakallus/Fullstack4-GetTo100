import React, { useEffect, useState } from 'react';
import '../css/Leaderboard.css';

const Leaderboard = ({ registeredPlayers }) => {
  const [topPlayers, setTopPlayers] = useState([]);

  useEffect(() => {
    const sortedPlayers = registeredPlayers
      .filter((player) => player.averageSteps > 0)
      .sort((a, b) => a.averageSteps - b.averageSteps)
      .slice(0, 3);
    setTopPlayers(sortedPlayers);
  }, [registeredPlayers]);

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <ol>
        {topPlayers.map((player) => (
          <li key={player.name}>
            {player.name} - averageSteps {player.averageSteps}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Leaderboard;
