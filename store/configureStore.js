import { createStore, applyMiddleware } from 'redux'
import throttle from 'lodash/throttle';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers';
import { saveState } from '../localStorage';

export default function configureStore(preloadedState) {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunkMiddleware, createLogger())
  );

  //save any changes to the state to localstorage
  store.subscribe(throttle(() => {
    const {cache, selectedReddit, subReddits} = store.getState();
    saveState({
      cache,
      selectedReddit,
      subReddits
    });
  }, 1000));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
