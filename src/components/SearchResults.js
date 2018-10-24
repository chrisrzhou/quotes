import React from 'react';
import {connect} from 'react-redux';
import {getFilteredQuotes} from 'redux/selectors';
import {selectQuote} from 'redux/actions';

const SearchResults = ({searchResults, onSelectQuote}) => {
  return <div>{JSON.stringify(searchResults)}</div>;
};

export default connect(
  state => ({
    searchResults: getFilteredQuotes(state),
  }),
  {
    onSelectQuote: selectQuote,
  },
)(SearchResults);
