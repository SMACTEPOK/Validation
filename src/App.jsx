import React from 'react';
import Lab10Page from './pages/Lab10Page';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app__header">
        <div className="app__brand">
          <span className="app__brand-mark">✱</span>
          CRAFTMARKET
          <span className="app__brand-tag">LAB 10</span>
        </div>
      </header>
      <main className="app__main">
        <Lab10Page />
      </main>
      <footer className="app__footer">
        <p>© 2026 CRAFTMARKET · Лабораторна робота 10 · Form Validation</p>
      </footer>
    </div>
  );
}

export default App;
