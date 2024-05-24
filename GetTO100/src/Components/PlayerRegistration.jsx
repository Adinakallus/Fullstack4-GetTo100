// src/components/PlayerRegistration.jsx
import React, { useState } from 'react';
import '../css/PlayerRegistration.css';

const PlayerRegistration = ({ addPlayer }) => {
  const [name, setName] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddPlayer = () => {
    if (name) {
      const existingPlayers = JSON.parse(localStorage.getItem('players')) || {};

      if (showInput === 'new') {
        if (existingPlayers[name]) {
          setErrorMessage('Player already exists. Please use existing player option.');
          return;
        } else {
          const player = { name, games: [], highScore: 0 };
          existingPlayers[name] = player;
          localStorage.setItem('players', JSON.stringify(existingPlayers));
          addPlayer(player);
        }
      } else if (showInput === 'existing') {
        const player = existingPlayers[name];
        if (player) {
          addPlayer(player);
        } else {
          setErrorMessage('Player does not exist. Please use new player option.');
          return;
        }
      }

      setName('');
      setShowInput(false);
      setErrorMessage('');
    }
  };

  const handleNewPlayer = () => {
    setShowInput('new');
  };

  const handleExistingPlayer = () => {
    setShowInput('existing');
  };

  return (
    <div className="player-registration">
      <h2>Register Players:</h2>
      {!showInput ? (
        <div>
          <h3>Choose player type:</h3>
          <button onClick={handleNewPlayer}>New Player</button>
          <button onClick={handleExistingPlayer}>Existing Player</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter player name"
          />
          <button onClick={handleAddPlayer}>Add Player</button>
        </div>
      )}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default PlayerRegistration;
