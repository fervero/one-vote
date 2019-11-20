export function methodReducer(state, action) {
  const countingMethod = action.payload;
  return Object.assign({}, state, { countingMethod });
}
