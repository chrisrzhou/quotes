import ClickableText from './ClickableText';
import React from 'react';

export default ({active, label, onClick}) => (
  <ClickableText
    active={active}
    fontSize={24}
    fontWeight="bold"
    onClick={onClick}>
    {label}
  </ClickableText>
);
