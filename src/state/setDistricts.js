export function setDistricts(state, action) {
  return Object.assign({}, state, {
    votingDistricts: [...action.value],
  });
}
