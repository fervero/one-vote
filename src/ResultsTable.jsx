import React, { useState } from 'react';
import { Table, TableBody, TableHead } from '@material-ui/core';
import { ResultsRow } from './ResultsRow.jsx';
import { seatsArray } from './2011-kandydaci-sejm';
import { ResultsTableHeader } from './ResultsTableHeader.jsx';

export function ResultsTable(props) {
  let electionResults = [];

  const resultsChange = rowNumber => results => {
    electionResults[rowNumber] = results;
    console.table(electionResults);
  };

  return props && props.results && props.results.length ? (
    <Table size="small" stickyHeader>
      <TableHead>
        <ResultsTableHeader row={props.results[0]}></ResultsTableHeader>
      </TableHead>
      <TableBody>
        {props.results.slice(1).map((x, i) => (
          <ResultsRow
            row={x.slice(2)}
            districtName={x[1]}
            districtNumber={x[0]}
            key={x[1]}
            seats={seatsArray[i]}
            resultsChange={resultsChange(i)}
          />
        ))}
      </TableBody>
    </Table>
  ) : (
    <span>no data</span>
  );
}
