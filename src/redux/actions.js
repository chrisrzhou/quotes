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
  'SELECT_AUTHOR',
  'SELECT_QUOTE',
  'SELECT_TAG',
  'SEARCH',
]);

export const selectAuthor = createAction(actionTypes.SELECT_AUTHOR);

export const selectQuote = createAction(actionTypes.SELECT_QUOTE);

export const selectTag = createAction(actionTypes.SELECT_TAG);

export const search = createAction(actionTypes.SEARCH);
