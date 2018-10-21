import {Box, Flex} from 'rebass';

import Item from './Item';
import React from 'react';

export default ({hotkey, description}) => (
  <Flex alignItems="center">
    <Item label={hotkey} width={100} />
    <Box ml={2}>{description}</Box>
  </Flex>
);
