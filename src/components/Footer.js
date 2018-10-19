import {Flex} from 'rebass';
import Link from './ui/Link';
import {Logo} from '@chrisrzhou/ui';
import React from 'react';

export default () => (
  <Flex
    alignItems="center"
    css={`
      bottom: 0px;
      font-family: sans-serif;
      font-size: 12px;
      left: 0;
      position: fixed;
      right: 0;
    `}
    justifyContent="space-between"
    px={2}
    py={1}>
    <Logo size={24} />
    <Link href="https://github.com/chrisrzhou/quoter">Github</Link>
  </Flex>
);
