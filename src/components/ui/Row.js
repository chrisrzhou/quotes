import {Flex} from 'rebass';
import React from 'react';

export default ({children, align, ...otherProps}) => (
  <Flex
    alignItems="center"
    css={`
      > * {
        :not(:last-child) {
          margin-right: ${align === 'left' ? '24px' : undefined};
        }
        :not(:first-child) {
          margin-left: ${align === 'right' ? '24px' : undefined};
        }
      }
    `}
    flexWrap="wrap"
    {...otherProps}>
    {children}
  </Flex>
);
