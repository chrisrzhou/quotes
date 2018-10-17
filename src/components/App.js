import {Flex} from 'rebass';
import React from 'react';
import {connect} from 'react-redux';

class App extends React.PureComponent {
  render() {
    return (
      <Flex bg="yellow" justifyContent="space-between">
        <div>adfadfM</div>
        <div>second</div>
        <div>third</div>
        <pre>{JSON.stringify(this.props.quotes, null, 2)}</pre>
      </Flex>
    );
  }
}

export default connect(state => ({quotes: state.quotes}))(App);
