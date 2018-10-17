import {getAuthors, getTags} from 'redux/selectors';
import {search, selectAuthor, selectQuote, selectTag} from 'redux/actions';

import React from 'react';
import {connect} from 'react-redux';

const Search = ({
  authors,
  onSearch,
  onSelectAuthor,
  onSelectQuote,
  onSelectTag,
  searchString,
  tags,
}) => {
  return (
    <div>
      {JSON.stringify(authors, null, 2)}
      {JSON.stringify(tags, null, 2)}
      <input
        onChange={e => {
          onSearch(e.target.value);
        }}
        value={searchString}
      />
    </div>
  );
};

export default connect(
  state => ({
    authors: getAuthors(state),
    searchString: state.searchString,
    tags: getTags(state),
  }),
  {
    onSearch: search,
    onSelectAuthor: selectAuthor,
    onSelectQuote: selectQuote,
    onSelectTag: selectTag,
  },
)(Search);
