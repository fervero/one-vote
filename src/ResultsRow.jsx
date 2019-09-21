import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import TableCell from '@material-ui/core/TableCell';
import { DistrictNameCell } from './DistrictNameCell.jsx';
import { PlusMinusMarkers } from './PlusMinusMarkers';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { connect } from 'react-redux';
import { setSingleResults } from './actionCreators';
import { get as _get } from 'lodash';
import {
  selectVotesRequiredToChangeSth,
  selectSeatsWonInADistrict,
} from './selectors';
import classNames from 'classnames';
import { SMALL_NUMBER } from './constants';

const seatsLabel = n => {
  switch (n) {
    case 1: {
      return '\xa0mandat';
    }
    case 2:
    case 3:
    case 4: {
      return '\xa0mandaty';
    }
    default: {
      return '\xa0mandatów';
    }
  }
};

const mapStateToProps = (state, { rowNumber }) => {
  const district = (state.votingDistricts || [])[rowNumber];

  return {
    resultsInDistrict: state.resultsInAllDistricts[rowNumber],
    minVotesToChangeSomething: selectVotesRequiredToChangeSth(rowNumber)(state),
    districtName: _get(district, 'districtName'),
    districtNumber: _get(district, 'districtNumber'),
    seats: _get(district, 'seats'),
    seatsWonInDistrict: selectSeatsWonInADistrict(rowNumber)(state),
  };
};

const ACCENT = '#FFFFB6';

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
  highlit: { backgroundColor: ACCENT },
});

function ResultsRowComponent({
  minVotesToChangeSomething,
  districtNumber,
  districtName,
  resultsInDistrict,
  seatsWonInDistrict,
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
      <TableCell className={classes.numeric}>{districtNumber}</TableCell>
      <DistrictNameCell name={districtName}></DistrictNameCell>

      {(resultsInDistrict || []).map((x, i) => (
        <TableCell
          key={i}
          className={classNames(
            classes.numeric,
            moreVotes[i] < SMALL_NUMBER || lessVotes[i] > -SMALL_NUMBER
              ? classes.highlit
              : ''
          )}
        >
          <PlusMinusMarkers
            moreVotes={moreVotes[i]}
            lessVotes={lessVotes[i]}
          ></PlusMinusMarkers>
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
          <br />
          <span className={classes.unit}>
            {seatsWonInDistrict[i]}&nbsp;{seatsLabel(seatsWonInDistrict[i])}
          </span>
        </TableCell>
      ))}
    </Fragment>
  );
}

export const ResultsRow = connect(mapStateToProps)(ResultsRowComponent);
