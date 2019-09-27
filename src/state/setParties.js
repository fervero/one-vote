export function setParties(state, action) {
  const parties = action.value;

  const indexesToDisplay = parties
    .map(({ display }, index) => (display ? index : null))
    .filter(x => x !== null);

  const newState = Object.assign({}, state, {
    parties,
    indexesToDisplay,
  });

  return newState;
}
