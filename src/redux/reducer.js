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
  searchString: null,
  selectedAuthor: null,
  selectedQuoteIndex: Math.floor(Math.random() * quotes.length),
  selectedTag: null,
  showSearchResults: false,
});

export default createReducer(getInitialState(), {
  [actionTypes.SEARCH]: (state, {payload: searchString}) => ({
    ...state,
    searchString,
  }),
  [actionTypes.SELECT_AUTHOR]: (state, {payload: selectedAuthor}) => ({
    ...state,
    selectedAuthor,
  }),
  [actionTypes.SELECT_QUOTE]: (state, {payload: selectedQuoteIndex}) => ({
    ...state,
    selectedQuoteIndex,
  }),
  [actionTypes.SELECT_TAG]: (state, {payload: selectedTag}) => ({
    ...state,
    selectedTag,
  }),
  [actionTypes.SET_SHOW_SEARCH_RESULTS]: (
    state,
    {payload: showSearchResults},
  ) => ({
    ...state,
    showSearchResults,
  }),
});
