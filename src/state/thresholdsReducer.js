export function thresholdsReducer(state, action) {
  const thresholds = action.payload;
  const parties = state.parties.map(({ name, threshold }, i) => ({
    name,
    threshold: thresholds[i],
  }));
  return Object.assign({}, state, { parties });
}
