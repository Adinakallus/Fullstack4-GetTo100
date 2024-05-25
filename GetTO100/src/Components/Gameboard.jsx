import React, { useState, useEffect } from 'react';
import '../css/Gameboard.css';

const GameBoard = ({ player, isActive, updatePlayer, nextPlayerTurn, removePlayer, isLastPlayer }) => {
  const [currentNumber, setCurrentNumber] = useState(Math.floor(Math.random() * 100));
  const [steps, setSteps] = useState(0);

  useEffect(() => {
    if (currentNumber === 100) {
      const newGames = [...player.games, steps];
      const newHighScore = Math.min(...newGames);
      const newAverage = newGames.reduce((a, b) => a + b, 0) / newGames.length;
      const updatedPlayer = { ...player, games: newGames, highScore: newHighScore, averageSteps: newAverage };
      updatePlayer(updatedPlayer);

      // Update local storage
      const players = JSON.parse(localStorage.getItem('players')) || {};
      players[updatedPlayer.name] = updatedPlayer;
      localStorage.setItem('players', JSON.stringify(players));

      if (isLastPlayer) {
        // If this is the last player, end the game and return to the main page
        removePlayer(player.name);
        window.location.reload();  // This reloads the page to reset the state
      } else {
        // Confirm action with the player
        if (window.confirm("You've reached 100! Do you want to play again?")) {
          // Start a new game
          setCurrentNumber(Math.floor(Math.random() * 100));
          setSteps(0);
        } else {
          // Leave the game
          removePlayer(player.name);
        }
      }
    }
  }, [currentNumber]);

  const handleAction = (action) => {
    if (!isActive) return;
    let newNumber = currentNumber;
    switch (action) {
      case '+1':
        newNumber += 1;
        break;
      case '-1':
        newNumber -= 1;
        break;
      case '*2':
        newNumber *= 2;
        break;
      case '/2':
        newNumber = Math.floor(newNumber / 2);
        break;
      default:
        break;
    }
    setCurrentNumber(newNumber);
    setSteps(steps + 1);
    nextPlayerTurn();
  };

  return (
    <div className={`game-board ${isActive ? 'active' : ''}`}>
      <h3>{player.name}</h3>
      <p>Current Number: {currentNumber}</p>
      <p>Steps: {steps}</p>
      <div className="actions">
        <button onClick={() => handleAction('+1')}>+1</button>
        <button onClick={() => handleAction('-1')}>-1</button>
        <button onClick={() => handleAction('*2')}>*2</button>
        <button onClick={() => handleAction('/2')}>/2</button>
      </div>
    </div>
  );
};

export default GameBoard;
