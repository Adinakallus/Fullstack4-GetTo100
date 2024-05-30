import React, { useState, useEffect } from 'react';
import '../css/Gameboard.css';

const GameBoard = ({ player, isActive, updatePlayer, nextPlayerTurn, removePlayer, exitToHome }) => {
  const [currentNumber, setCurrentNumber] = useState(Math.floor(Math.random() * 100));
  const [steps, setSteps] = useState(0);

  useEffect(() => {
    if (currentNumber === 100) {
      const newGames = [...player.games, steps];
      const newAverage = newGames.reduce((a, b) => a + b, 0) / newGames.length;
      const updatedPlayer = { ...player, games: newGames, averageSteps: newAverage };
      updatePlayer(updatedPlayer);

      // // Update local storage
      // const players = JSON.parse(localStorage.getItem('players')) || {};
      // players[updatedPlayer.name] = updatedPlayer;
      // localStorage.setItem('players', JSON.stringify(players));

      if (window.confirm(`You've reached 100 in ${steps} steps! Do you want to play again?`)) {
        setCurrentNumber(Math.floor(Math.random() * 100));
        setSteps(0);
      } else {
        removePlayer(player.name);
      }
    }
  }, [currentNumber, steps, player, updatePlayer, removePlayer]);

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
      <button className="exit-game" onClick={exitToHome}>Exit Game</button>
    </div>
  );
};

export default GameBoard;
