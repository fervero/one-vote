const districtsNames = [
  'Legnica',
  'Wałbrzych',
  'Wrocław',
  'Bydgoszcz',
  'Toruń',
  'Lublin',
  'Chełm',
  'Zielona Góra',
  'Łódź',
  'Piotrków Trybunalski',
  'Sieradz',
  'Chrzanów',
  'Kraków',
  'Nowy Sącz',
  'Tarnów',
  'Płock',
  'Radom',
  'Siedlce',
  'Warszawa I (miasto)',
  'Warszawa II (okręg)',
  'Opole',
  'Krosno',
  'Rzeszów',
  'Białystok',
  'Gdańsk',
  'Gdynia',
  'Bielsko-Biała',
  'Częstochowa',
  'Gliwice',
  'Rybnik',
  'Katowice',
  'Sosnowiec',
  'Kielce',
  'Elbląg',
  'Olsztyn',
  'Kalisz',
  'Konin',
  'Piła',
  'Poznań',
  'Koszalin',
  'Szczecin',
];

export const seatsArray = [
  12,
  8,
  14,
  12,
  13,
  15,
  12,
  12,
  10,
  9,
  12,
  8,
  13,
  9,
  9,
  10,
  9,
  12,
  19,
  11,
  13,
  11,
  15,
  15,
  12,
  14,
  9,
  7,
  10,
  9,
  12,
  9,
  16,
  8,
  10,
  12,
  9,
  9,
  10,
  8,
  13,
];

const results = require('./results2007.json');

const parties = [
  {
    name: 'Komitet Wyborczy Platforma Obywatelska RP',
    shortName: 'PO',
    number: 8,
    threshold: 5,
  },
  {
    name: 'Komitet Wyborczy Prawo i Sprawiedliwość',
    shortName: 'PiS',
    number: 6,
    threshold: 5,
  },
  {
    name: 'Koalicyjny Komitet Wyborczy Lewica i Demokraci SLD+SDPL+PD+UP',
    shortName: 'LiD',
    number: 20,
    threshold: 8,
  },
  {
    name: 'Komitet Wyborczy Polskiego Stronnictwa Ludowego',
    shortName: 'PSL',
    threshold: 5,
    number: 10,
  },
  {
    name: 'Komitet Wyborczy Wyborców "Mniejszość Niemiecka"',
    shortName: 'MN',
    threshold: 0,
    number: 19,
  },
];

const header = [
  {
    name: 'Nr Okręgu',
  },
  {
    name: 'Siedziba OKW',
  },
  {
    name: 'Głosy ważne',
  },
  ...parties.map(({ shortName, threshold }) => ({
    name: shortName,
    threshold,
  })),
];

const parseVotesArray = votesArray => {
  const numbersOfVotes = votesArray.reduce((sum, { votes }) => sum + +votes, 0);

  const particularResults = parties.map(({ name }) => {
    const foundInVotesArray = votesArray.find(({ party }) => party === name);
    return foundInVotesArray ? +foundInVotesArray.votes : 0;
  });

  return [numbersOfVotes, ...particularResults];
};

const parseResultRow = (votesArray, i) => [
  i + 1,
  districtsNames[i],
  ...parseVotesArray(votesArray),
];

export const results2007 = [header, ...results.map(parseResultRow)];
