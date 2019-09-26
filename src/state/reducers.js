import { cloneDeep } from 'lodash';
import { sumArray, adjustArrayToDesiredSum } from '../utilities/arrayHelpers';

import {
  SET_RAW_RESULTS,
  SET_SINGLE_RESULTS,
  SET_PARTIES,
  SET_DISTRICTS,
  SET_RESULTS_IN_COLUMN,
} from './actions';

const DEFAULT_STATE = {
  votingDistricts: [],
  parties: [],
  resultsInAllDistricts: [[]],
  planktonVotesInDistricts: [],
};

function setRawResults(state, action) {
  const resultsInAllDistricts = action.value.majorPartiesResults;
  const summedPlanktonVotes = sumArray(action.value.planktonVotes);

  const newState = Object.assign({}, state, {
    resultsInAllDistricts,
    summedPlanktonVotes,
    planktonVotesInDistricts: action.value.planktonVotes,
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

function setResultsInColumn(state, action) {
  const { votes, columnNumber } = action.value;

  const relevantColumn = state.resultsInAllDistricts.map(
    row => row[columnNumber]
  );

  const finalColumn = adjustArrayToDesiredSum(relevantColumn, votes);

  const resultsInAllDistricts = state.resultsInAllDistricts.map(
    (row, cellNumber) =>
      row.map((value, index) =>
        index === columnNumber ? finalColumn[cellNumber] : value
      )
  );

  return Object.assign({}, state, { resultsInAllDistricts });
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
    case SET_RESULTS_IN_COLUMN: {
      return setResultsInColumn(state, action);
    }
    default: {
      return state;
    }
  }
}
