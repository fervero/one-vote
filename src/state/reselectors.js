import { get as _get } from 'lodash';
import { createSelector } from 'reselect';
import { sumOfVectors, sumArray } from '../utilities/arrayHelpers';
import { DHONDT, HARE } from '../constants';

import {
  minVotesToChangeSomething,
  partyAboveThreshold,
  computeAllowingForThresholds,
} from '../utilities/dHondtHelpers';

import {
  minVotesToChangeSomething as minVotesToChangeSomethingHN,
  computeAllowingForThresholds as computeAllowingForThresholdsHN,
} from '../utilities/hareNiemeyerHelpers';

import {
  selectResultsInAllDistricts,
  selectResultsInSingleDistrict,
  selectSeatsArray,
  selectSummedPlanktonVotes,
  selectParties,
  selectvotingDistricts,
  selectOriginalResultsForAllElections,
  selectCountingMethod,
} from './inputSelectors';

const selectSeatsInDistrict = districtNumber =>
  createSelector([selectSeatsArray], seatsArray => seatsArray[districtNumber]);

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
  [
    selectResultsInAllDistricts,
    selectPartiesAboveThreshold,
    selectSeatsArray,
    selectCountingMethod,
  ],
  (
    resultsInAllDistricts = [],
    isPartyAboveThreshold = [],
    seatsArray = [],
    method
  ) => {
    const computeFn =
      method === DHONDT
        ? computeAllowingForThresholds
        : computeAllowingForThresholdsHN;

    return (
      resultsInAllDistricts.map((row, i) =>
        computeFn(row, seatsArray[i], isPartyAboveThreshold)
      ) || []
    );
  }
);

const selectSeatsWonInADistrict = districtNumber =>
  createSelector(
    [
      selectResultsInSingleDistrict(districtNumber),
      selectPartiesAboveThreshold,
      selectSeatsInDistrict(districtNumber),
      selectCountingMethod,
    ],
    (resultsInSingleDistrict, partiesAboveThreshold, seats, method) => {
      const computeFn =
        method === DHONDT
          ? computeAllowingForThresholds
          : computeAllowingForThresholdsHN;

      return computeFn(resultsInSingleDistrict, seats, partiesAboveThreshold);
    }
  );

const selectVotesRequiredToChangeSth = districtNumber =>
  createSelector(
    [
      selectResultsInSingleDistrict(districtNumber),
      selectPartiesAboveThreshold,
      selectSeatsInDistrict(districtNumber),
      selectCountingMethod,
    ],
    (resultsInSingleDistrict, partiesAboveThreshold, seats, method) => {
      const minVotesFn =
        method === DHONDT
          ? minVotesToChangeSomething
          : minVotesToChangeSomethingHN;

      return minVotesFn(resultsInSingleDistrict, seats, partiesAboveThreshold);
    }
  );

const selectDistrict = districtNumber =>
  createSelector(
    [selectvotingDistricts],
    votingDistricts => votingDistricts[districtNumber]
  );

const selectDistrictName = districtNumber =>
  createSelector([selectDistrict(districtNumber)], district =>
    _get(district, 'districtName')
  );

const selectDistrictNumber = districtNumber =>
  createSelector([selectDistrict(districtNumber)], district =>
    _get(district, 'districtNumber')
  );

const selectDistrictSeats = districtNumber =>
  createSelector([selectDistrict(districtNumber)], district =>
    _get(district, 'seats')
  );

const selectElectionYears = createSelector(
  [selectOriginalResultsForAllElections],
  results => results.map(({ year }) => year).sort((x, y) => y - x)
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
