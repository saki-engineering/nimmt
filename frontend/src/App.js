import React from 'react';
import logo from './logo.png';
import './App.css';
import HelloWorld from './components/HelloWorld';
import CountBoard from './components/CountBoard';
import DropBox from './components/DropBox';

function App() {
  return (
    <div id="app" className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to your new <code>wails/react</code> project.
        </p>

        <HelloWorld />
      </header>
      <body>
        <CountBoard />
      </body>
    </div>
  );
}

export default App;
