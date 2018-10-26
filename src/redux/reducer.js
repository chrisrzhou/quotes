import {actionTypes} from './actions';
import {getFilteredQuotes} from './selectors';
import quotesData from 'quotes.md';
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

const getRandomQuoteId = quotes => {
  return quotes[Math.floor(Math.random() * quotes.length)].id;
};

const quotes = {};
quotesData.map(quote => {
  const id = shortid();
  quotes[id] = {
    ...quote,
    id,
  };
});

const getInitialState = () => ({
  quotes,
  paused: false,
  searchString: '',
  selectedAuthors: [],
  quoteId: getRandomQuoteId(Object.values(quotes)),
  selectedTags: [],
  menuMode: null,
});

export default createReducer(getInitialState(), {
  [actionTypes.CLEAR_ALL_AUTHORS]: (state, _action) => ({
    ...state,
    selectedAuthors: [],
  }),
  [actionTypes.CLEAR_ALL_TAGS]: (state, _action) => ({
    ...state,
    selectedTags: [],
  }),
  [actionTypes.RANDOM_QUOTE]: (state, _action) => {
    const quotes = getFilteredQuotes(state);
    if (quotes.length === 0) {
      return state;
    }
    return {
      ...state,
      quoteId: getRandomQuoteId(quotes),
    };
  },
  [actionTypes.RESET]: (state, _action) => ({
    ...getInitialState(),
    quoteId: state.quoteId,
  }),
  [actionTypes.SEARCH]: (state, {payload}) => ({
    ...state,
    menuMode: 'quote',
    searchString: payload,
  }),
  [actionTypes.SELECT_QUOTE]: (state, {payload}) => ({
    ...state,
    quoteId: payload,
  }),
  [actionTypes.SELECT_AUTHOR]: (state, {payload}) => {
    const {selectedAuthors} = state;
    return {
      ...state,
      menuMode: 'author',
      selectedAuthors: selectedAuthors.includes(payload)
        ? selectedAuthors.filter(author => author !== payload)
        : [...selectedAuthors, payload],
    };
  },
  [actionTypes.SELECT_TAG]: (state, {payload}) => {
    const {selectedTags} = state;
    return {
      ...state,
      menuMode: 'tag',
      selectedTags: selectedTags.includes(payload)
        ? selectedTags.filter(tag => tag !== payload)
        : [...selectedTags, payload],
    };
  },
  [actionTypes.SET_MENU_MODE]: (state, {payload}) => ({
    ...state,
    menuMode: payload === state.menuMode ? null : payload,
    searchString: '',
  }),
  [actionTypes.TOGGLE_PAUSE]: (state, {payload}) => ({
    ...state,
    paused: payload === undefined ? !state.paused : payload,
  }),
});
