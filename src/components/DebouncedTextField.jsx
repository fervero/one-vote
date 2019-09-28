import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { DEBOUNCE_TIME } from '../constants';
import { connect } from 'react-redux';
import { selectSumOfVotes } from '../state/selectors';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { setResultsInColumn } from '../state/actionCreators';

const mapStateToProps = (state, { columnNumber }) => {
  const { sumOfVotesByParty } = selectSumOfVotes(state);

  return {
    value: sumOfVotesByParty[columnNumber],
  };
};

function DebouncedTextFieldComponent(props) {
  const { dispatch, columnNumber, value } = props;
  const [currentValue, setCurrentValue] = useState(value);
  const [stream$] = useState(new Subject());

  useEffect(() => {
    stream$.pipe(debounceTime(DEBOUNCE_TIME)).subscribe(value => {
      dispatch(setResultsInColumn(columnNumber, value));
    });
  });

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const handleChange = event => {
    const newValue = parseInt(event.target.value, 10);

    if (!!event.target.value && isNaN(newValue)) {
      return;
    }

    const value = newValue ? Math.max(newValue, 0) : 0;
    setCurrentValue(value);
    stream$.next(value);
  };

  return (
    <TextField
      value={currentValue}
      min="0"
      type="number"
      onChange={handleChange}
      InputProps={{
        endAdornment: <InputAdornment position="end">gł.</InputAdornment>,
      }}
    />
  );
}

export const DebouncedTextField = connect(mapStateToProps)(
  DebouncedTextFieldComponent
);
