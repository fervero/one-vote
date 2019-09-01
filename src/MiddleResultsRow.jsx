import React, { Fragment } from 'react';
import TableCell from '@material-ui/core/TableCell';
import Button from '@material-ui/core/Button';

export const MiddleResultsRow = ({ row, withButton, count }) => {
  return (
    <Fragment>
      {row.map((x, i) => (
        <TableCell key={i}>{x}</TableCell>
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
