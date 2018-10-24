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
  searchString: '',
  selectedAuthors: [],
  selectedQuoteIndex: 0,
  selectedTags: [],
  menuMode: null,
});

export default createReducer(getInitialState(), {
  [actionTypes.TOGGLE_PAUSE]: (state, {payload}) => ({
    ...state,
    paused: payload === undefined ? !state.paused : payload,
  }),
  [actionTypes.RESET]: (state, _action) => ({
    ...getInitialState(),
    selectedQuoteIndex: state.selectedQuoteIndex,
  }),
  [actionTypes.SEARCH]: (state, {payload}) => ({
    ...state,
    searchString: payload,
    menuMode: 'quote',
  }),
  [actionTypes.SELECT_QUOTE]: (state, {payload}) => ({
    ...state,
    selectedQuoteIndex: payload,
  }),
  [actionTypes.SELECT_AUTHOR]: (state, {payload}) => {
    const {selectedAuthors} = state;
    return {
      ...state,
      selectedAuthors: selectedAuthors.includes(payload)
        ? selectedAuthors.filter(author => author !== payload)
        : [...selectedAuthors, payload],
    };
  },
  [actionTypes.SELECT_TAG]: (state, {payload}) => {
    const {selectedTags} = state;
    return {
      ...state,
      selectedTags: selectedTags.includes(payload)
        ? selectedTags.filter(tag => tag !== payload)
        : [...selectedTags, payload],
    };
  },
  [actionTypes.SET_MENU_MODE]: (state, {payload}) => ({
    ...state,
    menuMode: payload === state.menuMode ? null : payload,
  }),
});
