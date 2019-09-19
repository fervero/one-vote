import { parse as parse2015 } from './resultsHelpers.2015';

import {
  electionResults as results2015,
  seatsArray as seatsArray20112015,
} from './2015-gl-lis-okr';

import { parse as parse2011 } from './resultsHelpers.2011';
import { electionResults as results2011 } from './2011-kandydaci-sejm';

import {
  results2005,
  seatsArray as seatsArray20052007,
} from './results.2005.helpers';

import { results2007, seatsArray } from './results.2007.helpers';

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

export const elections = Promise.all([
  parse2015(results2015),
  parse2011(results2011),
]).then(([parsed2015, parsed2011]) => {
  return [
    {
      year: 2005,
      results: arrayToObject(results2005),
      planktonVotes: calculatePlanktonVotes(results2005),
      seatsArray: seatsArray20052007,
    },
    {
      year: 2007,
      results: arrayToObject(results2007),
      planktonVotes: calculatePlanktonVotes(results2007),
      seatsArray: seatsArray20052007,
    },
    {
      year: 2011,
      results: arrayToObject(parsed2011),
      planktonVotes: calculatePlanktonVotes(parsed2011),
      seatsArray: seatsArray20112015,
    },
    {
      year: 2015,
      results: arrayToObject(parsed2015),
      planktonVotes: calculatePlanktonVotes(parsed2015),
      seatsArray: seatsArray20112015,
    },
  ];
});

export { seatsArray };
