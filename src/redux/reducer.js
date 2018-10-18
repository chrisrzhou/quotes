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
  selectedQuoteIndex: 0,
  selectedTag: null,
  showSearchResults: false,
});

export default createReducer(getInitialState(), {
  [actionTypes.RESET]: (state, _action) => ({
    ...getInitialState(),
    selectedQuoteIndex: state.selectedQuoteIndex,
  }),
  [actionTypes.SEARCH]: (state, {payload: searchString}) => ({
    ...state,
    searchString,
    showSearchResults: true,
  }),
  [actionTypes.SELECT_AUTHOR]: (state, {payload: selectedAuthor}) => ({
    ...state,
    selectedAuthor,
    showSearchResults: true,
  }),
  [actionTypes.SELECT_QUOTE]: (state, {payload: selectedQuoteIndex}) => ({
    ...state,
    selectedQuoteIndex,
  }),
  [actionTypes.SELECT_TAG]: (state, {payload: selectedTag}) => ({
    ...state,
    selectedTag,
    showSearchResults: true,
  }),
  [actionTypes.SET_SHOW_SEARCH_RESULTS]: (
    state,
    {payload: showSearchResults},
  ) => ({
    ...state,
    showSearchResults:
      showSearchResults === undefined
        ? !state.showSearchResults
        : showSearchResults,
  }),
});
