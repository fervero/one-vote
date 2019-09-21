import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
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
  highlit: {
    fontWeight: 900,
    textDecoration: 'underline',
  },
  label: {
    marginRight: '2rem',
  },
  buttons: {
    padding: '.25rem 0 0 1rem',
  },
}));

export function TopBar({ years, selectYear, activeYear }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            &bdquo;Jeden głos nic nie znaczy&rdquo;
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.buttons}>
        <span className={classes.label}>Wyniki wyborów z roku:</span>
        {years.map(year => (
          <Button
            color="inherit"
            onClick={selectYear(year)}
            key={year}
            value={year}
            className={year === activeYear ? classes.highlit : ''}
          >
            {year}
          </Button>
        ))}
      </div>
    </div>
  );
}
