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

export const parse = csvString =>
  new Promise(resolve => {
    Papa.parse(csvString, {
      complete: parsed => {
        const relevant = parsed.data.map(pickRelevant);
        const relevantWithReplacedHead = relevant.map((row, i) =>
          i > 0 ? row : replaceHeader(row)
        );

        resolve(relevantWithReplacedHead);
      },
    });
  });
