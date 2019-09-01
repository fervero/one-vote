import React, { Fragment } from 'react';
import TableCell from '@material-ui/core/TableCell';
import * as dhondt from 'dhondt';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  numeric: {
    maxWidth: '1.25rem',
    textAlign: 'right',
  },
  unpadded: {
    paddingTop: '0',
  },
  unit: { fontSize: '80%', opacity: '.8', borderBottom: '0' },
});

const seatsLabel = n => {
  switch (n) {
    case 1: {
      return '\xa0mandat';
    }
    case 2:
    case 3:
    case 4: {
      return '\xa0mandaty';
    }
    default: {
      return '\xa0mandatów';
    }
  }
};

export const MiddleResultsRow = ({ row, seats }) => {
  const classes = useStyles();
  const electionResults = [...dhondt.compute(row.slice(2), seats)];

  return (
    <Fragment>
      {electionResults.map((x, i) => (
        <TableCell
          key={i}
          className={[classes.numeric, classes.unpadded].join(' ')}
        >
          {x}
          <span className={classes.unit}>{seatsLabel(x)}</span>
        </TableCell>
      ))}
      <TableCell className={classes.unpadded}></TableCell>
    </Fragment>
  );
};
