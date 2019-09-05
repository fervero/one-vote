import React from 'react';
import TableCell from '@material-ui/core/TableCell';

export const DistrictNameCell = ({ name }) => (
  <TableCell rowSpan="2">
    <span>{name}</span>
  </TableCell>
);
