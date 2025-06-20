import React, { useState } from "react";
import "./TicTacToe.css";

// PUBLIC_INTERFACE
function TicTacToe() {
  /**
   * Main container and logic for WebTicTacToe.
   * Handles player turns, move logic, and responsive rendering.
   * Real-time update logic is client-only (local state).
   */
  const emptyBoard = Array(9).fill(null);
  const [board, setBoard] = useState(emptyBoard);
  const [xIsNext, setXIsNext] = useState(true);

  // Status message and winner calculation
  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
      [0, 4, 8], [2, 4, 6],            // diags
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }

  const winner = calculateWinner(board);
  const isDraw = !winner && board.every(Boolean);
  let status = winner
    ? `Winner: ${winner}`
    : isDraw
    ? "It's a Draw!"
    : `Next: Player ${xIsNext ? "X" : "O"}`;

  // Handle cell click ("real-time" in frontend)
  function handleClick(idx) {
    if (board[idx] || winner) return;
    const newBoard = board.slice();
    newBoard[idx] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
    // Placeholder: Here you would emit a socket event or use backend for real multiplayer
  }

  function handleReset() {
    setBoard(emptyBoard);
    setXIsNext(true);
  }

  // Responsive & colored cell
  return (
    <div className="ttt-main-container">
      <div className="ttt-status">{status}</div>
      <div className="ttt-board" role="grid">
        {board.map((cell, idx) => (
          <button
            key={idx}
            className="ttt-cell"
            onClick={() => handleClick(idx)}
            disabled={!!cell || winner}
            aria-label={
              cell
                ? `Cell ${idx + 1}: ${cell}`
                : `Cell ${idx + 1}: empty`
            }
          >
            {cell}
          </button>
        ))}
      </div>
      <button className="ttt-reset-btn" onClick={handleReset}>
        Restart Game
      </button>
    </div>
  );
}

export default TicTacToe;
