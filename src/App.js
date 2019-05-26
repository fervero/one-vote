import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as Papa from 'papaparse';
import { electionResults, parties } from './2015-gl-lis-okr.js';
import { ResultsTable } from './ResultsTable';

const pickRelevant = row => [
  ...row.slice(0, 2),
  row[25],
  row[26],
  row[29],
  row[31],
  row[32],
];

const replaceHeader = row => [row[0], row[1], ...parties];

const parse = csvString =>
  new Promise(resolve => {
    Papa.parse(csvString, {
      complete: parsed => {
        const relevant = parsed.data.map(pickRelevant);
        const relevantWithReplacedHead = relevant.map((row, i) =>
          i > 0 ? row : replaceHeader(row)
        );

        resolve(relevantWithReplacedHead);
      },
    });
  });

class App extends React.Component {
  constructor() {
    super();
    this.state = {};

    parse(electionResults).then(parsedElectionResults =>
      this.setState({ parsedElectionResults })
    );
  }

  render() {
    return (
      <div className="App">
        <ResultsTable results={this.state.parsedElectionResults} />
      </div>
    );
  }
}

export default App;
