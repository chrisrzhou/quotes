import React from 'react';
import Text from './Text';
import {colors} from 'styles';

export default ({active, children, onClick, ...otherProps}) => (
  <Text
    css={`
      color: ${active ? colors.hover : colors.secondary};
      cursor: pointer;

      :hover {
        color: ${colors.hover};
      }
    `}
    fontWeight={active ? 'bold' : undefined}
    onClick={onClick}
    {...otherProps}>
    {children}
  </Text>
);
