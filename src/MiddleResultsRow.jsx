import React, { Fragment } from 'react';
import TableCell from '@material-ui/core/TableCell';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';

const mapStateToProps = (state, { rowNumber }) => ({
  seatsWonInDistrict: state.seatsWonInAllDistricts[rowNumber],
});

const useStyles = makeStyles({
  numeric: {
    maxWidth: '1.25rem',
    textAlign: 'right',
  },
  unpadded: {
    paddingTop: '0',
  },
  unit: { fontSize: '80%', opacity: '.8', borderBottom: '0' },
});

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

function MiddleResultsRowComponent({ seatsWonInDistrict }) {
  const classes = useStyles();

  return (
    <Fragment>
      {(seatsWonInDistrict || []).map((x, i) => (
        <TableCell
          key={i}
          className={[classes.numeric, classes.unpadded].join(' ')}
        >
          <span className={classes.unit}>
            {x}&nbsp;{seatsLabel(x)}
          </span>
        </TableCell>
      ))}
      <TableCell className={classes.unpadded}></TableCell>
    </Fragment>
  );
}

export const MiddleResultsRow = connect(mapStateToProps)(
  MiddleResultsRowComponent
);
