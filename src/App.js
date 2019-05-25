import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as Papa from 'papaparse';
import { electionResults, parties } from './2015-gl-lis-okr.js';
import { ResultsTable } from './ResultsTable';

const parse = csvString =>
  new Promise(resolve => {
    Papa.parse(csvString, {
      complete: parsed => {
        const relevant = parsed.data.map(row => [
          ...row.slice(0, 2),
          ...row.slice(25, 33),
        ]);

        resolve(relevant);
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
