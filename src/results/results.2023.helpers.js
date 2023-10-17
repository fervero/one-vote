import * as Papa from 'papaparse';
import { parties, electionResults, seatsArray, districtsArray } from './results.2023';

const pickRelevant = row => [
  row[0], // nr okręgu
  row[0], // nazwa okręgu
  row[25], // głosów ważnych
  row[29], // PiS
  row[31], // KO
  row[27], // Trzecia Droga
  row[28], // Lewica
  row[30], // Konfederacja
  row[37], // Mniejszość Niemiecka
];

const nameDistrict = ([index, name, ...rest], i) => [index, districtsArray[i], ...rest];

const replaceHeader = row => [
  { name: row[0] },
  { name: row[1] },
  { name: row[2] },
  ...parties,
];

const string2number = x => parseInt((x || '').replace(/ /g, ''), 10) || 0;

const strings2numbers = row =>
  row.map((x, i) => (i > 1 ? string2number(x) : x));

export const parse = csvString =>
  new Promise(resolve => {
    Papa.parse(csvString, {
      complete: parsed => {
        const relevant = parsed.data.map(pickRelevant).map(nameDistrict);

        const relevantWithReplacedHead = relevant.map((row, i) =>
          i > 0 ? strings2numbers(row) : replaceHeader(row)
        );

        resolve(relevantWithReplacedHead);
      },
    });
  });

export const results = parse(electionResults);
export { seatsArray };
