import {reset, selectQuote, setMenuMode, togglePause} from 'redux/actions';

import {Flex} from 'rebass';
import Link from './ui/Link';
import NavItem from './ui/NavItem';
import React from 'react';
import Row from './ui/Row';
import {connect} from 'react-redux';
import {getFilteredQuotes} from 'redux/selectors';

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
        p={3}>
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
          <NavItem label="?" onClick={() => onSetMenuMode('help')} />
          <Link
            external
            href="https://github.com/chrisrzhou/quotes/blob/master/src/quotes.md">
            <NavItem label="</>" />
          </Link>
        </Row>
      </Flex>
    );
  }

  _handleHotKey = e => {
    const {onTogglePause, onSetMenuMode} = this.props;
    if (e.key.toLowerCase() !== 'escape' && e.target.localName === 'input') {
      return;
    }
    switch (e.key.toLowerCase()) {
      case 'r':
        this.props.onReset();
        break;
      case 'arrowleft':
      case 'arrowright':
        this._randomQuote();
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
    if (this.props.paused) {
      clearInterval(this._interval);
      this._interval = undefined;
    } else {
      if (!this._interval) {
        this._interval = setInterval(this._randomQuote, 15000);
      }
    }
  };

  _randomQuote = () => {
    const {quotes, onSelectQuote} = this.props;
    if (quotes.length > 0) {
      onSelectQuote(quotes[Math.floor(Math.random() * quotes.length)].id);
    }
  };
}

export default connect(
  state => ({
    activeAuthors: state.selectedAuthors.length > 0,
    activeTags: state.selectedTags.length > 0,
    quotes: getFilteredQuotes(state),
    paused: state.paused,
  }),
  {
    onTogglePause: togglePause,
    onReset: reset,
    onSetMenuMode: setMenuMode,
    onSelectQuote: selectQuote,
  },
)(Nav);
