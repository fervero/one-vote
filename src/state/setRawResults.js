import { cloneDeep } from 'lodash';
import { sumArray } from '../utilities/arrayHelpers';

export function setRawResults(state, action) {
  const resultsInAllDistricts = action.value.majorPartiesResults;
  const summedPlanktonVotes = sumArray(action.value.planktonVotes);
  const originalResultsInAllDistricts = cloneDeep(resultsInAllDistricts);

  const newState = Object.assign({}, state, {
    resultsInAllDistricts,
    summedPlanktonVotes,
    planktonVotesInDistricts: action.value.planktonVotes,
    originalResultsInAllDistricts,
  });

  return newState;
}
