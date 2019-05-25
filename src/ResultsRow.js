import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

const lastRow = () => (
  <TableCell>
    <Button size="small" color="primary">
      Count
    </Button>
  </TableCell>
);

const renderRow = (row, withButton) => [
  ...row.map(x => <TableCell>{x}</TableCell>),
  withButton ? lastRow() : <TableCell />,
];

export const ResultsRow = ({ row, withButton }) => (
  <TableRow>{renderRow(row, withButton)}</TableRow>
);
