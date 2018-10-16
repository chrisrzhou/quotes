import React, {Component} from 'react';

import {Flex} from 'rebass';
import quotes from './../quotes.md';

class App extends Component {
  render() {
    return (
      <Flex bg="yellow" justifyContent="space-between">
        <div>adfadfM</div>
        <div>second</div>
        <div>third</div>
        <pre>{JSON.stringify(quotes, null, 2)}</pre>
      </Flex>
    );
  }
}

export default App;
