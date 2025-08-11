import React from 'react'
import Square from './Square'

const GameBoard = ({board,handleClick}) => {



  // console.log(board);

  return (
    <div className="grid grid-cols-3 gap-2 w-64">
      {board.map((cell, index) => (
        <button
          key={index}
          onClick={() => handleClick(index)}
          className={`w-20 h-20 text-3xl font-bold flex items-center justify-center border-2 border-gray-400 rounded
            ${cell === "X"
              ? "bg-gradient-to-br from-blue-500 to-orange-400 text-white"
              : cell === "O"
              ? "bg-yellow-400 text-black"
              : "bg-gray-800 text-white"}
          `}
        >
          {cell}
        </button>
      ))}
    </div>
  )
}

export default GameBoard