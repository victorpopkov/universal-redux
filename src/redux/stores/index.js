import { applyMiddleware, compose, createStore } from 'redux';
import Cookies from 'universal-cookie';
import { createLogger } from 'redux-logger'; // eslint-disable-line import/no-extraneous-dependencies
import { fromJS } from 'immutable';
import notifyMiddleware from 'redux-notify';
import { persistState } from 'redux-devtools'; // eslint-disable-line import/no-extraneous-dependencies
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import DevTools from '@Containers/DevTools/DevTools'; // eslint-disable-line sort-imports
import clientMiddleware from '@ReduxMiddlewares/client';
import events from '@ReduxEvents';
import reducer from '@ReduxReducers';

/* eslint-disable global-require */
export default (history, client, data, req) => {
  const cookies = (req && req.universalCookies) || new Cookies();

  let middlewares = [
    clientMiddleware(client),
    thunkMiddleware.withExtraArgument(cookies), // enable "redux-thunk"
    routerMiddleware(history), // sync dispatched route actions to the history
    notifyMiddleware(events),
  ];

  let finalCreateStore;
  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    // enable "redux-logger"
    middlewares = [
      ...middlewares,
      createLogger(),
    ];

    finalCreateStore = compose(
      applyMiddleware(...middlewares),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(), // DevTools
      persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    )(createStore);
  } else {
    finalCreateStore = applyMiddleware(...middlewares)(createStore);
  }

  const store = finalCreateStore(reducer, fromJS(data));

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('../reducers/index', () => {
      store.replaceReducer(require('../reducers/index'));
    });
  }

  return store;
};
