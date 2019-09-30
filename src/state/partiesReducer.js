export function partiesReducer(state, action) {
  const parties = action.payload;

  const indexesToDisplay = parties
    .map(({ display }, index) => (display ? index : null))
    .filter(x => x !== null);

  const newState = Object.assign({}, state, {
    parties,
    indexesToDisplay,
  });

  return newState;
}
