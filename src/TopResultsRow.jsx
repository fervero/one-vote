import React, { Fragment } from 'react';
import TableCell from '@material-ui/core/TableCell';
import { DistrictNameCell } from './DistrictNameCell.jsx';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles({
  numeric: {
    maxWidth: '1.25rem',
    textAlign: 'right',
  },
  rite: {
    textAlign: 'right',
  },
  name: { maxWidth: '12rem' },
  unit: { fontSize: '80%', opacity: '.8' },
  borderless: { borderBottom: '0' },
});

export const TopResultsRow = ({
  row,
  minVotesToChangeSomething,
  onVotesChange,
  districtNumber,
  districtName,
}) => {
  const classes = useStyles();

  return (
    <Fragment>
      <TableCell rowSpan="2" className={classes.numeric}>
        {districtNumber}
      </TableCell>
      <DistrictNameCell name={districtName}></DistrictNameCell>

      {row.map((x, i) => (
        <TableCell
          key={i + 2}
          className={[classes.numeric, classes.borderless].join(' ')}
        >
          <Input
            value={x}
            type="number"
            onChange={onVotesChange(i)}
            className={classes.rite}
            endAdornment={<InputAdornment position="end">gł.</InputAdornment>}
          />
        </TableCell>
      ))}
    </Fragment>
  );
};
