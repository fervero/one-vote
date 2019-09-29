const selectResultsInAllDistricts = ({ resultsInAllDistricts }) =>
  resultsInAllDistricts;

const selectCountryWideParties = ({ parties }) =>
  parties.slice(0, parties.length - 1);

const selectResultsInSingleDistrict = districtNumber => ({
  resultsInAllDistricts,
}) => resultsInAllDistricts[districtNumber] || [];

const selectResultsOfSpecifiedParty = colNumber => state =>
  selectResultsInAllDistricts(state).map(
    resultsInDistrict => resultsInDistrict[colNumber]
  );

const selectSeatsArray = ({ votingDistricts }) =>
  votingDistricts.map(({ seats }) => seats);

const selectSummedPlanktonVotes = ({ summedPlanktonVotes }) =>
  summedPlanktonVotes;

const selectParties = ({ parties }) => parties;

const selectvotingDistricts = ({ votingDistricts }) => votingDistricts;

export {
  selectCountryWideParties,
  selectResultsInAllDistricts,
  selectResultsInSingleDistrict,
  selectResultsOfSpecifiedParty,
  selectSeatsArray,
  selectSummedPlanktonVotes,
  selectParties,
  selectvotingDistricts,
};
