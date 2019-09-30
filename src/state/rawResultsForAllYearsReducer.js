export function rawResultsForAllYearsReducer(state, { payload }) {
  return Object.assign({}, state, {
    originalResultsForAllElections: payload,
  });
}
