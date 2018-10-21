import {Box, Flex} from 'rebass';

import React from 'react';

export default ({items}) => (
  <Flex flexDirection="column">
    {items.map((item, i) => (
      <Box key={i} my={1}>
        {item}
      </Box>
    ))}
  </Flex>
);
