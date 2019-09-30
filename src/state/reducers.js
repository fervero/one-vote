import {
  SET_SINGLE_RESULTS,
  SET_THRESHOLDS,
  SET_RESULTS_IN_COLUMN,
  SET_PERCENTAGE_VOTES,
  SET_RAW_RESULTS,
  SET_YEAR,
} from './actions';

import { resultsInCellReducer } from './resultsInCellReducer';
import { resultsInColumnReducer } from './resultsInColumnReducer';
import { percentageVotesReducer } from './percentageVotesReducer';
import { thresholdsReducer } from './thresholdsReducer';
import { rawResultsForAllYearsReducer } from './rawResultsForAllYearsReducer';
import { yearReducer } from './yearReducer';

const DEFAULT_STATE = {
  votingDistricts: [],
  parties: [],
  resultsInAllDistricts: [[]],
  originalResultsInAllDistricts: [[]],
  planktonVotesInDistricts: [],
  originalResultsForAllElections: [],
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
    default: {
      return state;
    }
  }
}
