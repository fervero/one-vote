import * as dhondt from 'dhondt';
import { partiesShort } from './2011-kandydaci-sejm.js';

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

  const returnValue =
    dhondt.compute(votesCopy, seats)[position] === seatsActuallyGot
      ? upperLimit - votes[position]
      : lowerLimit - votes[position];

  return returnValue;
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

export const addVotes = (votes, seats) => {
  console.log('Minimum votes added to change the outcome:');
  for (let i = 0, len = votes.length; i < len; i++) {
    console.log(partiesShort[i], bisectAddingVotesOnPosition(votes, seats, i));
  }
};

export const subtractVotes = (votes, seats) => {
  console.log('Minimum votes subtracted to change the outcome:');
  for (let i = 0, len = votes.length; i < len; i++) {
    console.log(
      partiesShort[i],
      bisectSubtractVotesOnPosition(votes, seats, i)
    );
  }
};
