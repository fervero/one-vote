import React from 'react';
import logo from './logo.svg';
import './App.css';
import * as Papa from 'papaparse';
import { results } from './2015-gl-lis-okr.js';

const parser = csvString =>
  new Promise(resolve => {
    Papa.parse(results, {
      complete: parsed => {
        const relevant = parsed.data.map(row => row.slice(25));
        resolve(relevant);
      },
    });
  });

parser(results).then(console.table);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
