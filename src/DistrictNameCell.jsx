import React from 'react';
import TableCell from '@material-ui/core/TableCell';

export function DistrictNameCell({ name }) {
  return (
    <TableCell>
      <span>{name}</span>
    </TableCell>
  );
}
