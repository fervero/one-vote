import * as dhondt from 'dhondt';
import { createSelector } from 'reselect';

import {
  minVotesToChangeSomething,
  partyAboveThreshold,
  computeAllowingForThresholds,
} from './dHondtHelpers';
import { seatsArray } from './results-barrel';
import { sumOfVectors, sumArray } from './arrayHelpers';

const selectSumOfVotes = ({ resultsInAllDistricts, summedPlanktonVotes }) => {
  const sumOfVotesByParty = resultsInAllDistricts.reduce(sumOfVectors);
  const totalVotes = sumArray(sumOfVotesByParty) + summedPlanktonVotes;
  const percentageVotesByParty = sumOfVotesByParty.map(x => x / totalVotes);

  return {
    sumOfVotesByParty,
    percentageVotesByParty,
  };
};

export const reselectSumOfVotes = createSelector(
  [selectSumOfVotes],
  x => x
);

const selectPartiesAboveThreshold = state => {
  const { parties } = state;
  const { percentageVotesByParty } = selectSumOfVotes(state);
  return partyAboveThreshold(percentageVotesByParty, parties);
};

export const reselectPartiesAboveThreshold = createSelector(
  [selectPartiesAboveThreshold],
  x => x
);

const selectSeatsWonInAllDistricts = state => {
  const { resultsInAllDistricts = [] } = state;
  const isPartyAboveThreshold = selectPartiesAboveThreshold(state);

  return (
    resultsInAllDistricts.map((row, i) =>
      computeAllowingForThresholds(row, seatsArray[i], isPartyAboveThreshold)
    ) || []
  );
};

export const reselectSeatsWonInAllDistricts = createSelector(
  [selectSeatsWonInAllDistricts],
  x => x
);

const selectSeatsWonInADistrict = districtNumber => state => {
  const { resultsInAllDistricts = [] } = state;
  const isPartyAboveThreshold = selectPartiesAboveThreshold(state);

  return computeAllowingForThresholds(
    resultsInAllDistricts[districtNumber],
    seatsArray[districtNumber],
    isPartyAboveThreshold
  );
};

export const reselectSeatsWonInADistrict = createSelector(
  [selectSeatsWonInADistrict],
  x => x
);

const selectVotesRequiredToChangeSth = districtNumber => state => {
  const isPartyAboveThreshold = selectPartiesAboveThreshold(state);

  return minVotesToChangeSomething(
    state.resultsInAllDistricts[districtNumber],
    seatsArray[districtNumber],
    isPartyAboveThreshold
  );
};

export const reselectVotesRequiredToChangeSth = createSelector(
  [selectVotesRequiredToChangeSth],
  x => x
);
