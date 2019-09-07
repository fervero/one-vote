import React from 'react';
import TableCell from '@material-ui/core/TableCell';

export function DistrictNameCell({ name }) {
  return (
    <TableCell rowSpan="2">
      <span>{name}</span>
    </TableCell>
  );
}
