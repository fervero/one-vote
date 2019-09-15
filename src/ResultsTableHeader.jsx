import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { sumOfVectors } from './arrayHelpers';
import { selectSeatsWonInAllDistricts, selectSumOfVotes } from './selectors';

const mapStateToProps = state => ({
  parties: state.parties,
  seatsWonInAllDistricts: selectSeatsWonInAllDistricts(state),
  resultsInAllDistricts: state.resultsInAllDistricts || [],
  percentageVotesByParty: selectSumOfVotes(state).percentageVotesByParty,
});

const useStyles = makeStyles({
  numeric: {
    maxWidth: '1.25rem',
    textAlign: 'center',
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
    (100 * x).toFixed(1)
  );

  const sumOfSeatsByParty = seatsWonInAllDistricts.reduce(sumOfVectors);

  return (
    <TableRow>
      <TableCell className={[classes.numeric, classes.sticky].join(' ')}>
        Nr okręgu
      </TableCell>
      <TableCell className={[classes.name, classes.sticky].join(' ')}>
        Siedziba OKW
      </TableCell>
      {parties.map(({ name }, i) => (
        <TableCell
          key={i}
          className={[classes.numeric, classes.sticky].join(' ')}
        >
          {name} ({sumOfSeatsByParty[i]})
          <br />
          {formattedPercentageVotes[i]}%
        </TableCell>
      ))}
      <TableCell className={classes.sticky}></TableCell>
    </TableRow>
  );
}

export const ResultsTableHeader = connect(mapStateToProps)(
  ResultsTableHeaderComponent
);
