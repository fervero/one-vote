import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { PollButton } from './PollButton';
import { YearSelect } from './YearSelect';
import { setYear } from '../state/actionCreators';
import { connect } from 'react-redux';
import { selectElectionYears } from '../state/selectors';
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

const mapStateToProps = state => ({
  activeYear: state.year,
  years: selectElectionYears(state),
});

function TopBarComponent({ years, activeYear, dispatch }) {
  const classes = useStyles();

  const selectYear = event => {
    dispatch(setYear(+event.target.value));
  };

  const reset = () => {
    dispatch(setYear(activeYear));
  };

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
        <YearSelect
          years={years}
          selectYear={selectYear}
          activeYear={activeYear}
        ></YearSelect>
        {activeYear ? <PollButton></PollButton> : ''}
        {activeYear ? (
          <Button
            variant="contained"
            size="small"
            style={{ marginLeft: '1rem' }}
            onClick={reset}
          >
            Resetuj
          </Button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export const TopBar = connect(mapStateToProps)(TopBarComponent);
