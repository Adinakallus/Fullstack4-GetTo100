import React, { useState } from 'react';
import '../css/PlayerRegistration.css';

const PlayerRegistration = ({ addNewPlayer,addExistingPlayer,registeredPlayers }) => {
  const [name, setName] = useState('');
  const [playerType, setPlayerType] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddPlayer = () => {
    if (name) {
      //const existingPlayers = JSON.parse(localStorage.getItem('players')) || {};
      const existingPlayers = registeredPlayers.reduce((acc, player) => {
        acc[player.name] = player;
        return acc;
      }, {});

      if (playerType === 'new') {
        if (existingPlayers[name]) {
          setErrorMessage('Player already exists. Please use existing player option.');
          return;
        } else {
          const player = { name, games: [], averageSteps: 0 };
          existingPlayers[name] = player;
          localStorage.setItem('registeredPlayers', JSON.stringify(existingPlayers));
          addNewPlayer(player);
        }
      } else if (playerType === 'existing') {
        const player = existingPlayers[name];
        if (player) {
          addExistingPlayer(player);
        } else {
          setErrorMessage('Player does not exist. Please use new player option.');
          return;
        }
      }

      setName('');
      setPlayerType(null);
      setErrorMessage('');
    }
  };

  const handleTogglePlayerType = (type) => {
    setPlayerType(type);
    setErrorMessage('');
  };

  return (
    <div className="player-registration">
      <h2>Register Players:</h2>
      {!playerType ? (
        <div>
          <h3>Choose player type:</h3>
          <button onClick={() => handleTogglePlayerType('new')}>New Player</button>
          <button onClick={() => handleTogglePlayerType('existing')}>Existing Player</button>
        </div>
      ) : (
        <div>
          <button onClick={() => handleTogglePlayerType(playerType === 'new' ? 'existing' : 'new')}>
            Switch to {playerType === 'new' ? 'Existing Player' : 'New Player'}
          </button>
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
