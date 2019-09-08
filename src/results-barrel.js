import { parse as parse2015 } from './resultsHelpers.2015';
import { electionResults as results2015, seatsArray } from './2015-gl-lis-okr';

import { parse as parse2011 } from './resultsHelpers.2011.js';
import { electionResults as results2011 } from './2011-kandydaci-sejm';

const sumArray = arr => arr.reduce((x, y) => x + y, 0);

const arrayToObject = ([head, ...body]) => {
  const newHead = head.filter((x, i) => (i === 2 ? 'plankton' : x)); // 2: all valid votes

  const resultsByDistrict = body.map(
    ([district, name, allVotes, ...votesByParty]) => [
      district,
      name,
      allVotes - sumArray(votesByParty),
      ...votesByParty,
    ]
  );

  return [newHead, ...resultsByDistrict];
};

export const elections = Promise.all([
  parse2015(results2015),
  parse2011(results2011),
]).then(([parsed2015, parsed2011]) => [
  {
    year: 2011,
    results: parsed2011,
  },
  {
    year: 2015,
    results: arrayToObject(parsed2015),
  },
]);

export { seatsArray };
