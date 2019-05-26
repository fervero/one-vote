import React from 'react';
import './App.css';
import { electionResults } from './2015-gl-lis-okr.js';
import { ResultsTable } from './ResultsTable';
import { parse } from './resultsHelpers.js';

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
