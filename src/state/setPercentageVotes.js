import { sumArray } from '../utilities/arrayHelpers';
import { adjustArrayToDesiredSum } from '../utilities/arrayHelpers';
import { zip, unzip } from 'lodash';

const sum2DimensionalArray = arr => sumArray(arr.map(sumArray));

const calculateMajorVotesSum = state =>
  sum2DimensionalArray(state.resultsInAllDistricts);

const getSumOfAllVotes = state => {
  const majorVotesSum = calculateMajorVotesSum(state);
  const planktonVotesSum = sumArray(state.planktonVotesInDistricts);
  return majorVotesSum + planktonVotesSum;
};

export function setPercentageVotes(state, action) {
  const bigSum = getSumOfAllVotes(state);
  const percentages = action.value;
  const desiredSums = percentages.map(value => Math.floor(bigSum * value));
  const transposedVotes = unzip(state.resultsInAllDistricts);

  const transposedAndAdjustedVotes = zip(transposedVotes, desiredSums).map(
    ([column, sum]) => adjustArrayToDesiredSum(column, sum)
  );

  const resultsInAllDistricts = unzip(transposedAndAdjustedVotes);
  const newSumOfMajorVotes = sum2DimensionalArray(resultsInAllDistricts);
  const remainingVotesToBeDistributed = bigSum - newSumOfMajorVotes;

  const planktonVotesInDistricts = adjustArrayToDesiredSum(
    state.planktonVotesInDistricts,
    remainingVotesToBeDistributed
  );

  const summedPlanktonVotes = sumArray(planktonVotesInDistricts);

  return Object.assign({}, state, {
    resultsInAllDistricts,
    planktonVotesInDistricts,
    summedPlanktonVotes,
  });
}
