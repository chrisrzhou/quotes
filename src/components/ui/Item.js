import {Flex, Text} from 'rebass';

import React from 'react';
import {colors} from 'styles';

export default ({label, onClick, onClear, width, ...otherProps}) => (
  <Flex
    alignItems="center"
    bg={colors.wash}
    css={`
      color: ${colors.primary};
      cursor: pointer;
      font-size: 14px;
      text-align: center;
    `}
    justifyContent="center"
    px={3}
    py={1}
    width={width || 'fit-content'}
    onClick={onClick}
    {...otherProps}>
    <Text>{label}</Text>
    {onClear && (
      <Text
        css={`
          :hover {
            color: ${colors.hover};
          }
        `}
        fontWeight="bold"
        ml={3}
        onClick={onClear}>
        ×
      </Text>
    )}
  </Flex>
);
