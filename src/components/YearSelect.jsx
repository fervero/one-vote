import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';

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

export function YearSelect({ years, selectYear, activeYear }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <FormControl className={classes.formControl}>
        <NativeSelect
          value={activeYear || ''}
          onChange={selectYear}
          name="year"
          className={classes.selectEmpty}
          inputProps={{ 'aria-label': 'age' }}
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
