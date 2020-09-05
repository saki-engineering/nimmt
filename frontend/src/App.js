import React, { useReducer } from 'react';
import './App.css';
import { AppContext } from './contexts/appContexts';
import { AppReducer } from './reducers/AppReducer';
import CountBoard from './components/CountBoard';

function App() {
  const initialState = {
    isPlayed : Array(105).fill(false)
  };

  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <div id="app" className="App">
      <AppContext.Provider value={{state, dispatch}}>
        <body>
          <CountBoard />
        </body>
      </AppContext.Provider>
    </div>
  );
}

export default App;
