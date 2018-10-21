import {Box} from 'rebass';
import Footer from './Footer';
import Menu from './Menu';
import Nav from './Nav';
import Quote from './Quote';
import React from 'react';
import {colors} from 'styles';

export default () => (
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
);
