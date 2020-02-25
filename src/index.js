import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'context';
import { SearchPage } from 'SearchPage';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Provider value={{ version2: false }}>
    <SearchPage />
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
