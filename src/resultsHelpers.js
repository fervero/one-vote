import * as Papa from 'papaparse';
import { parties } from './2015-gl-lis-okr.js';

const pickRelevant = row => [
  ...row.slice(0, 2),
  row[25],
  row[26],
  row[29],
  row[31],
  row[32],
];

const replaceHeader = row => [row[0], row[1], ...parties];

const strings2numbers = row => {
  return row.map((x, i) => (i > 1 ? parseInt(x.replace(/ /g, ''), 10) : x));
};

export const parse = csvString =>
  new Promise(resolve => {
    Papa.parse(csvString, {
      complete: parsed => {
        const relevant = parsed.data.map(pickRelevant);

        const relevantWithReplacedHead = relevant.map((row, i) =>
          i > 0 ? strings2numbers(row) : replaceHeader(row)
        );

        resolve(relevantWithReplacedHead);
      },
    });
  });
