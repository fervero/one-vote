import { cloneDeep } from 'lodash';
import { sumArray } from '../utilities/arrayHelpers';

export function rawResultsReducer(state, action) {
  const resultsInAllDistricts = action.payload.majorPartiesResults;
  const summedPlanktonVotes = sumArray(action.payload.planktonVotes);
  const originalResultsInAllDistricts = cloneDeep(resultsInAllDistricts);

  const newState = Object.assign({}, state, {
    resultsInAllDistricts,
    summedPlanktonVotes,
    planktonVotesInDistricts: action.payload.planktonVotes,
    originalResultsInAllDistricts,
  });

  return newState;
}
