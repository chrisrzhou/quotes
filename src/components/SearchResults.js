import React from 'react';
import {connect} from 'react-redux';
import {getFilteredQuotes} from 'redux/selectors';
import {selectQuote} from 'redux/actions';

const SearchResults = ({searchResults, showSearchResults, onSelectQuote}) => {
  if (!showSearchResults) {
    return null;
  }
  return <pre>{JSON.stringify(searchResults, null, 2)}</pre>;
};

export default connect(
  state => ({
    searchResults: getFilteredQuotes(state),
    showSearchResults: state.showSearchResults,
  }),
  {
    onSelectQuote: selectQuote,
  },
)(SearchResults);
