import React, { useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { ResultsTable } from './components/ResultsTable';
import { TopBar } from './components/TopBar';
import { BottomBar } from './components/BottomBar';
import { setRawResults } from './state/actionCreators';
import { makeStyles } from '@material-ui/styles';
import { ThemeProvider } from '@material-ui/styles';
import { theme } from './theme';
import { results } from './results/results-synthetic';

const mapStateToProps = () => ({});

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  tableWrapper: {
    maxHeight: 'calc(100vh - 10.25rem)',
    overflow: 'auto',
  },
});

export function App({ dispatch }) {
  const classes = useStyles();

  useEffect(() => {
    dispatch(setRawResults(results));
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <TopBar></TopBar>
        <div className={classes.root}>
          <div className={classes.tableWrapper}>
            <ResultsTable />
          </div>
        </div>
        <BottomBar></BottomBar>
      </div>
    </ThemeProvider>
  );
}

export default connect(mapStateToProps)(App);
