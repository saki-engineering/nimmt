import React, { useReducer } from 'react';
import './App.css';
import { AppContext } from './contexts/appContexts';
import { AppReducer } from './reducers/AppReducer';
import CountBoard from './components/CountBoard';
import DropBox from './components/DropBox';
import ResetButton from './components/ResetButton';
import { Grid, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '5%',
    paddingBottom: '5%',
  },
}));

function App() {
  const classes = useStyles();

  const initialState = {
    isPlayed : Array(105).fill(false)
  };

  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <div id="app" className="App">
      <AppContext.Provider value={{state, dispatch}}>
        <body>
        <Container fixed className={classes.root}>
          <Grid container>
            <Grid item xs={8}>
              <CountBoard />
            </Grid>
            <Grid item xs={4}>
              <DropBox />
            </Grid>
          </Grid>
          <ResetButton></ResetButton>
        </Container>
        </body>
      </AppContext.Provider>
    </div>
  );
}

export default App;
