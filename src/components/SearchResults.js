import React from 'react';
import {connect} from 'react-redux';
import {getSearchResults} from 'redux/selectors';
import {selectQuote} from 'redux/actions';

const SearchResults = ({searchResults, showSearchResults, onSelectQuote}) => {
  if (!showSearchResults) {
    return null;
  }
  return <div>{JSON.stringify(searchResults, null, 2)}</div>;
};

export default connect(
  state => ({
    searchResults: getSearchResults(state),
    showSearchResults: state.showSearchResults,
  }),
  {
    onSelectQuote: selectQuote,
  },
)(SearchResults);
