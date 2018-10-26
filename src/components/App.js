import {Box} from 'rebass';
import Footer from './Footer';
import Menu from './Menu';
import Nav from './Nav';
import Quote from './Quote';
import React from 'react';
import Swipeable from 'react-swipeable';
import {colors} from 'styles';
import {connect} from 'react-redux';
import {randomQuote} from 'redux/actions';

const App = ({onRandomQuote}) => (
  <Swipeable onSwipingLeft={onRandomQuote} onSwipingRight={onRandomQuote}>
    <Box
      css={`
        color: ${colors.primary};
        overflow: hidden;
      `}>
      <Nav />
      <Menu />
      <Quote />
      <Footer />
    </Box>
  </Swipeable>
);

export default connect(
  null,
  {
    onRandomQuote: randomQuote,
  },
)(App);
