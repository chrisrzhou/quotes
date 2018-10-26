import {randomQuote, reset, setMenuMode, togglePause} from 'redux/actions';

import {Flex} from 'rebass';
import Link from './ui/Link';
import NavItem from './ui/NavItem';
import React from 'react';
import Row from './ui/Row';
import TweetShare from './TweetShare';
import {connect} from 'react-redux';
import {getQuote} from 'redux/selectors';

class Nav extends React.PureComponent {
  componentDidMount() {
    window.addEventListener('keydown', this._handleHotKey, false);
    this._handlePause();
  }

  componentDidUpdate() {
    this._handlePause();
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this._handleHotKey, false);
    clearInterval(this._interval);
  }

  render() {
    const {
      activeAuthors,
      activeTags,
      paused,
      quote,
      onTogglePause,
      onSetMenuMode,
    } = this.props;
    return (
      <Flex
        css={`
          box-sizing: border-box;
          height: 50px;
          left: 0;
          position: fixed;
          right: 0;
          top: 0;
          z-index: 1;
        `}
        justifyContent="space-between"
        px={3}
        py={2}>
        <Row align="left">
          <NavItem label="Q" onClick={() => onSetMenuMode('quote')} />
          <NavItem
            active={activeAuthors}
            label="@"
            onClick={() => onSetMenuMode('author')}
          />
          <NavItem
            active={activeTags}
            label="#"
            onClick={() => onSetMenuMode('tag')}
          />
          <NavItem
            label={
              paused ? <span>&#9658;</span> : <span>&#10073;&#10073;</span>
            }
            onClick={() => onTogglePause()}
          />
        </Row>
        <Row align="right">
          <TweetShare
            quote={quote.content}
            author={quote.author}
            tags={quote.tags}
          />
          <Link
            external
            href="https://github.com/chrisrzhou/quotes/blob/master/src/quotes.md">
            <NavItem label="</>" />
          </Link>
          <NavItem label="?" onClick={() => onSetMenuMode('help')} />
        </Row>
      </Flex>
    );
  }

  _handleHotKey = e => {
    const {onTogglePause, onRandomQuote, onReset, onSetMenuMode} = this.props;
    if (e.key.toLowerCase() !== 'escape' && e.target.localName === 'input') {
      return;
    }
    switch (e.key.toLowerCase()) {
      case 'r':
        onReset();
        break;
      case 'arrowleft':
      case 'arrowright':
        onRandomQuote();
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
        onTogglePause();
        break;
      default:
        break;
    }
  };

  _handlePause = () => {
    const {onRandomQuote, paused} = this.props;
    if (paused) {
      clearInterval(this._interval);
      this._interval = undefined;
    } else {
      if (!this._interval) {
        this._interval = setInterval(onRandomQuote, 15000);
      }
    }
  };
}

export default connect(
  state => ({
    activeAuthors: state.selectedAuthors.length > 0,
    activeTags: state.selectedTags.length > 0,
    quote: getQuote(state),
    paused: state.paused,
  }),
  {
    onTogglePause: togglePause,
    onReset: reset,
    onSetMenuMode: setMenuMode,
    onRandomQuote: randomQuote,
  },
)(Nav);
