import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import TableCell from '@material-ui/core/TableCell';
import { ResultsCell } from './ResultsCell';
import { connect } from 'react-redux';
import { get as _get } from 'lodash';
import {
  selectVotesRequiredToChangeSth,
  selectSeatsWonInADistrict,
} from './selectors';

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

const useStyles = makeStyles({
  medium: {
    width: '10rem',
  },
});

function ResultsRowComponent({
  minVotesToChangeSomething,
  districtNumber,
  districtName,
  resultsInDistrict,
  seatsWonInDistrict,
}) {
  const { moreVotes, lessVotes } = minVotesToChangeSomething;
  const classes = useStyles();

  return (
    <Fragment>
      <TableCell className={classes.medium}>
        {districtNumber}. {districtName}
      </TableCell>

      {(resultsInDistrict || []).map((votes, i) => (
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
