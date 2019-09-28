export function districtsReducer(state, action) {
  return Object.assign({}, state, {
    votingDistricts: [...action.value],
  });
}
