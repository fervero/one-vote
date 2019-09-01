import React from 'react';
import './App.css';
import { ResultsTable } from './ResultsTable.jsx';
// import { parse } from './resultsHelpers';
// import { electionResults } from './2015-gl-lis-okr';
import { parse } from './resultsHelpers.2011.js';
import { electionResults } from './2011-kandydaci-sejm';

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
