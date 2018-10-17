import {actionTypes} from './actions';
import quotes from 'quotes.md';
import shortid from 'shortid';

const createReducer = (initialState, handlers) => {
  return (state = initialState, action) => {
    if (!action) {
      return state;
    }
    const handler = handlers[action.type];
    return handler ? handler(state, action) : state;
  };
};

const getInitialState = () => ({
  quotes: quotes.map(quote => ({...quote, id: shortid()})),
  selectedAuthor: null,
  selectedQuote: null,
  selectedTag: null,
  searchString: null,
});

export default createReducer(getInitialState(), {
  [actionTypes.SELECT_AUTHOR]: (state, {payload: selectedAuthor}) => ({
    ...state,
    selectedAuthor,
  }),
  [actionTypes.SELECT_QUOTE]: (state, {payload: selectedQuote}) => ({
    ...state,
    selectedQuote,
  }),
  [actionTypes.SELECT_TAG]: (state, {payload: selectedTag}) => ({
    ...state,
    selectedTag,
  }),
  [actionTypes.SEARCH]: (state, {payload: searchString}) => ({
    ...state,
    searchString,
  }),
});
