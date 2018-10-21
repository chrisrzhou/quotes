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
  paused: false,
  searchString: null,
  selectedAuthor: null,
  selectedQuoteIndex: 0,
  selectedTag: null,
  menuMode: null,
});

export default createReducer(getInitialState(), {
  [actionTypes.PAUSE]: (state, {payload: paused}) => ({
    ...state,
    paused: paused === undefined ? !state.paused : paused,
  }),
  [actionTypes.RESET]: (state, _action) => ({
    ...getInitialState(),
    selectedQuoteIndex: state.selectedQuoteIndex,
  }),
  [actionTypes.SEARCH]: (state, {payload: searchString}) => ({
    ...state,
    searchString,
    menuMode: 'quote',
  }),
  [actionTypes.SELECT_AUTHOR]: (state, {payload: selectedAuthor}) => ({
    ...state,
    selectedAuthor,
    menuMode: 'quote',
  }),
  [actionTypes.SELECT_QUOTE]: (state, {payload: selectedQuoteIndex}) => ({
    ...state,
    selectedQuoteIndex,
  }),
  [actionTypes.SELECT_TAG]: (state, {payload: selectedTag}) => ({
    ...state,
    selectedTag,
    menuMode: 'quote',
  }),
  [actionTypes.SET_MENU_MODE]: (state, {payload: menuMode}) => ({
    ...state,
    menuMode: menuMode === state.menuMode ? null : menuMode,
  }),
});
