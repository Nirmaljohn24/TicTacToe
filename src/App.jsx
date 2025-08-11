// App.jsx
import { useEffect, useState } from "react";
import "./App.css";
import ScoreBoard from "./components/ScoreBoard.jsx";
import GameBoard from "./components/GameBoard.jsx";
import { getAIMoveFromOpenRouter } from "./utils/aiOpenRouter.js";
import { checkWinner } from "./utils/winner.js";

export default function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState({ X: 0, O: 0 });

  const handleClick = (i) => {
    if (!isPlayerTurn || board[i] || winner) return;
    const newBoard = [...board];
    newBoard[i] = "X";
    setBoard(newBoard);
    setIsPlayerTurn(false);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsPlayerTurn(true);
  };

  // ✅ One winner check per move
  useEffect(() => {
    const result = checkWinner(board);
    if (result) {
      setWinner(result.winner);
      if (result.winner === "X" || result.winner === "O") {
        setScore((prev) => ({
          ...prev,
          [result.winner]: prev[result.winner] + 1,
        }));
      }
      return; // stop further moves
    }

    // ✅ AI Move only if it's AI's turn and no winner
    if (!isPlayerTurn && !winner) {
      (async () => {
        const move = await getAIMoveFromOpenRouter(board);
        if (move !== null && board[move] === null) {
          setBoard((prev) => {
            const updated = [...prev];
            updated[move] = "O";
            return updated;
          });
          setIsPlayerTurn(true);
        } else {
          setIsPlayerTurn(true); // fallback if AI fails
        }
      })();
    }
  }, [board, isPlayerTurn, winner]);

  return (
    <div className="min-h-screen bg-[#0F172A] text-white flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4 italic">Tic Tac Tai 🤖</h1>
      <ScoreBoard score={score} />
      <GameBoard board={board} handleClick={handleClick} />
      {winner && (
        <div className="mt-4 text-center">
          <p className="mb-2">
            {winner === "Draw" ? "It's a draw!" : `${winner} wins!`}
          </p>
          <button
            onClick={resetGame}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white"
          >
            Play again!
          </button>
        </div>
      )}
    </div>
  );
}
