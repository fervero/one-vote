import * as dhondt from 'dhondt';
import { seatsArray } from './results-barrel';
import { cloneDeep } from 'lodash';

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
  seatsWonInAllDistricts: [[]],
  indexesToDisplay: [],
};

function setRawResults(state, action) {
  const resultsInAllDistricts = action.value;
  const seatsWonInAllDistricts = resultsInAllDistricts.map((row, i) =>
    dhondt.compute(row, seatsArray[i])
  );

  const newState = Object.assign({}, state, {
    resultsInAllDistricts,
    seatsWonInAllDistricts,
  });

  return newState;
}

function setResultsInSingleCell(state, action) {
  const { districtNumber, cellNumber, value } = action.value;
  const { resultsInAllDistricts, seatsWonInAllDistricts } = state;
  const newResultsInDistricts = cloneDeep(resultsInAllDistricts);
  const newSeatsWonInAllDistricts = cloneDeep(seatsWonInAllDistricts);

  newResultsInDistricts[+districtNumber][+cellNumber] = value;

  newSeatsWonInAllDistricts[+districtNumber] = dhondt.compute(
    newResultsInDistricts[districtNumber],
    seatsArray[districtNumber]
  );

  const newState = Object.assign({}, state, {
    resultsInAllDistricts: newResultsInDistricts,
    seatsWonInAllDistricts: newSeatsWonInAllDistricts,
  });

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
    votingDistricts: action.value.map((district, i) =>
      Object.assign({}, district, { seats: seatsArray[i] })
    ),
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
