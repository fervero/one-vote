import {
  SET_RAW_RESULTS,
  SET_SINGLE_RESULTS,
  SET_PARTIES,
  SET_THRESHOLDS,
  SET_DISTRICTS,
  SET_RESULTS_IN_COLUMN,
  SET_PERCENTAGE_VOTES,
} from './actions';

import { rawResultsReducer } from './rawResultsReducer';
import { resultsInCellReducer } from './resultsInCellReducer';
import { partiesReducer } from './partiesReducer';
import { districtsReducer } from './districtsReducer';
import { resultsInColumnReducer } from './resultsInColumnReducer';
import { percentageVotesReducer } from './percentageVotesReducer';

const DEFAULT_STATE = {
  votingDistricts: [],
  parties: [],
  resultsInAllDistricts: [[]],
  originalResultsInAllDistricts: [[]],
  planktonVotesInDistricts: [],
};

function thresholdsReducer(state, action) {
  const thresholds = action.value;
  const parties = state.parties.map(({ name, threshold }, i) => ({
    name,
    threshold: thresholds[i],
  }));

  return Object.assign({}, state, { parties });
}

export function rootReducer(state = DEFAULT_STATE, action = {}) {
  switch (action.type) {
    case SET_RAW_RESULTS: {
      return rawResultsReducer(state, action);
    }
    case SET_PARTIES: {
      return partiesReducer(state, action);
    }
    case SET_DISTRICTS: {
      return districtsReducer(state, action);
    }
    case SET_SINGLE_RESULTS: {
      return resultsInCellReducer(state, action);
    }
    case SET_RESULTS_IN_COLUMN: {
      return resultsInColumnReducer(state, action);
    }
    case SET_PERCENTAGE_VOTES: {
      return percentageVotesReducer(state, action);
    }
    case SET_THRESHOLDS: {
      return thresholdsReducer(state, action);
    }
    default: {
      return state;
    }
  }
}
