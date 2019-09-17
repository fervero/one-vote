import * as Papa from 'papaparse';
import { parties, partiesShort } from './2011-kandydaci-sejm';
import * as _ from 'lodash';

const isColumnRelevant = (x, i) => [0, 1, 2, 3, 13].includes(i);

const pickRelevant = columns => columns.filter(isColumnRelevant);

const replaceHeader = row => [...row.slice(0, 2), ...partiesShort];

const isNonTrivial = row => row && row.length > 1;

const extractPartyResults = partiesArray =>
  partiesArray.map(
    ([districtNumber, districtName, listNumber, listName, numberOfVotes]) =>
      numberOfVotes
  );

const reduceByParty = group => {
  const header = group[0].slice(0, 4);
  const voteCount = group.reduce((acc, curr) => acc + +curr[4], 0);
  return [...header, voteCount];
};

const filterRelevantParties = ([district, city, listNumber, listName]) =>
  parties.includes(listName);

const flatten = reducedByParty => {
  if (!reducedByParty || !reducedByParty.length) {
    return [];
  }

  const head = reducedByParty[0].slice(0, 2);
  const tail = extractPartyResults(reducedByParty);
  return [...head, ...tail];
};

const groupByParty = districtArray => {
  const filteredDistrictArray = districtArray.filter(filterRelevantParties);
  const groupedByPartyObject = _.groupBy(filteredDistrictArray, row => row[2]);
  const groupedByParty = Object.values(groupedByPartyObject);
  const reducedByParty = groupedByParty.map(reduceByParty);
  return flatten(reducedByParty);
};

const groupByDistrict = resultsArray => {
  const groupedByDistrictObject = _.groupBy(resultsArray, row => row[0]);
  const groupedByDistrict = Object.values(groupedByDistrictObject);
  return groupedByDistrict.filter(isNonTrivial).map(groupByParty);
};

export const parse = csvString =>
  new Promise(resolve => {
    Papa.parse(csvString, {
      complete: parsed => {
        const relevant = parsed.data.map(pickRelevant);
        const head = replaceHeader(relevant[0]);
        const tail = relevant.slice(1);
        const grouped = groupByDistrict(tail);

        resolve([head, ...grouped]);
      },
    });
  });
