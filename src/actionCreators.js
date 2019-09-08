import {
  SET_RAW_RESULTS,
  SET_SINGLE_RESULTS,
  SET_PARTIES,
  SET_DISTRICTS,
} from './actions';

export function setResults(value) {
  return {
    type: SET_RAW_RESULTS,
    value,
  };
}

export function setParties(value) {
  return {
    type: SET_PARTIES,
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
