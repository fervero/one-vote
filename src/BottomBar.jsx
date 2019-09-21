import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles(theme => ({
  bottomBar: {
    bottom: 0,
    position: 'fixed',
  },
  right: {
    justifyContent: 'flex-end',
    paddingRight: '3rem',
  },
}));

export function BottomBar() {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.bottomBar}>
      <Toolbar className={classes.right}>by Maciej Bójko, 2019</Toolbar>
    </AppBar>
  );
}
