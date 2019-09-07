import React, { useState, useEffect } from 'react';
import './App.css';
import { ResultsTable } from './ResultsTable.jsx';
import { elections } from './results-barrel';
import { TopBar } from './TopBar.jsx';

export const App = () => {
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

  return (
    <div className="App">
      <TopBar
        years={electionYears}
        selectYear={selectYear}
        activeYear={electionYear}
      ></TopBar>
      <ResultsTable results={parsedElectionResults} />
    </div>
  );
};

export default App;
