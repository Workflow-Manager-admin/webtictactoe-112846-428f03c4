import React from 'react';
import './App.css';
import TicTacToe from './TicTacToe';

// PUBLIC_INTERFACE
function App() {
  /**
   * Integrates the TicTacToe component as the main section of the app.
   * Keeps the nav bar, applies responsive layout.
   */
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            {/* Remove template button */}
          </div>
        </div>
      </nav>
      <main>
        <div className="container" style={{ marginTop: "90px", marginBottom: "24px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h1 className="title" style={{ color: '#4caf50', textAlign: 'center', marginBottom: '10px', marginTop: 0 }}>WebTicTacToe</h1>
          <TicTacToe />
        </div>
      </main>
    </div>
  );
}

export default App;