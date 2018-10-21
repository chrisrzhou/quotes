import React from 'react';
import {Text} from 'rebass';
import {colors} from 'styles';

export default ({children, external, href}) => (
  <Text
    css={`
      a {
        color: ${colors.secondary};
        cursor: pointer;
        text-decoration: none;

        :hover {
          color: ${colors.hover};
        }
      }
    `}>
    <a href={href} target={external ? '_blank' : undefined}>
      {children}
    </a>
  </Text>
);
