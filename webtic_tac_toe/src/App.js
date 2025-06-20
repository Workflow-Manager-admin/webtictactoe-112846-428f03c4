import React, { useState } from 'react';
import './App.css';
import TicTacToe from './TicTacToe';
import SnakeAndLadder from './SnakeAndLadder';

// PUBLIC_INTERFACE
function App() {
  /**
   * Contains both TicTacToe and SnakeAndLadder, with a toggle for game selection.
   * Game area remains visually consistent, responsive, and fits with the app layout.
   */
  const [selectedGame, setSelectedGame] = useState("TicTacToe");
  const gameOptions = [
    { key: "TicTacToe", label: "Tic Tac Toe" },
    { key: "SnakeAndLadder", label: "Snake & Ladder" }
  ];
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
          </div>
        </div>
      </nav>
      <main>
        <div className="container" style={{ marginTop: "90px", marginBottom: "24px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h1 className="title" style={{ color: '#4caf50', textAlign: 'center', marginBottom: '10px', marginTop: 0 }}>
            {selectedGame === "TicTacToe" ? "WebTicTacToe" : "Snake & Ladder"}
          </h1>
          <div style={{ display: "flex", gap: "14px", marginBottom: "22px" }}>
            {gameOptions.map(opt => (
              <button
                key={opt.key}
                className="btn btn-large"
                style={{
                  background: selectedGame === opt.key ? "#2196f3" : "#eee",
                  color: selectedGame === opt.key ? "#fff" : "#2196f3",
                  border: selectedGame === opt.key ? "none" : "2px solid #2196f3",
                  fontWeight: selectedGame === opt.key ? 700 : 450,
                  transform: selectedGame === opt.key ? "scale(1.08)" : "none",
                  boxShadow: selectedGame === opt.key
                    ? "0 2px 7px 0 rgba(33,150,243,0.20)"
                    : "none"
                }}
                onClick={() => setSelectedGame(opt.key)}
                tabIndex="0"
                aria-selected={selectedGame === opt.key}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {selectedGame === "TicTacToe" ? <TicTacToe /> : <SnakeAndLadder />}
        </div>
      </main>
    </div>
  );
}

export default App;