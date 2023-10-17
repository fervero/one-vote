import {
  results as results2015,
} from './results.2015.helpers';

import { results as results2023 } from "./results.2023.helpers";

import {
  results as results2019,
  seatsArray as seatsArray20112019,
} from './results.2019.helpers';

import { results as results2011 } from './results.2011.helpers';

import {
  results2005,
  seatsArray as seatsArray2005,
} from './results.2005.helpers';

import {
  results2007,
  seatsArray as seatsArray2007,
} from './results.2007.helpers';

const sumArray = arr => arr.reduce((x, y) => x + y, 0);

const arrayToObject = ([head, ...body]) => {
  const newHead = head.filter((x, i) => i !== 2);

  const resultsByDistrict = body.map(
    ([district, name, allVotes, ...votesByParty]) => [
      district,
      name,
      ...votesByParty,
    ]
  );

  return [newHead, ...resultsByDistrict];
};

const calculatePlanktonVotes = body =>
  body
    .slice(1)
    .map(
      ([district, name, allVotes, ...votesByParty]) =>
        allVotes - sumArray(votesByParty)
    );

export const elections = Promise.all([results2023, results2019, results2015, results2011]).then(
  ([results2023, results2019, results2015, results2011]) => {
    return [
      {
        year: 2005,
        results: arrayToObject(results2005),
        planktonVotes: calculatePlanktonVotes(results2005),
        seatsArray: seatsArray2005,
      },
      {
        year: 2007,
        results: arrayToObject(results2007),
        planktonVotes: calculatePlanktonVotes(results2007),
        seatsArray: seatsArray2007,
      },
      {
        year: 2011,
        results: arrayToObject(results2011),
        planktonVotes: calculatePlanktonVotes(results2011),
        seatsArray: seatsArray20112019,
      },
      {
        year: 2015,
        results: arrayToObject(results2015),
        planktonVotes: calculatePlanktonVotes(results2015),
        seatsArray: seatsArray20112019,
      },
      {
        year: 2019,
        results: arrayToObject(results2019),
        planktonVotes: calculatePlanktonVotes(results2019),
        seatsArray: seatsArray20112019,
      },
      {
        year: 2023,
        results: arrayToObject(results2023),
        planktonVotes: calculatePlanktonVotes(results2023),
        seatsArray: seatsArray20112019,
      },
    ];
  }
);
