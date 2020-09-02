import React, { useState } from 'react';
import logo from './logo.png';
import './App.css';
import { AppContext } from './contexts/appContexts';
import HelloWorld from './components/HelloWorld';
import CountBoard from './components/CountBoard';

function App() {
  const [isPlayed, setIsPlayed] = useState(Array(105).fill(false))

  function ToggleButton(i) {
    var NewisPlayed = isPlayed.slice();
    NewisPlayed[i] = !isPlayed[i];
    setIsPlayed(NewisPlayed)
  }

  function MultiOnButton(array) {
    var NewisPlayed = isPlayed.slice();
    array.forEach(n => {
      NewisPlayed[n] = true
    });

    setTimeout(() => {
      setIsPlayed(NewisPlayed)
    }, 1000);
  }

  const appContextsValue = {
    isPlayed: isPlayed,
    toggleButton: ToggleButton,
    multiOnButton: MultiOnButton
  };

  return (
    <div id="app" className="App">
      <AppContext.Provider value={appContextsValue}>
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
      </AppContext.Provider>
    </div>
  );
}

export default App;
