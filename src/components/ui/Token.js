import {Flex, Text} from 'rebass';

import React from 'react';
import {colors} from 'styles';

export default ({active, label, onClick, width, ...otherProps}) => (
  <Flex
    alignItems="center"
    bg={active ? colors.white : colors.wash}
    css={`
      border: 1px solid ${active ? colors.hover : colors.wash};
      border-radius: 4px;
      color: ${active ? colors.hover : colors.primary};
      cursor: pointer;
      font-size: 14px;
      text-align: center;
    `}
    justifyContent="center"
    px={2}
    py={1}
    width={width || 'fit-content'}
    onClick={onClick}
    {...otherProps}>
    <Text>{label}</Text>
    {active && <Text ml={2}>×</Text>}
  </Flex>
);
