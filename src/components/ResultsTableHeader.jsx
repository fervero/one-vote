import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Filter8Icon from '@material-ui/icons/Filter8';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { sumOfVectors } from '../utilities/arrayHelpers';
import classNames from 'classnames';
import { HeaderTextInput } from './HeaderTextInput';

import {
  selectSeatsWonInAllDistricts,
  selectSumOfVotes,
  selectCountryWideParties,
  selectResultsInAllDistricts,
} from '../state/selectors';

const mapStateToProps = state => {
  const { percentageVotesByParty } = selectSumOfVotes(state);

  return {
    parties: selectCountryWideParties(state),
    seatsWonInAllDistricts: selectSeatsWonInAllDistricts(state),
    resultsInAllDistricts: selectResultsInAllDistricts(state),
    percentageVotesByParty,
  };
};

const useStyles = makeStyles({
  colData: {
    minWidth: '5.5rem',
    textAlign: 'right',
  },
  colName: {
    width: '10rem',
  },
  sticky: { zIndex: 100 },
  small: { transform: 'scale(0.8) translateY(.3em)' },
  nowrap: {
    whiteSpace: 'nowrap',
  },
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
      <TableCell className={classNames(classes.sticky, classes.colName)}>
        Okręg
      </TableCell>
      {parties.map(({ name, threshold }, i) => (
        <TableCell
          key={name}
          className={classNames(classes.sticky, classes.colData)}
        >
          <span className={classes.nowrap}>
            {name} ({sumOfSeatsByParty[i]})
            {threshold === 8 ? (
              <Tooltip title="8-procentowy próg wyborczy">
                <Filter8Icon
                  fontSize="small"
                  className={classes.small}
                ></Filter8Icon>
              </Tooltip>
            ) : null}
          </span>
          <br />
          {formattedPercentageVotes[i]}%
          <br />
          <HeaderTextInput columnNumber={i}></HeaderTextInput>
        </TableCell>
      ))}
    </TableRow>
  );
}

export const ResultsTableHeader = connect(mapStateToProps)(
  ResultsTableHeaderComponent
);
