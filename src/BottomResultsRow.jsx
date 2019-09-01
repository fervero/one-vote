import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

export const BottomResultsRow = ({ row }) => {
  return (
    <TableRow>
      <TableCell colSpan={row.length + 1}>foo bar baz </TableCell>
    </TableRow>
  );
};
