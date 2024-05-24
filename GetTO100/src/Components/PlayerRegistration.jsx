// src/components/PlayerRegistration.js
import React, { useState } from 'react';

const PlayerRegistration = ({ addPlayer }) => {
  const [name, setName] = useState('');

  const handleAddPlayer = () => {
    if (name) {
      const existingPlayers = JSON.parse(localStorage.getItem('players')) || {};
      const player = existingPlayers[name] || { name, games: [], averageSteps: 0 };
      addPlayer(player);
      setName('');
    }
  };

  return (
    <div>
      <h2>Register Player</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter player name"
      />
      <button onClick={handleAddPlayer}>Add Player</button>
    </div>
  );
};

export default PlayerRegistration;
