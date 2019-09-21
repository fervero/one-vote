import React from 'react';
import { makeStyles } from '@material-ui/styles';
import TableCell from '@material-ui/core/TableCell';
import { SeatsSpan } from './SeatsSpan';
import { PlusMinusMarkers } from './PlusMinusMarkers';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { setSingleResults } from './actionCreators';
import { SMALL_NUMBER } from './constants';
import classNames from 'classnames';
import { connect } from 'react-redux';

const mapStateToProps = () => ({});

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
  medium: {
    width: '10rem',
  },
  highlit: { backgroundColor: ACCENT },
});

function ResultsCellComponent({
  moreVotes,
  lessVotes,
  votes,
  districtNumber,
  cellNumber,
  seatsWonInDistrict,
  dispatch,
}) {
  const classes = useStyles();

  const onVotesChange = event => {
    const action = setSingleResults({
      districtNumber: districtNumber - 1,
      cellNumber,
      value: +event.target.value,
    });

    dispatch(action);
  };

  return (
    <TableCell
      className={classNames(
        classes.numeric,
        moreVotes < SMALL_NUMBER || lessVotes > -SMALL_NUMBER
          ? classes.highlit
          : ''
      )}
    >
      <PlusMinusMarkers
        moreVotes={moreVotes}
        lessVotes={lessVotes}
      ></PlusMinusMarkers>
      <br />
      <TextField
        value={votes}
        type="number"
        className={classes.rite}
        onChange={onVotesChange}
        InputProps={{
          endAdornment: <InputAdornment position="end">gł.</InputAdornment>,
        }}
      />
      <br />
      <SeatsSpan seatsWonInDistrict={seatsWonInDistrict}></SeatsSpan>
    </TableCell>
  );
}

export const ResultsCell = connect(mapStateToProps)(ResultsCellComponent);
