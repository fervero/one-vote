import { sumArray } from '../utilities/arrayHelpers';
import { cloneDeep } from 'lodash';
import { DHONDT } from '../constants';

export function yearReducer(state, { payload }) {
  const yearInArray = state.originalResultsForAllElections.find(
    election => election.year === payload
  );
  const { results, planktonVotes, seatsArray } = yearInArray;

  const votingDistricts = results
    .slice(1)
    .map(([districtNumber, districtName], i) => ({
      districtNumber,
      districtName,
      seats: seatsArray[i],
    }));

  const parties = results[0].slice(2);
  const resultsInAllDistricts = results.slice(1).map(row => row.slice(2));
  const originalResultsInAllDistricts = cloneDeep(resultsInAllDistricts);
  const summedPlanktonVotes = sumArray(planktonVotes);

  const newState = Object.assign({}, state, {
    resultsInAllDistricts,
    summedPlanktonVotes,
    planktonVotesInDistricts: planktonVotes,
    originalResultsInAllDistricts,
    votingDistricts,
    parties,
    year: payload,
    countingMethod: DHONDT,
  });

  return newState;
}
