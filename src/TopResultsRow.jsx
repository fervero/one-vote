import React, { Fragment } from 'react';
import TableCell from '@material-ui/core/TableCell';
import { DistrictNameCell } from './DistrictNameCell.jsx';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  numeric: {
    maxWidth: '1.25rem',
    textAlign: 'right',
  },
  name: { maxWidth: '12rem' },
  unit: { fontSize: '80%', opacity: '.8' },
  borderless: { borderBottom: '0' },
});

export const TopResultsRow = ({ row, minVotesToChangeSomething }) => {
  const classes = useStyles();

  return (
    <Fragment>
      <TableCell rowSpan="2" className={classes.numeric}>
        {row[0]}
      </TableCell>
      <DistrictNameCell
        name={row[1]}
        minVotesToChangeSomething={minVotesToChangeSomething}
      ></DistrictNameCell>

      {row.slice(2).map((x, i) => (
        <TableCell
          key={i + 2}
          className={[classes.numeric, classes.borderless].join(' ')}
        >
          {x}
          <span className={classes.unit}>&nbsp;gł.</span>
        </TableCell>
      ))}
    </Fragment>
  );
};
