import React from 'react';
import {Text} from 'rebass';
import {colors} from 'styles';

export default ({children, href}) => (
  <Text
    css={`
      a {
        color: ${colors.secondary};
        cursor: pointer;

        :hover {
          color: ${colors.hover};
        }
      }
    `}
    fontFamily="sans-serif"
    font={12}>
    <a href={href}>{children}</a>
  </Text>
);
