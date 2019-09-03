import React from 'react';
import TableCell from '@material-ui/core/TableCell';

export const DistrictNameCell = ({ name, minVotesToChangeSomething }) => (
  <TableCell rowSpan="2">
    <span>{name}</span>
    <br />
    Minimalna liczba wyborców:{' ' + minVotesToChangeSomething}
  </TableCell>
);
