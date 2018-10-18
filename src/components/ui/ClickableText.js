import React from 'react';
import {Text} from 'rebass';
import {colors} from 'styles';

export default ({children, onClick, ...otherProps}) => (
  <Text
    css={`
      color: ${colors.secondary};
      cursor: pointer;

      :hover {
        color: ${colors.hover};
      }
    `}
    fontSize={[16, 24]}
    onClick={onClick}
    {...otherProps}>
    {children}
  </Text>
);
