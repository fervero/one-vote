import React, { useState, useEffect } from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './state/store';
import { ResultsTable } from './components/ResultsTable';
import { elections } from './results/results-barrel';
import { TopBar } from './components/TopBar';
import { BottomBar } from './components/BottomBar';
import { setResults, setParties, setDistricts } from './state/actionCreators';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  tableWrapper: {
    maxHeight: 'calc(100vh - 10.25rem)',
    overflow: 'auto',
  },
});

export function App() {
  const classes = useStyles();
  const [parsedElections, setElections] = useState([]);
  const [electionYears, changeElectionYears] = useState([]);
  const [electionYear, setElectionYear] = useState(null);

  useEffect(() => {
    elections.then(resultsArray => {
      const years = resultsArray.map(({ year }) => year);
      changeElectionYears(years);
      setElections(resultsArray);
    });
  }, []);

  const selectYear = year => () => {
    setElectionYear(year);

    const yearInArray = parsedElections.find(
      election => election.year === year
    );

    const { results, planktonVotes, seatsArray } = yearInArray;

    store.dispatch(
      setDistricts(
        results.slice(1).map(([districtNumber, districtName], i) => ({
          districtNumber,
          districtName,
          seats: seatsArray[i],
        }))
      )
    );

    store.dispatch(setParties(results[0].slice(2)));
    const majorPartiesResults = results.slice(1).map(row => row.slice(2));

    store.dispatch(setResults({ majorPartiesResults, planktonVotes }));
  };

  return (
    <Provider store={store}>
      <div className="App">
        <TopBar
          years={electionYears}
          selectYear={selectYear}
          activeYear={electionYear}
        ></TopBar>
        <div className={classes.root}>
          <div className={classes.tableWrapper}>
            <ResultsTable />
          </div>
        </div>
        <BottomBar></BottomBar>
      </div>
    </Provider>
  );
}

export default App;
