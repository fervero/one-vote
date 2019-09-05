import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  numeric: {
    maxWidth: '1.25rem',
    textAlign: 'center',
  },
  name: { maxWidth: '12rem' },
});

export const ResultsTableHeader = ({ row, count }) => {
  const classes = useStyles();

  return (
    <TableRow>
      {row.map((x, i) => (
        <TableCell key={i} className={i === 1 ? classes.name : classes.numeric}>
          {x}
        </TableCell>
      ))}
      <TableCell></TableCell>
    </TableRow>
  );
};
