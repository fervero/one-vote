import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export const TopBar = ({ years, selectYear, activeYear }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          {years.map(year =>
            year === activeYear ? (
              <Button
                color="secondary"
                onClick={selectYear(year)}
                key={year}
                value={year}
              >
                {year}
              </Button>
            ) : (
              <Button
                color="inherit"
                onClick={selectYear(year)}
                key={year}
                value={year}
              >
                {year}
              </Button>
            )
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};
