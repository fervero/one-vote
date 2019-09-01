import React, { useState, Fragment } from 'react';
import TableRow from '@material-ui/core/TableRow';
import { addVotes, subtractVotes } from './dhondt-helpers';
import { TopResultsRow } from './TopResultsRow.jsx';
import { BottomResultsRow } from './BottomResultsRow.jsx';
import { MiddleResultsRow } from './MiddleResultsRow.jsx';

const string2Number = stupidString => {
  const saneString = ('' + stupidString).replace(' ', '');
  return parseInt(saneString, 10);
};

export const ResultsRow = ({ row, seats, withButton }) => {
  const [expanded, toggleExpand] = useState(false);

  const count = () => {
    toggleExpand(!expanded);
    const votes = row.slice(2).map(string2Number);

    console.clear();
    console.log(row[1]);
    addVotes(votes, seats);
    subtractVotes(votes, seats);
  };

  return (
    <Fragment>
      <TableRow>
        <TopResultsRow
          row={row}
          withButton={withButton}
          count={count}
        ></TopResultsRow>
      </TableRow>
      <TableRow>
        <MiddleResultsRow row={row} seats={seats}></MiddleResultsRow>
      </TableRow>
      {expanded ? <BottomResultsRow row={row}></BottomResultsRow> : null}
    </Fragment>
  );
};
