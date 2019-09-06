import React, { Fragment } from 'react';
import TableCell from '@material-ui/core/TableCell';
import { DistrictNameCell } from './DistrictNameCell.jsx';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

const RED = '#D32F2F';
const GREEN = '#4CAF50';

const useStyles = makeStyles({
  numeric: {
    maxWidth: '1.25rem',
    textAlign: 'right',
  },
  rite: {
    textAlign: 'right',
    fontSize: '8px !important',
  },
  name: { maxWidth: '12rem' },
  unit: { fontSize: '80%', opacity: '.8' },
  borderless: { borderBottom: '0' },
  add: { fontSize: '80%', color: GREEN },
  subtract: { fontSize: '80%', color: RED },
});

export const TopResultsRow = ({
  row,
  minVotesToChangeSomething,
  onVotesChange,
  districtNumber,
  districtName,
}) => {
  const { moreVotes, lessVotes } = minVotesToChangeSomething;
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
          <span className={classes.add}>+{moreVotes[i]}</span>/
          <span className={classes.subtract}>
            {lessVotes[i] > -Infinity ? lessVotes[i] : '-'}
          </span>
          <br />
          <TextField
            value={x}
            type="number"
            className={classes.rite}
            onChange={onVotesChange(i)}
            InputProps={{
              endAdornment: <InputAdornment position="end">gł.</InputAdornment>,
            }}
          />
        </TableCell>
      ))}
    </Fragment>
  );
};
