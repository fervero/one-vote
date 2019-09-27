import {
  SET_RAW_RESULTS,
  SET_SINGLE_RESULTS,
  SET_PARTIES,
  SET_DISTRICTS,
  SET_RESULTS_IN_COLUMN,
  SET_PERCENTAGE_VOTES,
} from './actions';

import { setRawResults } from './setRawResults';
import { setResultsInSingleCell } from './setResultsInSingleCell';
import { setParties } from './setParties';
import { setDistricts } from './setDistricts';
import { setResultsInColumn } from './setResultsInColumn';
import { setPercentageVotes } from './setPercentageVotes';

const DEFAULT_STATE = {
  votingDistricts: [],
  parties: [],
  resultsInAllDistricts: [[]],
  originalResultsInAllDistricts: [[]],
  planktonVotesInDistricts: [],
};

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
    case SET_RESULTS_IN_COLUMN: {
      return setResultsInColumn(state, action);
    }
    case SET_PERCENTAGE_VOTES: {
      return setPercentageVotes(state, action);
    }
    default: {
      return state;
    }
  }
}
