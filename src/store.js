import { Iterable, fromJS } from 'immutable';
import { applyMiddleware, compose, createStore } from 'redux';
import Cookies from 'universal-cookie';
import { createLogger } from 'redux-logger';
import notify from 'redux-notify';
import { persistState } from 'redux-devtools'; // eslint-disable-line import/no-extraneous-dependencies
import { routerMiddleware as router } from 'react-router-redux';
import thunk from 'redux-thunk';
import DevTools from './app/common/dev-tools/DevTools'; // eslint-disable-line sort-imports
import client from './middlewares/client';
import events from './app/events';
import reducers from './reducers';

export default (history, apiClient, data, req) => {
  const cookies = (req && req.universalCookies) || new Cookies();

  const middlewares = [
    client(apiClient),
    notify(events),
    router(history),
    thunk.withExtraArgument({ cookies, history }),
  ];

  let finalCreateStore;
  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    // enable "redux-logger"
    const logger = createLogger({
      collapsed: (getState, action, logEntry) => !logEntry.error,
      stateTransformer: state => ((Iterable.isIterable(state)) ? state.toJS() : state),
    });

    middlewares.push(logger);

    finalCreateStore = compose(
      applyMiddleware(...middlewares),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(), // DevTools
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore);
  } else {
    finalCreateStore = applyMiddleware(...middlewares)(createStore);
  }

  const store = finalCreateStore(reducers, fromJS(data));

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(require('./reducers')); // eslint-disable-line global-require
    });
  }

  return store;
};
