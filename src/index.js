import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import reduxChunk from './components/redux';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { getPath } from './components/utils/url';

const store = createStore(reduxChunk);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path={getPath('/')} component={App} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
