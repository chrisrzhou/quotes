import Quote from './Quote';
import React from 'react';
import Search from './Search';
import SearchResults from './SearchResults';
import {connect} from 'react-redux';

class App extends React.PureComponent {
  render() {
    const {quote} = this.props;
    return (
      <div>
        <Quote quote={quote} />
        <Search />
        <SearchResults />
      </div>
    );
  }
}

export default connect(state => ({
  quote: state.quotes[state.selectedQuoteIndex],
}))(App);
