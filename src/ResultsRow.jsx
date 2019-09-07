import React, { Fragment, useState, useEffect } from 'react';
import TableRow from '@material-ui/core/TableRow';
import { minVotesToChangeSomething } from './dhondt-helpers';
import { TopResultsRow } from './TopResultsRow.jsx';
import { MiddleResultsRow } from './MiddleResultsRow.jsx';
import * as dhondt from 'dhondt';

export function ResultsRow({
  row,
  seats,
  districtNumber,
  districtName,
  resultsChange,
}) {
  const [electionResults, setElectionResults] = useState([]);

  useEffect(() => {
    updateValues([...row]);
    updateMinVotes(minVotesToChangeSomething([...row], seats));
    const newResults = [...dhondt.compute(row, seats)];
    setElectionResults(newResults);
    resultsChange(newResults);
  }, [row, seats, resultsChange]);

  const [values, updateValues] = useState([...row]);

  const [minVotes, updateMinVotes] = useState(
    minVotesToChangeSomething(row, seats)
  );

  const onVotesChange = index => event => {
    const newValues = values.map((x, i) =>
      i === index ? event.target.value : x
    );

    updateValues(newValues);
    updateMinVotes(minVotesToChangeSomething(newValues, seats));
    const newResults = [...dhondt.compute(newValues, seats)];
    setElectionResults(newResults);
    resultsChange(newResults);
  };

  return (
    <Fragment>
      <TableRow>
        <TopResultsRow
          row={values}
          districtNumber={districtNumber}
          districtName={districtName}
          minVotesToChangeSomething={minVotes}
          onVotesChange={onVotesChange}
        ></TopResultsRow>
      </TableRow>
      <TableRow>
        <MiddleResultsRow
          row={values}
          seats={seats}
          electionResults={electionResults}
        ></MiddleResultsRow>
      </TableRow>
    </Fragment>
  );
}
