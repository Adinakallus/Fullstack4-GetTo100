import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PlayerRegistration from './Components/PlayerRegistration.jsx';
import GameBoard from './Components/Gameboard';
import Leaderboard from './Components/Leaderboard';

function App() {
  const [players, setPlayers] = useState([]);
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


  return (
    <>
      <div className="App">
      <h1>100 to Get Game</h1>
      <PlayerRegistration addPlayer={addPlayer} />
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
    </>
  )
};

export default App
