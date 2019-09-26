import React, { Component } from 'react';
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

class DebouncedTextFieldComponent extends Component {
  stream$ = new Subject();

  constructor(props) {
    super(props);
    const { value } = props;
    this.state = { value };
    this.stream$
      .pipe(debounceTime(DEBOUNCE_TIME))
      .subscribe(value => this.dispatchChange(value));
  }

  onChange = e => {
    this.setState({ value: +e.target.value });
    this.stream$.next(+e.target.value);
  };

  dispatchChange = value => {
    this.props.dispatch(setResultsInColumn(this.props.columnNumber, value));
  };

  render() {
    return (
      <TextField
        value={this.state.value}
        min="0"
        type="number"
        onChange={this.onChange}
        InputProps={{
          endAdornment: <InputAdornment position="end">gł.</InputAdornment>,
        }}
      />
    );
  }
}

export const DebouncedTextField = connect(mapStateToProps)(
  DebouncedTextFieldComponent
);
