import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

export const BottomResultsRow = ({ row, positiveMinimum, negativeMaximum }) => {
  return (
    <TableRow>
      <TableCell colSpan={row.length + 1}>
        Wystarczyłoby, żeby <b>{positiveMinimum}</b> wyborców więcej poszło do
        urn, by zmienić wynik wyborów w okręgu. <br /> Z drugiej strony,
        wystarczyłoby, żeby <b>{-negativeMaximum}</b> wyborców zostało w domu
        zamiast głosować, by zmienić wynik wyborów w okręgu.
      </TableCell>
    </TableRow>
  );
};
