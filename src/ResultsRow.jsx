import React, { Fragment, useState } from 'react';
import TableRow from '@material-ui/core/TableRow';
import { minVotesToChangeSomething } from './dhondt-helpers';
import { TopResultsRow } from './TopResultsRow.jsx';
import { MiddleResultsRow } from './MiddleResultsRow.jsx';

export const ResultsRow = ({ row, seats, districtNumber, districtName }) => {
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
        <MiddleResultsRow row={values} seats={seats}></MiddleResultsRow>
      </TableRow>
    </Fragment>
  );
};
