import * as dhondt from 'dhondt';

const string2Number = stupidString => {
  const saneString = ('' + stupidString).replace(' ', '');
  return parseInt(saneString, 10);
};

// 2015, okręg z OKW w Rzeszowie - 54 głosy więcej na PSL = 1 mandat więcej na PSL
const bisectAddingVotesOnPosition = (votes, seats, position) => {
  const votesCopy = [...votes];
  const realOutcome = dhondt.compute(votes, seats);
  const seatsActuallyGot = realOutcome[position];

  while (dhondt.compute(votesCopy, seats)[position] === seatsActuallyGot) {
    votesCopy[position] = 2 * votesCopy[position];
  }

  let upperLimit = votesCopy[position];
  let lowerLimit = votes[position];

  while (upperLimit > lowerLimit + 1) {
    let newOutcome = dhondt.compute(votesCopy, seats);

    if (newOutcome[position] > seatsActuallyGot) {
      upperLimit = votesCopy[position];
      votesCopy[position] = Math.floor((votesCopy[position] + lowerLimit) / 2);
    } else {
      lowerLimit = votesCopy[position];
      votesCopy[position] = Math.floor((votesCopy[position] + upperLimit) / 2);
    }
  }

  return dhondt.compute(votesCopy, seats)[position] === seatsActuallyGot
    ? upperLimit - votes[position]
    : lowerLimit - votes[position];
};

// 2015, okręg z OKW w Olsztynie: 128 głosów dla .N mniej = jeden mandat mniej
// tenże rok, .N, Konin - 210 głosów
// 2011, Siedlce, Ruch Palikota - 169

const bisectSubtractVotesOnPosition = (votes, seats, position) => {
  const votesCopy = [...votes];
  const realOutcome = dhondt.compute(votes, seats);
  const seatsActuallyGot = realOutcome[position];

  if (seatsActuallyGot === 0) {
    return 0;
  }

  while (dhondt.compute(votesCopy, seats)[position] === seatsActuallyGot) {
    votesCopy[position] = Math.floor(votesCopy[position] / 2);
  }

  let lowerLimit = votesCopy[position];
  let upperLimit = votes[position];

  while (upperLimit > lowerLimit + 1) {
    let newOutcome = dhondt.compute(votesCopy, seats);

    if (newOutcome[position] < seatsActuallyGot) {
      lowerLimit = votesCopy[position];
      votesCopy[position] = Math.floor((votesCopy[position] + upperLimit) / 2);
    } else {
      upperLimit = votesCopy[position];
      votesCopy[position] = Math.floor((votesCopy[position] + lowerLimit) / 2);
    }
  }

  votesCopy[position] = lowerLimit;

  return dhondt.compute(votesCopy, seats)[position] === seatsActuallyGot
    ? upperLimit - votes[position]
    : lowerLimit - votes[position];
};

export const addVotes = (votes, seats) =>
  votes.map((x, i) => bisectAddingVotesOnPosition(votes, seats, i));

export const subtractVotes = (votes, seats) =>
  votes.map((x, i) => bisectSubtractVotesOnPosition(votes, seats, i));

export const minVotesToChangeSomething = (row, seats) => {
  const votes = row.slice(2).map(string2Number);
  const moreVotes = addVotes(votes, seats).map(x => (x > 0 ? x : Infinity));

  const lessVotes = subtractVotes(votes, seats).map(x =>
    x < 0 ? x : -Infinity
  );

  const positiveMinimum = Math.min(...moreVotes);
  const negativeMaximum = Math.max(...lessVotes);

  return Math.min(positiveMinimum, -negativeMaximum);
};
