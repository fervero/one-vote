import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import TableCell from '@material-ui/core/TableCell';
import { ResultsCell } from './ResultsCell';
import { connect } from 'react-redux';

import {
  selectVotesRequiredToChangeSth,
  selectSeatsWonInADistrict,
  selectDistrictName,
  selectDistrictNumber,
  selectDistrictSeats,
  selectResultsInSingleDistrict,
} from '../state/selectors';

const mapStateToProps = (state, { rowNumber }) => ({
  resultsInDistrict: selectResultsInSingleDistrict(rowNumber)(state),
  minVotesToChangeSomething: selectVotesRequiredToChangeSth(rowNumber)(state),
  districtName: selectDistrictName(rowNumber)(state),
  districtNumber: selectDistrictNumber(rowNumber)(state),
  seats: selectDistrictSeats(rowNumber)(state),
  seatsWonInDistrict: selectSeatsWonInADistrict(rowNumber)(state),
});

const useStyles = makeStyles({
  medium: {
    width: '10rem',
  },
  seats: {
    fontWeight: 500,
  },
});

function ResultsRowComponent({
  minVotesToChangeSomething,
  districtNumber,
  districtName,
  resultsInDistrict,
  seatsWonInDistrict,
  seats,
}) {
  const { moreVotes, lessVotes } = minVotesToChangeSomething;
  const classes = useStyles();
  const length = (resultsInDistrict || []).length;

  return (
    <Fragment>
      <TableCell className={classes.medium}>
        {districtNumber}. {districtName}{' '}
        <span className={classes.seats}>({seats})</span>
      </TableCell>

      {(resultsInDistrict || []).slice(0, length - 1).map((votes, i) => (
        <ResultsCell
          key={i}
          moreVotes={moreVotes[i]}
          lessVotes={lessVotes[i]}
          votes={votes}
          cellNumber={i}
          districtNumber={districtNumber}
          seatsWonInDistrict={seatsWonInDistrict[i]}
        ></ResultsCell>
      ))}
    </Fragment>
  );
}

export const ResultsRow = connect(mapStateToProps)(ResultsRowComponent);
