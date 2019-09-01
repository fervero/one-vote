import React, { Fragment } from 'react';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  numeric: {
    maxWidth: '1.25rem',
    textAlign: 'right',
  },
  name: { maxWidth: '12rem' },
  unit: { fontSize: '80%', opacity: '.8' },
});

export const TopResultsRow = ({ row, withButton, count }) => {
  const classes = useStyles();

  return (
    <Fragment>
      {row.map((x, i) => (
        <TableCell key={i} className={i === 1 ? classes.name : classes.numeric}>
          {x}

          {i > 1 ? <span className={classes.unit}> gł.</span> : null}
        </TableCell>
      ))}
      {withButton ? (
        <TableCell key={999}>
          <Button size="small" color="primary" onClick={count}>
            Przelicz
          </Button>
        </TableCell>
      ) : (
        <TableCell key={999} />
      )}
    </Fragment>
  );
};
