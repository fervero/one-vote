import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { PollButton } from './PollButton';
import { CoalitionButton } from './CoalitionButton';
import { YearSelect } from './YearSelect';
import { connect } from 'react-redux';
import { MethodSelect } from './MethodSelect';
import { ResetButton } from './ResetButton';

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

const mapStateToProps = ({ year }) => ({ activeYear: year });

function TopBarComponent({ activeYear }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <a
              href={window.location.href}
              style={{ color: 'inherit', textDecoration: 'inherit' }}
            >
              &bdquo;Jeden głos nic nie znaczy&rdquo;
            </a>
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.buttons}>
        <span className={classes.label}>Wyniki wyborów z roku:</span>
        <YearSelect></YearSelect>
        <span className={classes.label}>Metoda:</span>
        <MethodSelect></MethodSelect>
        {activeYear ? <PollButton></PollButton> : ''}
        {activeYear ? <CoalitionButton></CoalitionButton> : ''}
        <ResetButton />
      </div>
    </div>
  );
}

export const TopBar = connect(mapStateToProps)(TopBarComponent);
