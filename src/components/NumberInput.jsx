import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

export function NumberInput(props) {
  const testValidity = value =>
    !isNaN(value) && value >= props.min && value <= props.max;

  const [valid, setValid] = useState(testValidity(props.value));

  const handleChange = event => {
    const value = parseFloat(event.target.value);
    const validity = testValidity(value);
    setValid(validity);
    props.onChange({ value, validity });
  };

  return (
    <TextField
      type="number"
      step="0.01"
      error={!valid}
      InputProps={{
        endAdornment: <InputAdornment position="end">%</InputAdornment>,
      }}
      {...props}
      onChange={handleChange}
    />
  );
}
