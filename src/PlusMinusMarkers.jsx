import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import classNames from 'classnames';
import { SMALL_NUMBER } from './constants';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Popper from '@material-ui/core/Popper';
import { ClickAwayListener } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';

const RED = '#D32F2F';
const GREEN = '#4CAF50';

const useStyles = makeStyles({
  add: { fontSize: '80%', color: GREEN },
  subtract: { fontSize: '80%', color: RED },
  highlit: { fontWeight: 900 },
  icon: { fontSize: '.75rem', marginLeft: '.5em' },
  popper: { padding: '1.5em 2em 1em' },
  line: { maxWidth: '20em' },
});

const plusOrNone = moreVotes =>
  moreVotes !== null && moreVotes < Infinity ? (
    <span>
      <span style={{ color: GREEN }}>
        {moreVotes !== null && moreVotes < Infinity ? '+' + moreVotes : '-'}
      </span>
      : żeby lista zdobyła jeden więcej mandat w okręgu, potrzeba dokładnie{' '}
      <span style={{ color: GREEN }}>{moreVotes}</span> głosów więcej.
    </span>
  ) : (
    <span>
      <span style={{ color: GREEN }}>+</span>:Więcej mandatów już nie będzie.
    </span>
  );

const minusOrNone = lessVotes =>
  lessVotes !== null && lessVotes > -Infinity ? (
    <span>
      <span style={{ color: RED }}>
        {lessVotes !== null && lessVotes < Infinity ? lessVotes : '-'}
      </span>
      : żeby lista zdobyła jeden mniej mandat w okręgu, musi dostać dokładnie{' '}
      <span style={{ color: RED }}>{-lessVotes}</span> głosów mniej.
    </span>
  ) : (
    <span>
      <span style={{ color: RED }}>-</span>: mniej (niż zero) mandatów nie
      będzie.
    </span>
  );

export const PlusMinusMarkers = ({ moreVotes, lessVotes }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;

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
        {lessVotes !== null && lessVotes > -Infinity ? lessVotes : '-'}
      </span>
      <HelpOutlineIcon
        className={classes.icon}
        onClick={handleClick}
      ></HelpOutlineIcon>
      <Popper id={id} open={open} anchorEl={anchorEl} transition>
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClickAway}>
            <Fade {...TransitionProps} timeout={350}>
              {moreVotes < Infinity || lessVotes > -Infinity ? (
                <Paper className={classes.popper}>
                  <p className={classes.line}>{plusOrNone(moreVotes)}</p>
                  <p className={classes.line}>{minusOrNone(lessVotes)}</p>
                </Paper>
              ) : (
                <Paper className={classes.popper}>
                  <p className={classes.line}>
                    Dopóki lista nie przekroczy progu wyborczego na poziomie
                    kraju, w ogóle nie uczestniczy w podziale głosów.
                  </p>
                </Paper>
              )}
            </Fade>
          </ClickAwayListener>
        )}
      </Popper>
    </Fragment>
  );
};
