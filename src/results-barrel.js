import { parse as parse2015 } from './resultsHelpers';
import { electionResults as results2015 } from './2015-gl-lis-okr';

import { parse as parse2011 } from './resultsHelpers.2011.js';
import { electionResults as results2011 } from './2011-kandydaci-sejm';

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
    results: parsed2015,
  },
]);
