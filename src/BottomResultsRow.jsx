import React from 'react';
import TableCell from '@material-ui/core/TableCell';

export const BottomResultsRow = ({ row }) => {
  return <TableCell colspan={row.length + 1}>foo bar baz </TableCell>;
};
