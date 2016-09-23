import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import {Router, browserHistory} from 'react-router';
import configureStore from './store/configureStore';
import { loadState } from './store/localStorage';
import routes from './routes';

const preloadedState = loadState();
const store = configureStore(preloadedState);

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}></Router>
  </Provider>,
  document.getElementById('root')
)
