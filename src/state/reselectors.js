import { get as _get } from 'lodash';
import { createSelector } from 'reselect';
import { sumOfVectors, sumArray } from '../utilities/arrayHelpers';

import {
  minVotesToChangeSomething,
  partyAboveThreshold,
  computeAllowingForThresholds,
} from '../utilities/dHondtHelpers';

import {
  selectResultsInAllDistricts,
  selectResultsInSingleDistrict,
  selectSeatsArray,
  selectSummedPlanktonVotes,
  selectParties,
  selectvotingDistricts,
  selectOriginalResultsForAllElections,
} from './inputSelectors';

const selectSeatsInDistrict = districtNumber =>
  createSelector(
    [selectSeatsArray],
    seatsArray => seatsArray[districtNumber]
  );

const selectSumOfVotes = createSelector(
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

const selectPartiesAboveThreshold = createSelector(
  [selectParties, selectSumOfVotes],
  (parties, { percentageVotesByParty }) =>
    partyAboveThreshold(percentageVotesByParty, parties)
);

const selectSeatsWonInAllDistricts = createSelector(
  [selectResultsInAllDistricts, selectPartiesAboveThreshold, selectSeatsArray],
  (resultsInAllDistricts = [], isPartyAboveThreshold = [], seatsArray = []) =>
    resultsInAllDistricts.map((row, i) =>
      computeAllowingForThresholds(row, seatsArray[i], isPartyAboveThreshold)
    ) || []
);

const selectSeatsWonInADistrict = districtNumber =>
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

const selectVotesRequiredToChangeSth = districtNumber =>
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

const selectDistrict = districtNumber =>
  createSelector(
    [selectvotingDistricts],
    votingDistricts => votingDistricts[districtNumber]
  );

const selectDistrictName = districtNumber =>
  createSelector(
    [selectDistrict(districtNumber)],
    district => _get(district, 'districtName')
  );

const selectDistrictNumber = districtNumber =>
  createSelector(
    [selectDistrict(districtNumber)],
    district => _get(district, 'districtNumber')
  );

const selectDistrictSeats = districtNumber =>
  createSelector(
    [selectDistrict(districtNumber)],
    district => _get(district, 'seats')
  );

const selectElectionYears = createSelector(
  [selectOriginalResultsForAllElections],
  results => results.map(({ year }) => year)
);

export {
  selectSumOfVotes,
  selectPartiesAboveThreshold,
  selectSeatsWonInAllDistricts,
  selectSeatsWonInADistrict,
  selectVotesRequiredToChangeSth,
  selectDistrict,
  selectDistrictName,
  selectDistrictNumber,
  selectDistrictSeats,
  selectElectionYears,
};
