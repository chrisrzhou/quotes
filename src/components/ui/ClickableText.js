import React from 'react';
import {Text} from 'rebass';
import {colors} from 'styles';

export default ({active, children, fontSize, onClick, ...otherProps}) => (
  <Text
    css={`
      color: ${active ? colors.hover : colors.secondary};
      cursor: pointer;

      :hover {
        color: ${colors.hover};
      }
    `}
    fontSize={fontSize}
    fontWeight={active ? 'bold' : undefined}
    onClick={onClick}
    {...otherProps}>
    {children}
  </Text>
);
