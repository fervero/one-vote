import React, { Fragment } from 'react';
import TableCell from '@material-ui/core/TableCell';
import { DistrictNameCell } from './DistrictNameCell.jsx';
import { makeStyles } from '@material-ui/styles';
import Input from '@material-ui/core/Input';

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
          +{moreVotes[i]}/{lessVotes[i]}
          <Input
            variant="outlined"
            value={x}
            type="number"
            className={classes.rite}
            onChange={onVotesChange(i)}
          />
        </TableCell>
      ))}
    </Fragment>
  );
};
