export const sumOfVectors = (rowA, rowB) => rowA.map((x, i) => x + rowB[i]);

export const sumArray = arr => arr.reduce((x, y) => x + y, 0);

export const sumArrayWithoutLast = arr => sumArray(arr.slice(0, arr.length - 1));

const addNumberToArray = (arr, addition) => {
  const addEqually = Math.floor(addition / arr.length);
  const remainder = addition - addEqually * arr.length;

  return arr.map((value, index) =>
    index < remainder ? value + 1 + addEqually : value + addEqually
  );
};

export const adjustArrayToDesiredSum = (arr, expectedSum) => {
  const sumOfVotes = sumArray(arr);
  const factor = sumOfVotes > 0 ? expectedSum / sumOfVotes : 1;
  const intermediateArray = arr.map(votes => Math.floor(votes * factor));
  const delta = expectedSum - sumArray(intermediateArray);

  return addNumberToArray(intermediateArray, delta);
};
