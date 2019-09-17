import { parse as parse2015 } from './resultsHelpers.2015';
import { electionResults as results2015, seatsArray } from './2015-gl-lis-okr';

import { parse as parse2011 } from './resultsHelpers.2011.js';
// import { electionResults as results2011 } from './2011-kandydaci-sejm';
import { results as results2011 } from './results2011';

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

export const elections = parse2015(results2015).then(parsed2015 => {
  const parsed2011 = parse2011(results2011);

  return [
    {
      year: 2011,
      results: arrayToObject(parsed2011),
      planktonVotes: calculatePlanktonVotes(parsed2011),
    },
    {
      year: 2015,
      results: arrayToObject(parsed2015),
      planktonVotes: calculatePlanktonVotes(parsed2015),
    },
  ];
});

export { seatsArray };
