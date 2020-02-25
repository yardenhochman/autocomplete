import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SearchPage from './components/SearchPage';
import * as serviceWorker from './serviceWorker';
import { Provider } from './context';

ReactDOM.render(
  <Provider value={{ version2: false }}>
    <SearchPage />
  </Provider>,
  document.getElementById('root'),
);

serviceWorker.unregister();
