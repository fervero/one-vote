import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import { SMALL_NUMBER } from './constants';
const RED = '#D32F2F';
const GREEN = '#4CAF50';

const useStyles = makeStyles({
  add: { fontSize: '80%', color: GREEN },
  subtract: { fontSize: '80%', color: RED },
  highlit: { fontWeight: 900 },
});

export const PlusMinusMarkers = ({ moreVotes, lessVotes }) => {
  const classes = useStyles();
  return (
    <Fragment>
      <span
        className={classNames(
          classes.add,
          moreVotes < SMALL_NUMBER ? classes.highlit : ''
        )}
      >
        {moreVotes !== null && moreVotes < Infinity ? '+' + moreVotes : '-'}
      </span>
      /
      <span
        className={classNames(
          classes.subtract,
          lessVotes > -SMALL_NUMBER ? classes.highlit : ''
        )}
      >
        {moreVotes !== null && lessVotes > -Infinity ? lessVotes : '-'}
      </span>
    </Fragment>
  );
};
