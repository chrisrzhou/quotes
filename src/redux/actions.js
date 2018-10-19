const createActionTypes = (namespace, actionNames) => {
  let actionTypes = {};
  actionNames.forEach(actionName => {
    actionTypes[actionName] = `${namespace}/${actionName}`;
  });
  return actionTypes;
};

const createAction = type => payload => ({
  type,
  payload,
});

export const actionTypes = createActionTypes('quotes', [
  'PAUSE',
  'RESET',
  'SEARCH',
  'SELECT_AUTHOR',
  'SELECT_QUOTE',
  'SELECT_TAG',
  'SET_SHOW_SEARCH_RESULTS',
]);

export const pause = createAction(actionTypes.PAUSE);

export const reset = createAction(actionTypes.RESET);

export const search = createAction(actionTypes.SEARCH);

export const selectAuthor = createAction(actionTypes.SELECT_AUTHOR);

export const selectQuote = createAction(actionTypes.SELECT_QUOTE);

export const selectTag = createAction(actionTypes.SELECT_TAG);

export const setShowSearchResults = createAction(
  actionTypes.SET_SHOW_SEARCH_RESULTS,
);
