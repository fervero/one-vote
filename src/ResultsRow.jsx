import React, { Fragment, useState } from 'react';
import TableRow from '@material-ui/core/TableRow';
import { minVotesToChangeSomething } from './dhondt-helpers';
import { TopResultsRow } from './TopResultsRow.jsx';
import { MiddleResultsRow } from './MiddleResultsRow.jsx';

export const ResultsRow = ({ row, seats }) => {
  const [values, setValues] = useState([...row]);

  const onVotesChange = index => event => {
    setValues(values.map((x, i) => (i === index ? event.target.value : x)));
  };

  const minVotes = minVotesToChangeSomething(row, seats);

  return (
    <Fragment>
      <TableRow>
        <TopResultsRow
          row={values}
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
