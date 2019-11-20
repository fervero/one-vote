import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { selectCountingMethod } from '../state/selectors';
import { COUNTING_METHODS } from '../constants';
import { setMethod } from '../state/actionCreators';

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
  countingMethod: selectCountingMethod(state),
});

function MethodSelectComponent({ countingMethod, dispatch }) {
  const classes = useStyles();

  const selectMethod = event => dispatch(new setMethod(event.target.value));

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <NativeSelect
          value={countingMethod || ''}
          onChange={selectMethod}
          name="year"
          className={classes.selectEmpty}
          inputProps={{ 'aria-label': 'method' }}
        >
          <option value="" disabled="disabled"></option>
          {COUNTING_METHODS.map(method => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </div>
  );
}

export const MethodSelect = connect(mapStateToProps)(MethodSelectComponent);
