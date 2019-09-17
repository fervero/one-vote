const parties = [
  { name: 'PiS', threshold: 5 },
  { name: 'PJN', threshold: 5 },
  { name: 'SLD', threshold: 5 },
  { name: 'Ruch Palikota', threshold: 5 },
  { name: 'PSL', threshold: 5 },
  { name: 'PPP', threshold: 5 },
  { name: 'PO', threshold: 5 },
  { name: 'Samoobrona', threshold: 5 },
  { name: 'Korwin', threshold: 5 },
  { name: 'Prawica', threshold: 5 },
  { name: 'Mniejszość Niemiecka', threshold: 0 },
];

const replaceHeader = headerRow => [{ name: headerRow[0] }, ...parties];

const pickRelevant = row => [
  row[0], // nr okręgu
  row[1], // PiS
  row[2], // PJN
  row[3], // SLD
  row[4], // Ruch Palikota
  row[5], // PSL
  // row[6], // Polska Partia Pracy
  row[7], // PO
  // row[8], // Samoobrona
  // row[9], // Korwin
  // row[10], // Prawica
  row[11], // Mniejszość Niemiecka
];

const addValidVotesTotal = ([firstElem, ...rest], i) =>
  i === 0
    ? [firstElem, { name: 'Głosy ważne' }, ...rest]
    : [firstElem, rest.reduce((a, b) => a + b, 0), ...rest];

const addDistrictName = ([firstElem, ...rest], i) =>
  i === 0
    ? [firstElem, { name: 'Siedziba OKW' }, ...rest]
    : [firstElem, firstElem, ...rest];

export const parse = resultsJs => {
  const mappedResults = resultsJs
    .split('\n')
    .map(row => row.split(';').map(x => (isNaN(+x) ? x : +x)))
    .slice(1)
    .filter((row, rowNumber) => rowNumber % 2 === 0)
    .slice(0, 42)
    .map((row, i) => (i === 0 ? replaceHeader(row) : row))
    .map(pickRelevant)
    .map(addValidVotesTotal)
    .map(addDistrictName);

  return mappedResults;
};
