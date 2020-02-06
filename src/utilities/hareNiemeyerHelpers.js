import * as hareNiemeyer from 'hare-niemeyer';

const computeSeats = (votes, seats) => {
  const votesObject = votes.reduce(
    (acc, value, index) => Object.assign({}, acc, { [`_${index}`]: value }),
    {}
  );

  const computedResults = hareNiemeyer(votesObject, seats, true);

  const resultsArray = Object.keys(computedResults)
    .sort()
    .map(key => computedResults[key]);

  return resultsArray;
};

const string2Number = stupidString => {
  const saneString = ('' + stupidString).replace(' ', '');
  return parseInt(saneString, 10);
};

const adjustVotesWithThresholds = (votes, seats, isPartyAboveThreshold) =>
  votes.map((numberOfVotes, districtNumber) =>
    isPartyAboveThreshold[districtNumber] ? numberOfVotes : 0
  );

export const computeAllowingForThresholds = (
  votes,
  seats,
  isPartyAboveThreshold
) => {
  const adjustedVotes = adjustVotesWithThresholds(
    votes,
    seats,
    isPartyAboveThreshold
  );

  return computeSeats(adjustedVotes, seats, isPartyAboveThreshold);
};

// 2015, okręg z OKW w Rzeszowie - 54 głosy więcej na PSL = 1 mandat więcej na PSL
const bisectAddingVotesOnPosition = (votes, seats, position) => {
  const votesCopy = [...votes];

  const realOutcome = computeSeats(votes, seats);

  if (realOutcome[position] === seats) {
    return Infinity;
  }

  const seatsActuallyGot = realOutcome[position];

  while (computeSeats(votesCopy, seats)[position] === seatsActuallyGot) {
    if (isNaN(votesCopy[position])) {
      return;
    }

    votesCopy[position] = Math.max(1, 2 * votesCopy[position]);
  }

  let upperLimit = votesCopy[position];
  let lowerLimit = votes[position];

  while (upperLimit > lowerLimit + 1) {
    let newOutcome = computeSeats(votesCopy, seats);

    if (newOutcome[position] > seatsActuallyGot) {
      upperLimit = votesCopy[position];
      votesCopy[position] = Math.floor((votesCopy[position] + lowerLimit) / 2);
    } else {
      lowerLimit = votesCopy[position];
      votesCopy[position] = Math.floor((votesCopy[position] + upperLimit) / 2);
    }
  }

  return computeSeats(votesCopy, seats)[position] === seatsActuallyGot
    ? upperLimit - votes[position]
    : lowerLimit - votes[position];
};

// 2015, okręg z OKW w Olsztynie: 128 głosów dla .N mniej = jeden mandat mniej
// tenże rok, .N, Konin - 210 głosów
// 2011, Siedlce, Ruch Palikota - 169

const bisectSubtractVotesOnPosition = (votes, seats, position) => {
  const votesCopy = [...votes];
  const realOutcome = computeSeats(votes, seats);
  const seatsActuallyGot = realOutcome[position];

  if (seatsActuallyGot === 0) {
    return 0;
  }

  while (computeSeats(votesCopy, seats)[position] === seatsActuallyGot) {
    votesCopy[position] = Math.floor(votesCopy[position] / 2);
  }

  let lowerLimit = votesCopy[position];
  let upperLimit = votes[position];

  while (upperLimit > lowerLimit + 1) {
    let newOutcome = computeSeats(votesCopy, seats);

    if (newOutcome[position] < seatsActuallyGot) {
      lowerLimit = votesCopy[position];
      votesCopy[position] = Math.floor((votesCopy[position] + upperLimit) / 2);
    } else {
      upperLimit = votesCopy[position];
      votesCopy[position] = Math.floor((votesCopy[position] + lowerLimit) / 2);
    }
  }

  votesCopy[position] = lowerLimit;

  return computeSeats(votesCopy, seats)[position] === seatsActuallyGot
    ? upperLimit - votes[position]
    : lowerLimit - votes[position];
};

export const addVotes = (votes, seats, isPartyAboveThreshold) =>
  votes.map((x, i) =>
    isPartyAboveThreshold[i]
      ? bisectAddingVotesOnPosition(votes, seats, i)
      : +Infinity
  );

export const subtractVotes = (votes, seats, isPartyAboveThreshold) =>
  votes.map((x, i) =>
    isPartyAboveThreshold[i]
      ? bisectSubtractVotesOnPosition(votes, seats, i)
      : -Infinity
  );

export const minVotesToChangeSomething = (
  row,
  seats,
  isPartyAboveThreshold = []
) => {
  const votes = row.map(string2Number);

  const adjustedVotes = adjustVotesWithThresholds(
    votes,
    seats,
    isPartyAboveThreshold
  );

  const moreVotes = addVotes(
    adjustedVotes,
    seats,
    isPartyAboveThreshold
  ).map(x => (x === null || x > 0 ? x : Infinity));

  const lessVotes = subtractVotes(
    adjustedVotes,
    seats,
    isPartyAboveThreshold
  ).map(x => (x === null || x < 0 ? x : -Infinity));

  return { moreVotes, lessVotes };
};

export const partyAboveThreshold = (percentageVotesByParty, parties) =>
  percentageVotesByParty.map(
    (percentage, i) => percentage * 100 >= (parties[i] || {}).threshold
  );
