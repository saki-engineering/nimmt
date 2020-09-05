import React, { useReducer } from 'react';
import logo from './logo.png';
import './App.css';
import { AppContext } from './contexts/appContexts';
import { AppReducer } from './reducers/AppReducer';
import HelloWorld from './components/HelloWorld';
import CountBoard from './components/CountBoard';

function App() {
  const initialState = {
    isPlayed : Array(105).fill(false)
  };

  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <div id="app" className="App">
      <AppContext.Provider value={{state, dispatch}}>
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
