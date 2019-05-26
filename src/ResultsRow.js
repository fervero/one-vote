import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { addVotes, subtractVotes } from './dhondt-helpers';

const cleanString = stupidString => ('' + stupidString).replace(' ', '');

const string2Number = stupidString => {
  const saneString = cleanString(stupidString);
  return parseInt(saneString, 10);
};

export const ResultsRow = ({ row, seats, withButton }) => {
  const count = () => {
    const votes = row.slice(2).map(string2Number);

    console.clear();
    console.log(row[1]);
    addVotes(votes, seats);
    subtractVotes(votes, seats);
  };

  const lastRow = row => (
    <TableCell key={999}>
      <Button size="small" color="primary" onClick={count}>
        Przelicz
      </Button>
    </TableCell>
  );

  const renderRow = (row, withButton) => [
    ...row.map((x, i) => <TableCell key={i}>{x}</TableCell>),
    withButton ? lastRow(row) : <TableCell key={999} />,
  ];

  return <TableRow>{renderRow(row, withButton)}</TableRow>;
};
