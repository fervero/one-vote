import { createSelector } from 'reselect';

import {
  minVotesToChangeSomething,
  partyAboveThreshold,
  computeAllowingForThresholds,
} from './dHondtHelpers';

import { seatsArray } from './results-barrel';
import { sumOfVectors, sumArray } from './arrayHelpers';

const selectResultsInAllDistricts = ({ resultsInAllDistricts }) =>
  resultsInAllDistricts;

const selectResultsInSingleDistrict = districtNumber => ({
  resultsInAllDistricts,
}) => resultsInAllDistricts[districtNumber];

const selectSummedPlanktonVotes = ({ summedPlanktonVotes }) =>
  summedPlanktonVotes;

const selectParties = ({ parties }) => parties;

export const selectSumOfVotes = createSelector(
  [selectResultsInAllDistricts, selectSummedPlanktonVotes],
  (resultsInAllDistricts, summedPlanktonVotes) => {
    const sumOfVotesByParty = resultsInAllDistricts.reduce(sumOfVectors);
    const totalVotes = sumArray(sumOfVotesByParty) + summedPlanktonVotes;
    const percentageVotesByParty = sumOfVotesByParty.map(x => x / totalVotes);

    return {
      sumOfVotesByParty,
      percentageVotesByParty,
    };
  }
);

export const selectPartiesAboveThreshold = createSelector(
  [selectParties, selectSumOfVotes],
  (parties, { percentageVotesByParty }) =>
    partyAboveThreshold(percentageVotesByParty, parties)
);

export const selectSeatsWonInAllDistricts = createSelector(
  [selectResultsInAllDistricts, selectPartiesAboveThreshold],
  (resultsInAllDistricts = [], isPartyAboveThreshold = []) =>
    resultsInAllDistricts.map((row, i) =>
      computeAllowingForThresholds(row, seatsArray[i], isPartyAboveThreshold)
    ) || []
);

export const selectSeatsWonInADistrict = districtNumber =>
  createSelector(
    [
      selectResultsInSingleDistrict(districtNumber),
      selectPartiesAboveThreshold,
    ],
    (resultsInSingleDistrict, partiesAboveThreshold) =>
      computeAllowingForThresholds(
        resultsInSingleDistrict,
        seatsArray[districtNumber],
        partiesAboveThreshold
      )
  );

export const selectVotesRequiredToChangeSth = districtNumber =>
  createSelector(
    [
      selectResultsInSingleDistrict(districtNumber),
      selectPartiesAboveThreshold,
    ],
    (resultsInSingleDistrict, partiesAboveThreshold) =>
      minVotesToChangeSomething(
        resultsInSingleDistrict,
        seatsArray[districtNumber],
        partiesAboveThreshold
      )
  );
