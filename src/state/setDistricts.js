export function setDistricts(state, action) {
  const newState = Object.assign({}, state, {
    votingDistricts: [...action.value],
  });
  return newState;
}
