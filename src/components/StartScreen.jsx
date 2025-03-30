import { useState } from 'react'

function StartScreen({ onStartGame }) {
  const [gameOptions, setGameOptions] = useState({
    theme: 'numbers',
    players: '1',
    gridSize: '4x4',
  })

  const handleOptionChange = (category, value) => {
    setGameOptions(prev => ({
      ...prev,
      [category]: value
    }))
  }

  const handleStartGame = () => {
    onStartGame(gameOptions)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-dark-bg">
      <div className="bg-white rounded-[20px] p-6 w-full max-w-[400px] shadow-lg">
        <h1 className="text-dark-bg text-center mb-6 text-2xl">memory</h1>
        
        <div className="mb-4">
          <label className="block text-dark-bg mb-2 font-medium">
            Select Theme
          </label>
          <div className="flex gap-2 mb-4">
            <button 
              className={`flex-1 py-2 px-4 rounded-full border border-gray-200 transition-colors
                ${gameOptions.theme === 'numbers' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-dark-bg hover:bg-gray-100'}`}
              onClick={() => handleOptionChange('theme', 'numbers')}
            >
              Numbers
            </button>
            <button 
              className={`flex-1 py-2 px-4 rounded-full border border-gray-200 transition-colors
                ${gameOptions.theme === 'icons' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-dark-bg hover:bg-gray-100'}`}
              onClick={() => handleOptionChange('theme', 'icons')}
            >
              Icons
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-dark-bg mb-2 font-medium">
            Number of Players
          </label>
          <div className="flex gap-2 mb-4">
            {['1', '2', '3', '4'].map(num => (
              <button 
                key={num}
                className={`flex-1 py-2 px-4 rounded-full border border-gray-200 transition-colors
                  ${gameOptions.players === num 
                    ? 'bg-primary text-white' 
                    : 'bg-white text-dark-bg hover:bg-gray-100'}`}
                onClick={() => handleOptionChange('players', num)}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-dark-bg mb-2 font-medium">
            Grid Size
          </label>
          <div className="flex gap-2 mb-4">
            <button 
              className={`flex-1 py-2 px-4 rounded-full border border-gray-200 transition-colors
                ${gameOptions.gridSize === '4x4' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-dark-bg hover:bg-gray-100'}`}
              onClick={() => handleOptionChange('gridSize', '4x4')}
            >
              4x4
            </button>
            <button 
              className={`flex-1 py-2 px-4 rounded-full border border-gray-200 transition-colors
                ${gameOptions.gridSize === '6x6' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-dark-bg hover:bg-gray-100'}`}
              onClick={() => handleOptionChange('gridSize', '6x6')}
            >
              6x6
            </button>
          </div>
        </div>

        <button 
          className="w-full py-3 bg-primary text-white rounded-full font-bold 
            transition-colors hover:bg-primary-hover"
          onClick={handleStartGame}
        >
          Start Game
        </button>
      </div>
    </div>
  )
}

export default StartScreen