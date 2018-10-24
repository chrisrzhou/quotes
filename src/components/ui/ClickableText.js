import React from 'react';
import {Text} from 'rebass';
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
    fontSize={[12, 24]}
    fontWeight={active ? 'bold' : undefined}
    onClick={onClick}
    {...otherProps}>
    {children}
  </Text>
);
