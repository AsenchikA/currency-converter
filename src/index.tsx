import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { App } from './app';
import { store } from './store';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw Error('Root is undefined');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
