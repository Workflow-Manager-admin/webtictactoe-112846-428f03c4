import React, { useState } from "react";
import "./SnakeAndLadder.css";

/**
 * SnakeAndLadder React component
 * A classic 2-player game, visually themed and responsive for the WebTicTacToe app.
 * Handles dice rolls, board rendering, move animations, snake/ladder capturing, and winner detection.
 */
// PUBLIC_INTERFACE
function SnakeAndLadder() {
  // --- Board & Game Setup
  const boardSize = 10; // 10x10 board
  const winningTile = boardSize * boardSize;
  // Example snakes & ladders map: start -> end
  const snakes = {
    17: 7,
    54: 34,
    62: 19,
    64: 60,
    87: 24,
    93: 73,
    95: 75,
    99: 78,
  };
  const ladders = {
    4: 14,
    9: 31,
    20: 38,
    28: 84,
    40: 59,
    51: 67,
    63: 81,
    71: 91,
  };
  const defaultPlayers = [
    { name: "Player 1", color: "var(--sl-p1)" },
    { name: "Player 2", color: "var(--sl-p2)" },
  ];

  const [dice, setDice] = useState(null);
  const [positions, setPositions] = useState([1, 1]);
  const [turn, setTurn] = useState(0); // 0 or 1
  const [animating, setAnimating] = useState(false);
  const [message, setMessage] = useState("");
  const [winner, setWinner] = useState(null);

  // --- Helpers
  function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
  }

  function getNextPosition(pos, roll) {
    return pos + roll > winningTile ? pos : pos + roll;
  }

  function movePlayer(playerIdx, roll) {
    let newPositions = positions.slice();
    let pos = getNextPosition(newPositions[playerIdx], roll);
    let infoMsg = "";
    // Ladder
    if (ladders[pos]) {
      infoMsg = `Ladder! Climbed up to ${ladders[pos]}`;
      pos = ladders[pos];
    }
    // Snake
    else if (snakes[pos]) {
      infoMsg = `Oh! Bitten by snake, down to ${snakes[pos]}`;
      pos = snakes[pos];
    }
    // Reach end?
    if (pos === winningTile) {
      setWinner(defaultPlayers[playerIdx].name);
      setMessage(`${defaultPlayers[playerIdx].name} wins!`);
      newPositions[playerIdx] = pos;
      setPositions(newPositions);
      return;
    }
    newPositions[playerIdx] = pos;
    setPositions(newPositions);
    setMessage(
      infoMsg ||
        `${defaultPlayers[playerIdx].name
        } moves to ${pos}.`
    );
  }

  // --- Main roll, animate & update turn
  async function clickRoll() {
    if (winner || animating) return;
    setAnimating(true);
    const roll = rollDice();
    setDice(roll);

    // Animation: move one step at a time if possible
    let playerIdx = turn;
    let oldPos = positions[playerIdx];
    let path = [];
    for (let step = 1; step <= roll; step++) {
      let nextPos = getNextPosition(oldPos, 1);
      if (oldPos === nextPos) break;
      path.push(nextPos);
      oldPos = nextPos;
    }
    for (let i = 0; i < path.length; i++) {
      await new Promise(res => setTimeout(res, 330));
      setPositions(p => {
        let arr = p.slice();
        arr[playerIdx] = path[i];
        return arr;
      });
    }
    await new Promise(res => setTimeout(res, 250));
    movePlayer(playerIdx, 0); // perform snake/ladder check
    setAnimating(false);

    // Next player turn (if didn't win)
    if (!winner) setTurn(1 - turn);
  }

  function handleReset() {
    setPositions([1, 1]);
    setDice(null);
    setTurn(0);
    setMessage("");
    setWinner(null);
    setAnimating(false);
  }

  // --- Render helpers
  function getPlayerAt(cell) {
    let res = [];
    positions.forEach((pos, i) => {
      if (pos === cell) res.push(i);
    });
    return res;
  }

  function renderCell(idx) {
    const cell = boardSize * boardSize - idx;
    let isSnake = !!snakes[cell];
    let isLadder = !!ladders[cell];
    let playerTokens = getPlayerAt(cell);

    return (
      <div
        key={idx}
        className={`sl-cell${(idx + Math.floor(idx / boardSize)) % 2 === 0 ? " odd" : ""}${isSnake ? " snake" : ""}${isLadder ? " ladder" : ""}`}
      >
        <div className="sl-cell-number">{cell}</div>
        {isSnake && <span className="sl-sn-lad" title={`Snake to ${snakes[cell]}`}>🐍</span>}
        {isLadder && <span className="sl-sn-lad" title={`Ladder to ${ladders[cell]}`}>🪜</span>}
        <div className="sl-players">
          {playerTokens.map(i => (
            <span className={`sl-player-token`} style={{ background: defaultPlayers[i].color }} key={i}>
              {i === 0 ? "1" : "2"}
            </span>
          ))}
        </div>
      </div>
    );
  }

  function Dice() {
    return (
      <div className="sl-dice-face">
        {dice ? (
          <span className="sl-dice-label">🎲 {dice}</span>
        ) : (
          <span className="sl-dice-place">Roll</span>
        )}
      </div>
    );
  }

  // --- Main component render
  return (
    <div className="sl-main-container">
      <div className="sl-status">
        {!winner ? (
          <>
            Turn: <span className="sl-player-name" style={{ color: defaultPlayers[turn].color }}>{defaultPlayers[turn].name}</span>
          </>
        ) : (
          <span className="sl-player-name" style={{ color: "#4CAF50" }}>{winner} Wins!</span>
        )}
        {message && (
          <div className="sl-message">{message}</div>
        )}
      </div>
      <div className="sl-board-container">
        <div className="sl-board">
          {[...Array(boardSize * boardSize)].map((_, idx) => renderCell(idx))}
        </div>
        <div className="sl-dice-area">
          <button className="sl-dice-btn" onClick={clickRoll} disabled={animating || !!winner}>
            <Dice />
          </button>
          <div className="sl-description">
            Roll the dice to move. Land on ladders to climb up! Avoid snakes 🐍.
          </div>
          <button className="sl-reset-btn" onClick={handleReset}>
            Restart Game
          </button>
        </div>
      </div>
    </div>
  );
}

export default SnakeAndLadder;
