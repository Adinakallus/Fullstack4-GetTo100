// src/App.jsx
import React, { useState } from 'react';
import PlayerRegistration from './Components/PlayerRegistration';
import GameBoard from './Components/Gameboard';
import Leaderboard from './Components/Leaderboard';
import '../src/css/App.css';

const App = () => {
  const [players, setPlayers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [activePlayerIndex, setActivePlayerIndex] = useState(0);

  const addPlayer = (player) => {
    setPlayers([...players, player]);
  };

  const updatePlayer = (index, player) => {
    const newPlayers = [...players];
    newPlayers[index] = player;
    setPlayers(newPlayers);
  };

  const nextPlayerTurn = () => {
    setActivePlayerIndex((activePlayerIndex + 1) % players.length);
  };

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="App">
      <header>
        <h1>Get To 100</h1>
      </header>
      {!gameStarted ? (
        <div className="registration-container">
          <PlayerRegistration addPlayer={addPlayer} />
          <h3>Players in Current Game:</h3>
          <ul>
            {players.map((player, index) => (
              <li key={index}>
                {player.name} - High Score: {player.games.length > 0 ? Math.min(...player.games) : 'N/A'}
              </li>
            ))}
          </ul>
          <button onClick={startGame} disabled={players.length === 0}>Start Game</button>
        </div>
      ) : (
        <div className="game-container">
          <div className="game-boards">
            {players.map((player, index) => (
              <GameBoard
                key={player.name}
                player={player}
                isActive={index === activePlayerIndex}
                updatePlayer={(updatedPlayer) => updatePlayer(index, updatedPlayer)}
                nextPlayerTurn={nextPlayerTurn}
              />
            ))}
          </div>
          <Leaderboard players={players} />
        </div>
      )}
    </div>
  );
};

export default App;
