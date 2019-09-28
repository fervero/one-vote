import { cloneDeep } from 'lodash';

export function resultsInCellReducer(state, action) {
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
