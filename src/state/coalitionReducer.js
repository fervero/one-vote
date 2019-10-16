import { sumArray } from '../utilities/arrayHelpers';

export function coalitionReducer(state, action) {
  const partiesInCoalition = action.payload
    .map((checked, i) => (checked ? i : -1))
    .filter(x => x !== -1);

  if (partiesInCoalition.length <= 1) {
    return state;
  }

  const [standardBearer, ...parties2remove] = partiesInCoalition;

  const coalitionPartyNames = state.parties
    .filter((party, index) => partiesInCoalition.includes(index))
    .map(({ name }) => name)
    .join(' + ');

  const parties = state.parties
    .map((party, index) =>
      index === standardBearer
        ? { ...party, name: coalitionPartyNames, threshold: 8 }
        : party
    )
    .filter((party, index) => !parties2remove.includes(index));

  const resultsInAllDistricts = state.resultsInAllDistricts.map(row =>
    row
      .map((votes, indexInRow) => {
        const sum = sumArray(
          row.filter((votes, index) => partiesInCoalition.includes(index))
        );

        return partiesInCoalition.includes(indexInRow) ? sum : votes;
      })
      .filter((votes, indexInRow) => !parties2remove.includes(indexInRow))
  );

  return Object.assign({}, state, { parties, resultsInAllDistricts });
}
