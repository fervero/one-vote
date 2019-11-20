import {
  SET_SINGLE_RESULTS,
  SET_RESULTS_IN_COLUMN,
  SET_PERCENTAGE_VOTES,
  SET_THRESHOLDS,
  SET_RAW_RESULTS,
  SET_YEAR,
  CREATE_COALITION,
  SET_METHOD,
} from './actions';

export function setRawResults(payload) {
  return {
    type: SET_RAW_RESULTS,
    payload,
  };
}

export function setYear(payload) {
  return {
    type: SET_YEAR,
    payload,
  };
}

export function setMethod(payload) {
  return {
    type: SET_METHOD,
    payload,
  };
}

export function setResultsInColumn(columnNumber, votes) {
  return {
    type: SET_RESULTS_IN_COLUMN,
    payload: {
      columnNumber,
      votes: +votes,
    },
  };
}

export function setThresholds(payload) {
  return {
    type: SET_THRESHOLDS,
    payload,
  };
}

export function setSingleResults(payload) {
  return {
    type: SET_SINGLE_RESULTS,
    payload,
  };
}

export function setPercentageVotes(payload) {
  return {
    type: SET_PERCENTAGE_VOTES,
    payload,
  };
}

export function createCoalition(payload) {
  return {
    type: CREATE_COALITION,
    payload,
  };
}
