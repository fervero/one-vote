import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { selectElectionYears } from '../state/selectors';
import { setYear } from '../state/actionCreators';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'inline-flex',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const mapStateToProps = state => ({
  activeYear: state.year,
  years: selectElectionYears(state),
});

function YearSelectComponent({ years, activeYear, dispatch }) {
  const classes = useStyles();

  const selectYear = event => {
    dispatch(setYear(+event.target.value));
  };

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <NativeSelect
          value={activeYear || ''}
          onChange={selectYear}
          name="year"
          className={classes.selectEmpty}
          inputProps={{ 'aria-label': 'year' }}
        >
          <option value="" disabled="disabled"></option>
          {years.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </div>
  );
}

export const YearSelect = connect(mapStateToProps)(YearSelectComponent);
