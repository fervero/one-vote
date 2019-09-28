import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Filter8Icon from '@material-ui/icons/Filter8';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { sumOfVectors } from '../utilities/arrayHelpers';
import classNames from 'classnames';
import { DebouncedTextField } from './DebouncedTextField';

import {
  selectSeatsWonInAllDistricts,
  selectSumOfVotes,
  selectCountryWideParties,
} from '../state/selectors';

const mapStateToProps = state => {
  const { percentageVotesByParty } = selectSumOfVotes(state);

  return {
    parties: selectCountryWideParties(state),
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
  small: { transform: 0.8 },
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
      {parties.map(({ name, threshold }, i) => (
        <TableCell
          key={name}
          className={classNames(classes.sticky, classes.narrow)}
        >
          {name} ({sumOfSeatsByParty[i]})
          {threshold === 8 ? (
            <Tooltip title="8-procentowy próg wyborczy">
              <Filter8Icon
                fontSize="small"
                className={classes.small}
              ></Filter8Icon>
            </Tooltip>
          ) : null}
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
