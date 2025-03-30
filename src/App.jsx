import { useState } from 'react'
import StartScreen from './components/StartScreen'
import Game from './components/Game'
import ResultScreen from './components/ResultScreen'
import Menu from './components/Menu'

function App() {
  const [gameStarted, setGameStarted] = useState(false)
  const [gameOptions, setGameOptions] = useState(null)
  const [gameStats, setGameStats] = useState(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleStartGame = (options) => {
    setGameOptions(options)
    setGameStarted(true)
    setGameStats(null)
  }

  const handleGameEnd = (stats) => {
    setGameStats(stats)
  }

  const handleNewGame = () => {
    setGameStarted(false)
    setGameOptions(null)
    setGameStats(null)
  }

  const handlePlayAgain = () => {
    setGameStats(null)
  }

  if (gameStats) {
    return (
      <ResultScreen 
        gameStats={gameStats}
        onPlayAgain={handlePlayAgain}
        onNewGame={handleNewGame}
      />
    )
  }

  if (gameStarted) {
    return (
      <>
      {/* this is expected to be filled :)) */}
      </>
    )
  }

  return <StartScreen onStartGame={handleStartGame} />
}

export default App