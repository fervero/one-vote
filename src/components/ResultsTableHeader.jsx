import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { sumOfVectors } from '../utilities/arrayHelpers';
import classNames from 'classnames';
import { DebouncedTextField } from './DebouncedTextField';

import {
  selectSeatsWonInAllDistricts,
  selectSumOfVotes,
} from '../state/selectors';

const mapStateToProps = state => {
  const { percentageVotesByParty } = selectSumOfVotes(state);

  return {
    parties: state.parties,
    seatsWonInAllDistricts: selectSeatsWonInAllDistricts(state),
    resultsInAllDistricts: state.resultsInAllDistricts || [],
    percentageVotesByParty,
  };
};

const useStyles = makeStyles({
  narrow: {
    maxWidth: '1.25rem',
    textAlign: 'right',
  },
  medium: {
    width: '10rem',
  },
  name: { width: '6rem' },
  sticky: { zIndex: 100 },
});

function ResultsTableHeaderComponent({
  parties,
  seatsWonInAllDistricts,
  percentageVotesByParty,
}) {
  const classes = useStyles();

  const formattedPercentageVotes = percentageVotesByParty.map(x =>
    (100 * x).toFixed(2)
  );

  const sumOfSeatsByParty = seatsWonInAllDistricts.reduce(sumOfVectors);

  return (
    <TableRow>
      <TableCell className={classNames(classes.sticky, classes.medium)}>
        Okręg
      </TableCell>
      {parties.slice(0, parties.length - 1).map(({ name }, i) => (
        <TableCell
          key={i}
          className={classNames(classes.sticky, classes.narrow)}
        >
          {name} ({sumOfSeatsByParty[i]})
          <br />
          {formattedPercentageVotes[i]}%
          <br />
          <DebouncedTextField columnNumber={i}></DebouncedTextField>
        </TableCell>
      ))}
    </TableRow>
  );
}

export const ResultsTableHeader = connect(mapStateToProps)(
  ResultsTableHeaderComponent
);
