import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  partyNames: state.partyNames,
  seatsWonInAllDistricts: state.seatsWonInAllDistricts,
});

const useStyles = makeStyles({
  numeric: {
    maxWidth: '1.25rem',
    textAlign: 'center',
  },
  name: { width: '6rem' },
  sticky: { zIndex: 100 },
});

function ResultsTableHeaderComponent({ partyNames, seatsWonInAllDistricts }) {
  const classes = useStyles();

  const sumOfSeatsByParty = seatsWonInAllDistricts.reduce((rowA, rowB) =>
    rowA.map((x, i) => x + rowB[i])
  );

  return (
    <TableRow>
      <TableCell className={[classes.numeric, classes.sticky].join(' ')}>
        Nr okręgu
      </TableCell>
      <TableCell className={[classes.name, classes.sticky].join(' ')}>
        Siedziba OKW
      </TableCell>
      {partyNames.map((x, i) => (
        <TableCell
          key={i}
          className={[classes.numeric, classes.sticky].join(' ')}
        >
          {x} ({sumOfSeatsByParty[i]})
        </TableCell>
      ))}
      <TableCell className={classes.sticky}></TableCell>
    </TableRow>
  );
}

export const ResultsTableHeader = connect(mapStateToProps)(
  ResultsTableHeaderComponent
);
