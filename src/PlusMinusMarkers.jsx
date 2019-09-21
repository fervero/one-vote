import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import { SMALL_NUMBER } from './constants';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import IconButton from '@material-ui/core/IconButton';
const RED = '#D32F2F';
const GREEN = '#4CAF50';

const useStyles = makeStyles({
  add: { fontSize: '80%', color: GREEN },
  subtract: { fontSize: '80%', color: RED },
  highlit: { fontWeight: 900 },
  icon: { fontSize: '.75rem', marginLeft: '.5em', display: 'none' },
});

export const PlusMinusMarkers = ({ moreVotes, lessVotes }) => {
  const classes = useStyles();

  const handleClick = event => console.log(event);

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
      <HelpOutlineIcon
        className={classes.icon}
        onClick={handleClick}
      ></HelpOutlineIcon>
    </Fragment>
  );
};
