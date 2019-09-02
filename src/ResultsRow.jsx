import React, { useState, Fragment } from 'react';
import TableRow from '@material-ui/core/TableRow';
import { minVotesToChangeSomething } from './dhondt-helpers';
import { TopResultsRow } from './TopResultsRow.jsx';
import { MiddleResultsRow } from './MiddleResultsRow.jsx';

export const ResultsRow = ({ row, seats }) => {
  const foo = minVotesToChangeSomething(row, seats);

  const count = () => {};

  return (
    <Fragment>
      <TableRow>
        <TopResultsRow
          row={row}
          count={count}
          minVotesToChangeSomething={foo}
        ></TopResultsRow>
      </TableRow>
      <TableRow>
        <MiddleResultsRow row={row} seats={seats}></MiddleResultsRow>
      </TableRow>
    </Fragment>
  );
};
