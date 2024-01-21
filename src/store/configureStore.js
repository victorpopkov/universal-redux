import { applyMiddleware, createStore } from 'redux';
import { createBrowserHistory, createMemoryHistory } from 'history';
import Cookies from 'universal-cookie';
import { fromJS } from 'immutable';
import notify from 'redux-notify';
import { routerMiddleware } from 'connected-react-router/immutable';
import thunk from 'redux-thunk';
import client from '../middlewares/client';
import createRootReducer from '../reducers';
import events from '../app/events';

export default (apiClient, data, req, location) => {
  const history = __SERVER__
    ? createMemoryHistory({
        initialEntries: [location],
      })
    : createBrowserHistory();

  const cookies = (req && req.universalCookies) || new Cookies();

  const middlewares = [
    client(apiClient),
    notify(events),
    routerMiddleware(history),
    thunk.withExtraArgument({ cookies, history }),
  ];

  let finalCreateStore;
  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    const devTools = require('./dev-tools').default; // eslint-disable-line global-require
    finalCreateStore = devTools(middlewares)(createStore);
  } else {
    finalCreateStore = applyMiddleware(...middlewares)(createStore);
  }

  const store = finalCreateStore(createRootReducer(history), fromJS(data));

  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('../reducers', () => {
      store.replaceReducer(createRootReducer(history));
    });
  }

  return {
    history,
    store,
  };
};
