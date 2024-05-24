// src/App.jsx
import React, { useState } from 'react';
import PlayerRegistration from './Components/PlayerRegistration';
import GameBoard from './Components/Gameboard';
import Leaderboard from './Components/Leaderboard';

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
      <h1>100 to Get Game</h1>
      {!gameStarted ? (
        <div>
          <PlayerRegistration addPlayer={addPlayer} />
          <h3>Registered Players:</h3>
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
      )}
      <Leaderboard players={players} />
    </div>
  );
};

export default App;
