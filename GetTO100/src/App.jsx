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

  const updatePlayer = (updatedPlayer) => {
    const newPlayers = players.map(player => 
      player.name === updatedPlayer.name ? updatedPlayer : player
    );
    setPlayers(newPlayers);
  };

  const nextPlayerTurn = () => {
    setActivePlayerIndex((activePlayerIndex + 1) % players.length);
  };

  const startGame = () => {
    setGameStarted(true);
  };

  const removePlayer = (name) => {
    setPlayers(players.filter(player => player.name !== name));
    const updatedPlayers = players.filter(player => player.name !== name);
    setPlayers(updatedPlayers);
    if (updatedPlayers.length === 0) {
      setGameStarted(false);
    } else {
    setActivePlayerIndex(0);
      setActivePlayerIndex(0);
    }
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
                {player.name} - High Score: {player.highScore || 'N/A'}
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
                updatePlayer={updatePlayer}
                nextPlayerTurn={nextPlayerTurn}
                removePlayer={removePlayer}
              />
            ))}
          </div>
          <Leaderboard players={players} />
          <div className="player-history">
            <h2>Player Game History</h2>
            {players.map((player) => (
              <div key={player.name}>
                <h3>{player.name}</h3>
                <ul>
                  {player.games.map((game, index) => (
                    <li key={index}>Game {index + 1}: {game} steps</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
