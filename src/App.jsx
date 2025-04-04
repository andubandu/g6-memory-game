import { useState } from 'react';
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import ResultScreen from './components/ResultScreen';
import Menu from './components/Menu';

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOptions, setGameOptions] = useState(null);
  const [gameStats, setGameStats] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleStartGame = (options) => {
    console.log('App.jsx: handleStartGame called with options:', options);
    setGameOptions(options);
    setGameStarted(true);
    setGameStats(null);
  };

  const handleGameEnd = (stats) => {
    console.log('App.jsx: handleGameEnd called with stats:', stats);
    setGameStats(stats);
  };

  const handleNewGame = () => {
    console.log('App.jsx: handleNewGame called');
    setGameStarted(false);
    setGameOptions(null);
    setGameStats(null);
  };

  const handlePlayAgain = () => {
    console.log('App.jsx: handlePlayAgain called');
    setGameStats(null);
  };

  console.log('App.jsx: gameStarted:', gameStarted, 'gameOptions:', gameOptions);

  if (gameStats) {
    return (
      <ResultScreen
        gameStats={gameStats}
        onPlayAgain={handlePlayAgain}
        onNewGame={handleNewGame}
      />
    );
  }

  if (gameStarted) {
    return (
      <>
          <Game
      options={gameOptions}
      onGameEnd={handleGameEnd}
      onNewGame={handleNewGame} 
    />
      </>
    );
  }

  return <StartScreen onStartGame={handleStartGame} />;
}

export default App;