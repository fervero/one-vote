import React, { useState, useEffect } from 'react';
import './App.css';
import { ResultsTable } from './ResultsTable.jsx';
import { elections } from './results-barrel';
import { TopBar } from './TopBar.jsx';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  tableWrapper: {
    maxHeight: 'calc(100vh - 12rem)',
    overflow: 'auto',
  },
});

export function App() {
  const classes = useStyles();
  const [parsedElections, setElections] = useState([]);
  const [parsedElectionResults, updateElectionResults] = useState([]);
  const [electionYears, changeElectionYears] = useState([]);
  const [electionYear, setElectionYear] = useState(null);

  useEffect(() => {
    elections.then(resultsArray => setElections(resultsArray));
  }, []);

  useEffect(() => {
    elections.then(resultsArray => {
      const years = resultsArray.map(({ year }) => year);
      changeElectionYears(years);
    });
  }, []);

  useEffect(() => {
    elections.then(resultsArray => {
      updateElectionResults(resultsArray[0].results);
    });
  }, []);

  const selectYear = year => () => {
    setElectionYear(year);

    const yearInArray = parsedElections.find(
      election => election.year === year
    );

    updateElectionResults(yearInArray.results);
  };

  const poll = [0.434, 0.212, 0.141, 0.057, 0, 0, 0];

  const fromPoll = () => {
    setElectionYear(null);
    const { results } = parsedElections[0];

    const mappedResults = [
      [...results[0].slice(0, 2), 'PiS', 'KO', 'Lewica', 'PSL'],
      ...results
        .slice(1)
        .map(row =>
          row
            .slice(0, 6)
            .map((x, i) => (i < 2 ? x : Math.round(100000 * poll[i - 2])))
        ),
    ];

    updateElectionResults(mappedResults);
  };

  return (
    <div className="App">
      <TopBar
        years={electionYears}
        selectYear={selectYear}
        fromPoll={fromPoll}
        activeYear={electionYear}
      ></TopBar>
      <div className={classes.root}>
        <div className={classes.tableWrapper}>
          <ResultsTable results={parsedElectionResults} />
        </div>
      </div>
    </div>
  );
}

export default App;
