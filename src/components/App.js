import {pause, reset, selectQuote, setShowSearchResults} from 'redux/actions';

import {Box} from 'rebass';
import Footer from './Footer';
import Nav from './Nav';
import Quote from './Quote';
import React from 'react';
import {colors} from 'styles';
import {connect} from 'react-redux';

const KEY_CODES = {
  ESC: 27,
  LEFT: 37,
  RIGHT: 39,
  SPACE: 32,
  R: 82,
  S: 83,
};

class App extends React.PureComponent {
  componentDidMount() {
    window.addEventListener('keydown', this._handleHotKey, false);
    this._startInterval();
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this._handleHotKey, false);
    this._endInterval();
  }

  render() {
    const {quotes, selectedQuoteIndex} = this.props;
    return (
      <Box
        css={`
          color: ${colors.primary};
          overflow: hidden;
        `}>
        <Nav />
        <Quote quote={quotes[selectedQuoteIndex]} />
        <Footer />
      </Box>
    );
  }

  _handleHotKey = ({keyCode}) => {
    const {paused, onPause, onSetShowSearchResults} = this.props;
    switch (keyCode) {
      case KEY_CODES.R:
        this.props.onReset();
        break;
      case KEY_CODES.LEFT:
        this._previousQuote();
        break;
      case KEY_CODES.RIGHT:
        this._nextQuote();
        break;
      case KEY_CODES.ESC:
      case KEY_CODES.S:
        onSetShowSearchResults();
        break;
      case KEY_CODES.SPACE:
        if (paused) {
          onPause(false);
          this._startInterval();
        } else {
          onPause(true);
          this._endInterval();
        }
        break;
    }
  };

  _startInterval = () => {
    this._interval = setInterval(this._nextQuote, 8000);
  };

  _endInterval = () => {
    if (this._interval) {
      clearInterval(this._interval);
      this._interval = undefined;
    }
  };

  _nextQuote = () => {
    const {quotes, onSelectQuote, selectedQuoteIndex} = this.props;
    onSelectQuote((selectedQuoteIndex + 1) % quotes.length);
  };

  _previousQuote = () => {
    const {quotes, onSelectQuote, selectedQuoteIndex} = this.props;
    onSelectQuote(
      (selectedQuoteIndex === 0 ? quotes.length - 1 : selectedQuoteIndex - 1) %
        quotes.length,
    );
  };
}

export default connect(
  state => ({
    selectedQuoteIndex: state.selectedQuoteIndex,
    paused: state.paused,
    quotes: state.quotes,
  }),
  {
    onPause: pause,
    onReset: reset,
    onSetShowSearchResults: setShowSearchResults,
    onSelectQuote: selectQuote,
  },
)(App);
