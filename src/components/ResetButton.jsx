import React from 'react';
import { connect } from 'react-redux';
import { selectElectionYears } from '../state/selectors';
import { setYear } from '../state/actionCreators';
import Button from '@material-ui/core/Button';

const mapStateToProps = state => ({
  activeYear: state.year,
  years: selectElectionYears(state),
});

function ResetButtonComponent({ activeYear, dispatch }) {
  const reset = () => {
    dispatch(setYear(activeYear));
  };

  return activeYear ? (
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
  );
}

export const ResetButton = connect(mapStateToProps)(ResetButtonComponent);
