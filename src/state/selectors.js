import { createSelector } from 'reselect';

import {
  minVotesToChangeSomething,
  partyAboveThreshold,
  computeAllowingForThresholds,
} from '../utilities/dHondtHelpers';

import { sumOfVectors, sumArray } from '../utilities/arrayHelpers';

const selectResultsInAllDistricts = ({ resultsInAllDistricts }) =>
  resultsInAllDistricts;

export const selectResultsInSingleDistrict = districtNumber => ({
  resultsInAllDistricts,
}) => resultsInAllDistricts[districtNumber];

export const selectSeatsArray = ({ votingDistricts }) =>
  votingDistricts.map(({ seats }) => seats);

const selectSeatsInDistrict = districtNumber =>
  createSelector(
    [selectSeatsArray],
    seatsArray => seatsArray[districtNumber]
  );

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
  [selectResultsInAllDistricts, selectPartiesAboveThreshold, selectSeatsArray],
  (resultsInAllDistricts = [], isPartyAboveThreshold = [], seatsArray = []) =>
    resultsInAllDistricts.map((row, i) =>
      computeAllowingForThresholds(row, seatsArray[i], isPartyAboveThreshold)
    ) || []
);

export const selectSeatsWonInADistrict = districtNumber =>
  createSelector(
    [
      selectResultsInSingleDistrict(districtNumber),
      selectPartiesAboveThreshold,
      selectSeatsInDistrict(districtNumber),
    ],
    (resultsInSingleDistrict, partiesAboveThreshold, seats) =>
      computeAllowingForThresholds(
        resultsInSingleDistrict,
        seats,
        partiesAboveThreshold
      )
  );

export const selectVotesRequiredToChangeSth = districtNumber =>
  createSelector(
    [
      selectResultsInSingleDistrict(districtNumber),
      selectPartiesAboveThreshold,
      selectSeatsInDistrict(districtNumber),
    ],
    (resultsInSingleDistrict, partiesAboveThreshold, seats) =>
      minVotesToChangeSomething(
        resultsInSingleDistrict,
        seats,
        partiesAboveThreshold
      )
  );
