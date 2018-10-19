import {Flex} from 'rebass';
import React from 'react';
import Search from './Search';
import SearchResults from './SearchResults';

export default () => {
  return (
    <Flex>
      <Search />
      <SearchResults />
    </Flex>
  );
};
