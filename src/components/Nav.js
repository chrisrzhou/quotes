import {pause, reset, selectQuote, setMenuMode} from 'redux/actions';

import {Flex} from 'rebass';
import Link from './ui/Link';
import NavItem from './ui/NavItem';
import React from 'react';
import Row from './ui/Row';
import {connect} from 'react-redux';

class Nav extends React.PureComponent {
  componentDidMount() {
    window.addEventListener('keydown', this._handleHotKey, false);
    this._startInterval();
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this._handleHotKey, false);
    this._endInterval();
  }

  render() {
    const {
      paused,
      onPause,
      onSetMenuMode,
      searchString,
      selectedAuthor,
      selectedTag,
    } = this.props;
    return (
      <Flex
        css={`
          left: 0;
          position: fixed;
          right: 0;
          top: 0;
          z-index: 1;
        `}
        justifyContent="space-between"
        p={3}>
        <Row align="left">
          <NavItem
            active={searchString || selectedAuthor || selectedTag}
            label="Q"
            onClick={() => onSetMenuMode('quote')}
          />
          <NavItem
            active={selectedAuthor}
            label="@"
            onClick={() => onSetMenuMode('author')}
          />
          <NavItem
            active={selectedTag}
            label="#"
            onClick={() => onSetMenuMode('tag')}
          />
          <NavItem label="?" onClick={() => onSetMenuMode('help')} />
        </Row>
        <Row align="right">
          <NavItem
            label={
              paused ? <span>&#9658;</span> : <span>&#10073;&#10073;</span>
            }
            onClick={() => onPause()}
          />
          <Link
            external
            href="https://github.com/chrisrzhou/quotes/src/quotes.md">
            <NavItem label="</>" />
          </Link>
        </Row>
      </Flex>
    );
  }

  _handleHotKey = e => {
    const {paused, onPause, onSetMenuMode} = this.props;
    if (e.key.toLowerCase() !== 'escape' && e.target.localName === 'input') {
      return;
    }
    switch (e.key.toLowerCase()) {
      case 'r':
        this.props.onReset();
        break;
      case 'arrowleft':
        this._previousQuote();
        break;
      case 'arrowright':
        this._nextQuote();
        break;
      case 'a':
        onSetMenuMode('author');
        break;
      case 'q':
      case 's':
        onSetMenuMode('quote');
        break;
      case 't':
        onSetMenuMode('tag');
        break;
      case 'escape':
        onSetMenuMode();
        break;
      case '?':
        onSetMenuMode('help');
        break;
      case ' ':
        if (paused) {
          this._startInterval();
        } else {
          this._endInterval();
        }
        onPause();
        break;
      default:
        break;
    }
  };

  _startInterval = () => {
    this._interval = setInterval(this._nextQuote, 20000);
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
    selectedAuthor: state.selectedAuthor,
    selectedQuoteIndex: state.selectedQuoteIndex,
    selectedTag: state.selectedTag,
    quotes: state.quotes,
    paused: state.paused,
  }),
  {
    onPause: pause,
    onReset: reset,
    onSetMenuMode: setMenuMode,
    onSelectQuote: selectQuote,
  },
)(Nav);
