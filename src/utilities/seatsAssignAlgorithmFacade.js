import * as hareNiemeyer from 'hare-niemeyer';
import * as dhondt from 'dhondt';

export const computeSeatsByHareNiemeyer = (votes, seats) => {
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

export const computeSeatsByDHondt = (votes, seats) =>
  dhondt.compute(votes, seats);
