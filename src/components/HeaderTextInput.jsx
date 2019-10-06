import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { connect } from 'react-redux';
import { selectSumOfVotes } from '../state/selectors';
import { setResultsInColumn } from '../state/actionCreators';

const mapStateToProps = (state, { columnNumber }) => {
  const { sumOfVotesByParty } = selectSumOfVotes(state);

  return {
    value: sumOfVotesByParty[columnNumber],
  };
};

function HeaderTextInputComponent(props) {
  const { dispatch, columnNumber, value } = props;
  const [currentValue, setCurrentValue] = useState(value);

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
    dispatch(setResultsInColumn(columnNumber, value));
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

export const HeaderTextInput = connect(mapStateToProps)(
  HeaderTextInputComponent
);
