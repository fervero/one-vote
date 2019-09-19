import { cloneDeep } from 'lodash';
import { sumArray } from './arrayHelpers';

import {
  SET_RAW_RESULTS,
  SET_SINGLE_RESULTS,
  SET_PARTIES,
  SET_DISTRICTS,
} from './actions';

const DEFAULT_STATE = {
  votingDistricts: [],
  parties: [],
  resultsInAllDistricts: [[]],
};

function setRawResults(state, action) {
  const resultsInAllDistricts = action.value.majorPartiesResults;
  const summedPlanktonVotes = sumArray(action.value.planktonVotes);

  const newState = Object.assign({}, state, {
    resultsInAllDistricts,
    summedPlanktonVotes,
  });

  return newState;
}

function setResultsInSingleCell(state, action) {
  const { districtNumber, cellNumber, value } = action.value;
  const { resultsInAllDistricts } = state;
  const newResultsInDistricts = cloneDeep(resultsInAllDistricts);
  newResultsInDistricts[+districtNumber][+cellNumber] = value;

  const stateWithUpdatedResults = {
    resultsInAllDistricts: newResultsInDistricts,
    summedPlanktonVotes: state.summedPlanktonVotes,
  };

  const newState = Object.assign({}, state, stateWithUpdatedResults);

  return newState;
}

function setParties(state, action) {
  const parties = action.value;

  const indexesToDisplay = parties
    .map(({ display }, index) => (display ? index : null))
    .filter(x => x !== null);

  const newState = Object.assign({}, state, {
    parties,
    indexesToDisplay,
  });

  return newState;
}

function setDistricts(state, action) {
  const newState = Object.assign({}, state, {
    votingDistricts: [...action.value],
  });

  return newState;
}

export function rootReducer(state = DEFAULT_STATE, action = {}) {
  switch (action.type) {
    case SET_RAW_RESULTS: {
      return setRawResults(state, action);
    }
    case SET_PARTIES: {
      return setParties(state, action);
    }
    case SET_DISTRICTS: {
      return setDistricts(state, action);
    }
    case SET_SINGLE_RESULTS: {
      return setResultsInSingleCell(state, action);
    }
    default: {
      return state;
    }
  }
}
