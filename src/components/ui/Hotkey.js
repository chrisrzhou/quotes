import {Box, Flex} from 'rebass';

import React from 'react';
import Token from './Token';

export default ({hotkey, description}) => (
  <Flex alignItems="center">
    <Token label={hotkey} width={100} />
    <Box ml={2}>{description}</Box>
  </Flex>
);
