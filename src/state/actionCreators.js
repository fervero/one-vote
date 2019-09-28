import {
  SET_RAW_RESULTS,
  SET_SINGLE_RESULTS,
  SET_RESULTS_IN_COLUMN,
  SET_PARTIES,
  SET_PERCENTAGE_VOTES,
  SET_DISTRICTS,
  SET_THRESHOLDS,
} from './actions';

export function setResults(value) {
  return {
    type: SET_RAW_RESULTS,
    value,
  };
}

export function setResultsInColumn(columnNumber, votes) {
  return {
    type: SET_RESULTS_IN_COLUMN,
    value: {
      columnNumber,
      votes: +votes,
    },
  };
}

export function setParties(value) {
  return {
    type: SET_PARTIES,
    value,
  };
}

export function setThresholds(value) {
  return {
    type: SET_THRESHOLDS,
    value,
  };
}

export function setDistricts(value) {
  return {
    type: SET_DISTRICTS,
    value,
  };
}

export function setSingleResults(value) {
  return {
    type: SET_SINGLE_RESULTS,
    value,
  };
}

export function setPercentageVotes(value) {
  return {
    type: SET_PERCENTAGE_VOTES,
    value,
  };
}
