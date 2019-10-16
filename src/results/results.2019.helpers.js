import * as Papa from 'papaparse';
import { parties, electionResults, seatsArray } from './results.2019';

const pickRelevant = row => [
  row[0], // nr okręgu
  row[1], // nazwa okręgu
  row[23], // głosów ważnych
  row[24], // KO
  row[26], // Konfederacja
  row[27], // PSL
  row[29], // PiS
  row[31], // Lewica
  row[33], // Mniejszość Niemiecka
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
