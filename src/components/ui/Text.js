import React from 'react';
import {Text} from 'rebass';
import {colors} from 'styles';

export default ({css, ...otherProps}) => (
  <Text
    color={colors.secondary}
    css={`
      ${css};
    `}
    fontSize={[16, 24]}
    {...otherProps}
  />
);
