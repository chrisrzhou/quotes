import App from './App';
import {Provider} from 'react-redux';
import React from 'react';
import store from 'redux/store';

export default () => (
  <Provider store={store}>
    <App />
  </Provider>
);
