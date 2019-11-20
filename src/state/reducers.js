import {
  CREATE_COALITION,
  SET_PERCENTAGE_VOTES,
  SET_RAW_RESULTS,
  SET_RESULTS_IN_COLUMN,
  SET_SINGLE_RESULTS,
  SET_THRESHOLDS,
  SET_YEAR,
  SET_METHOD,
} from './actions';

import { percentageVotesReducer } from './percentageVotesReducer';
import { rawResultsForAllYearsReducer } from './rawResultsForAllYearsReducer';
import { resultsInCellReducer } from './resultsInCellReducer';
import { resultsInColumnReducer } from './resultsInColumnReducer';
import { thresholdsReducer } from './thresholdsReducer';
import { yearReducer } from './yearReducer';
import { coalitionReducer } from './coalitionReducer';
import { methodReducer } from './methodReducer';
import { DHONDT } from '../constants';

const DEFAULT_STATE = {
  votingDistricts: [],
  parties: [],
  resultsInAllDistricts: [[]],
  originalResultsInAllDistricts: [[]],
  planktonVotesInDistricts: [],
  originalResultsForAllElections: [],
  countingMethod: DHONDT,
  year: null,
};

export function rootReducer(state = DEFAULT_STATE, action = {}) {
  switch (action.type) {
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
    case SET_RAW_RESULTS: {
      return rawResultsForAllYearsReducer(state, action);
    }
    case SET_YEAR: {
      return yearReducer(state, action);
    }
    case CREATE_COALITION: {
      return coalitionReducer(state, action);
    }
    case SET_METHOD: {
      return methodReducer(state, action);
    }
    default: {
      return state;
    }
  }
}
