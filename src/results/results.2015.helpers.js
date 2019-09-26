import * as Papa from 'papaparse';
import { parties, electionResults, seatsArray } from './2015-gl-lis-okr';

const pickRelevant = row => [
  row[0], // nr okręgu
  row[1], // nazwa okręgu
  row[24], // głosów ważnych
  row[25], // PiS
  row[26], // PO
  row[31], // Kukiz'15
  row[32], // .N
  row[29], // PSL
  row[30], // SLD
  row[28], // Korwin
  row[27], // Razem
  row[40], // Mniejszość Niemiecka
];

const replaceHeader = row => [
  { name: row[0] },
  { name: row[1] },
  { name: row[2] },
  ...parties,
];

const string2number = x => parseInt(x.replace(/ /g, ''), 10) || 0;

const strings2numbers = row =>
  row.map((x, i) => (i > 1 ? string2number(x) : x));

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

export const results = parse(electionResults);
export { seatsArray };
