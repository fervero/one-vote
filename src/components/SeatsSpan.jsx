import React from 'react';
import { makeStyles } from '@material-ui/styles';

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

const useStyles = makeStyles({
  unit: { fontSize: '80%', opacity: '.8' },
});

export const SeatsSpan = ({ seatsWonInDistrict }) => {
  const classes = useStyles();

  return (
    <span className={classes.unit}>
      {seatsWonInDistrict}&nbsp;{seatsLabel(seatsWonInDistrict)}
    </span>
  );
};
