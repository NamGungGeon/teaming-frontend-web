import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import { ReactRouterGlobalHistory } from 'react-router-global-history';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/analytics';
import reduxChunk from './redux/quick';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(reduxChunk);

const firebaseConfig = {
  apiKey: 'AIzaSyC-bJ2yt6CCjgo665O2ROZWhFVRw_Vfisc',
  authDomain: 'teaming-b5b2b.firebaseapp.com',
  databaseURL: 'https://teaming-b5b2b.firebaseio.com',
  projectId: 'teaming-b5b2b',
  storageBucket: 'teaming-b5b2b.appspot.com',
  messagingSenderId: '460572824656',
  appId: '1:460572824656:web:58ac3c81ce3461c0b02d55',
  measurementId: 'G-L20Q8LFE9L'
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
firebase.analytics();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ReactRouterGlobalHistory />
      <Route path={'/'} component={App} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.register();
