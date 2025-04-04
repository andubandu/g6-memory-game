import { useState, useEffect } from "react";

const iconsList = [
  "🍎", "🍌", "🍇", "🍉", "🍓", "🍒", "🍍", "🥭", "🍑", "🍋",
  "🍊", "🍍", "🥑", "🍍", "🍉", "🍈", "🍓", "🍒"
];

function generateNumbers(size) {
  const totalPairs = size === "6x6" ? 18 : 8;
  const numbers = [...Array(totalPairs).keys(), ...Array(totalPairs).keys()];
  return numbers.sort(() => Math.random() - 0.5);
}

function generateIcons(size) {
  const totalPairs = size === "6x6" ? 18 : 8;
  const icons = [...iconsList.slice(0, totalPairs), ...iconsList.slice(0, totalPairs)];
  return icons.sort(() => Math.random() - 0.5);
}

function Game({ options, onGameEnd, onNewGame }) {
  const gridSize = options.gridSize || "4x4";
  const theme = options.theme || "numbers";
  const playersCount = Number(options.players) || 1;
  const columns = gridSize === "6x6" ? "grid-cols-6" : "grid-cols-4";

  const [grid, setGrid] = useState(theme === "numbers" ? generateNumbers(gridSize) : generateIcons(gridSize));
  const [selected, setSelected] = useState([]);
  const [matched, setMatched] = useState([]);
  const [timer, setTimer] = useState(0);
  const [attempts, setAttempts] = useState(Array(playersCount).fill(0));
  const [isWin, setIsWin] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(0);

  useEffect(() => {
    if (playersCount === 1) {
      const interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [playersCount]);

  useEffect(() => {
    if (matched.length === grid.length) {
      setIsWin(true);
      onGameEnd({ time: timer, attempts: attempts[currentPlayer] });
    }
  }, [matched, timer, attempts, currentPlayer]);

  const handleClick = (index) => {
    if (selected.includes(index) || matched.includes(index) || isWin) return;

    const newSelected = [...selected, index];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      const [first, second] = newSelected;
      if (grid[first] === grid[second]) {
        setMatched([...matched, first, second]);
      } else {
        setAttempts((prev) => {
          const newAttempts = [...prev];
          newAttempts[currentPlayer] += 1;
          return newAttempts;
        });
      }
      setTimeout(() => {
        setSelected([]);
        if (playersCount > 1) {
          setCurrentPlayer((prev) => (prev + 1) % playersCount);
        }
      }, 1000);
    }
  };

  const handleRestart = () => {
    setSelected([]);
    setMatched([]);
    setAttempts(Array(playersCount).fill(0));
    setTimer(0);
    setCurrentPlayer(0);
    setIsWin(false);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
   <div> 
    <div className="flex justify-between items-center mb-4 mt-[50px]">
  <p className="text-[30px] ml-[100px] max-[700px]:ml-[20px]">
    memory
  </p>
  <div className="flex gap-4">
    <button 
      className="bg-[#FDA214] text-white px-4 py-2 rounded-[20px] hover:bg-[#FFB84A] max-[700px]:ml-[40px] max-[600px]:w-100px " 
      onClick={onNewGame} 
    >
      New Game
    </button>
    <button 
      className="bg-[#DFE7EC]  mr-[100px] text-black px-4 py-2 rounded-[20px] hover:bg-[#6395B8]" 
      onClick={handleRestart}
    >
      Restart
    </button>
  </div>
</div>

    <div className="flex flex-col items-center mt-[50px] justify-center p-4">
      

      <div className={`grid ${columns} gap-2 mt-4`}>
        {grid.map((item, index) => {
          const isVisible = selected.includes(index) || matched.includes(index);
          return (
            <div
              key={index}
              className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-lg font-bold cursor-pointer rounded-[50%] border transition-all bg-[#304859] text-white"
              onClick={() => handleClick(index)}
              style={{
                backgroundColor: matched.includes(index)
                  ? "#FDA214"
                  : selected.includes(index)
                  ? "#ccc"
                  : "#304859",
                cursor: matched.includes(index) ? "default" : "pointer",
              }}
            >
              {isVisible ? (
                theme === "numbers" ? (
                  item
                ) : (
                  <span style={{ fontSize: "32px" }}>{item}</span>
                )
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>

    
      <div className="mt-4 flex flex-wrap gap-[30px] items-center justify-center">
  {playersCount === 1 && (
    <div className="text-black p-[17px]  rounded-md bg-[#DFE7EC] font-semibold">
      Time:  {formatTime(timer)}
    </div>
  )}

  {Array.from({ length: playersCount }).map((_, idx) => (
    <div
      key={idx}
      className={`text-black px-4 p-[17px] rounded-md  font-semibold ${
        playersCount === 1 ? "bg-[#DFE7EC] " : currentPlayer === idx ? "bg-yellow-500" : "bg-[#DFE7EC]"
      }`}
    >
      Player {idx + 1} <span className="ml-[30px]">{attempts[idx]}</span>
    </div>
  ))}
</div>

    </div>
  </div> 
  );
}

export default Game;
