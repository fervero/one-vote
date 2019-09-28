import { adjustArrayToDesiredSum } from '../utilities/arrayHelpers';

export function resultsInColumnReducer(state, action) {
  const { votes, columnNumber } = action.value;

  const relevantColumn = state.originalResultsInAllDistricts.map(
    row => row[columnNumber]
  );

  const finalColumn = adjustArrayToDesiredSum(relevantColumn, votes);

  const resultsInAllDistricts = state.resultsInAllDistricts.map(
    (row, cellNumber) =>
      row.map((value, index) =>
        index === columnNumber ? finalColumn[cellNumber] : value
      )
  );

  return Object.assign({}, state, { resultsInAllDistricts });
}
