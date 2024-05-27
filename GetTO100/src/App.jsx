import React, { useState, useEffect } from 'react';
import PlayerRegistration from './Components/PlayerRegistration';
import GameBoard from './Components/Gameboard';
import Leaderboard from './Components/Leaderboard';
import '../src/css/App.css';

const App = () => {
  const [registeredPlayers, setRegisteredPlayers] = useState([]);
  const [currentPlayers, setCurrentPlayers] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [activePlayerIndex, setActivePlayerIndex] = useState(0);
  const [showHistory, setShowHistory] = useState(null);

  // Load players from localStorage when the app loads
  useEffect(() => {
    const storedPlayers = JSON.parse(localStorage.getItem('registeredPlayers')) || [];
    setRegisteredPlayers(storedPlayers);
  }, []);

  const addPlayer = (player) => {
    const newRegisteredPlayers = [...registeredPlayers, player];
    setRegisteredPlayers(newRegisteredPlayers);
    localStorage.setItem('registeredPlayers', JSON.stringify(newRegisteredPlayers));

    setCurrentPlayers([...currentPlayers, player]);
  };

  const updatePlayer = (updatedPlayer) => {
    const newCurrentPlayers = currentPlayers.map(player =>
      player.name === updatedPlayer.name ? updatedPlayer : player
    );
    setCurrentPlayers(newCurrentPlayers);

    const newRegisteredPlayers = registeredPlayers.map(player =>
      player.name === updatedPlayer.name ? updatedPlayer : player
    );
    setRegisteredPlayers(newRegisteredPlayers);
  };

  const nextPlayerTurn = () => {
    setActivePlayerIndex((activePlayerIndex + 1) % currentPlayers.length);
  };

  const startGame = () => {
    setGameStarted(true);
    setActivePlayerIndex(0);
  };

  const removePlayer = (name) => {
    const updatedCurrentPlayers = currentPlayers.filter(player => player.name !== name);
    setCurrentPlayers(updatedCurrentPlayers);
    if (updatedCurrentPlayers.length === 0) {
      setGameStarted(false);
    } else {
      setActivePlayerIndex(0);
    }
    const updatedRegisteredPlayers = registeredPlayers.filter(player => player.name !== name);
    setRegisteredPlayers(updatedRegisteredPlayers);
    localStorage.setItem('registeredPlayers', JSON.stringify(updatedRegisteredPlayers));
  };

  const toggleHistory = (player) => {
    setShowHistory(showHistory === player.name ? null : player.name);
  };

  const exitToHome = () => {
    setGameStarted(false);
    setCurrentPlayers([]);
  };

  return (
    <div className="App">
      <header>
        <h1>Get To 100</h1>
      </header>
      {!gameStarted ? (
        <div className="registration-container">
          <PlayerRegistration addPlayer={addPlayer}  registeredPlayers={registeredPlayers} />
          <h3>Players in Current Game:</h3>
          <ul>
            {currentPlayers.map((player, index) => (
              <li key={index}>
                {player.name} - Average Steps: {player.averageSteps || 'N/A'}
              </li>
            ))}
          </ul>
          <button onClick={startGame} disabled={currentPlayers.length === 0}>Start Game</button>
        </div>
      ) : (
        <div className="game-container">
          <div className="left-container">
            <div className="game-boards">
              {currentPlayers.map((player, index) => (
                <GameBoard
                  key={player.name}
                  player={player}
                  isActive={index === activePlayerIndex}
                  updatePlayer={updatePlayer}
                  nextPlayerTurn={nextPlayerTurn}
                  removePlayer={removePlayer}
                  exitToHome={exitToHome}
                />
              ))}
            </div>
            <div className="player-list">
              <h3>Current Players</h3>
              <ul>
                {currentPlayers.map(player => (
                  <li key={player.name}>
                    {player.name} - Average Steps: {player.averageSteps || 'N/A'}
                    <button onClick={() => toggleHistory(player)}>Show History</button>
                    {showHistory === player.name && (
                      <div className="player-history">
                        <h3>{player.name}'s Game History</h3>
                        <ul>
                          {player.games.map((game, index) => (
                            <li key={index}>Game {index + 1}: {game} steps</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="right-container">
            <Leaderboard players={registeredPlayers} />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
