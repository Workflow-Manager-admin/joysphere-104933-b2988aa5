import React from 'react';
import './App.css';
import NavBar from './NavBar';

// PUBLIC_INTERFACE
function App() {
  return (
    <div className="App" style={{ paddingTop: 74 }}>
      <NavBar />
      <header className="App-header" style={{ marginTop: 16 }}>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
