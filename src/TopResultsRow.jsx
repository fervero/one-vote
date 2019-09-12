import React, { Fragment } from 'react';
import TableCell from '@material-ui/core/TableCell';
import { DistrictNameCell } from './DistrictNameCell.jsx';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { connect } from 'react-redux';
import { setSingleResults } from './actionCreators';
import { get as _get } from 'lodash';

const mapStateToProps = (state, { rowNumber }) => {
  const district = (state.votingDistricts || [])[rowNumber];

  return {
    resultsInDistrict: state.resultsInAllDistricts[rowNumber],
    districtName: _get(district, 'districtName'),
    districtNumber: _get(district, 'districtNumber'),
    seats: _get(district, 'seats'),
  };
};

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
  unit: { fontSize: '80%', opacity: '.8' },
  borderless: { borderBottom: '0' },
  add: { fontSize: '80%', color: GREEN },
  subtract: { fontSize: '80%', color: RED },
});

function TopResultsRowComponent({
  minVotesToChangeSomething,
  districtNumber,
  districtName,
  resultsInDistrict,
  dispatch,
}) {
  const { moreVotes, lessVotes } = minVotesToChangeSomething;
  const classes = useStyles();

  const onVotesChange = cellNumber => event => {
    const action = setSingleResults({
      districtNumber: districtNumber - 1,
      cellNumber,
      value: +event.target.value,
    });

    dispatch(action);
  };

  return (
    <Fragment>
      <TableCell rowSpan="2" className={classes.numeric}>
        {districtNumber}
      </TableCell>
      <DistrictNameCell name={districtName}></DistrictNameCell>

      {(resultsInDistrict || []).map((x, i) => (
        <TableCell
          key={i}
          className={[classes.numeric, classes.borderless].join(' ')}
        >
          <span className={classes.add}>
            {moreVotes[i] < Infinity ? '+' + moreVotes[i] : '-'}
          </span>
          /
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
}

export const TopResultsRow = connect(mapStateToProps)(TopResultsRowComponent);
