import { applyMiddleware, compose } from 'redux';
import { Iterable } from 'immutable';
import { createLogger } from 'redux-logger'; // eslint-disable-line import/no-extraneous-dependencies
import { persistState } from 'redux-devtools'; // eslint-disable-line import/no-extraneous-dependencies
import DevTools from '../app/common/dev-tools/DevTools';

const devTools = (middlewares) => {
  const logger = createLogger({
    collapsed: (getState, action, logEntry) => !logEntry.error,
    stateTransformer: (state) =>
      Iterable.isIterable(state) ? state.toJS() : state,
  });

  middlewares.push(logger);

  const fn = window.__REDUX_DEVTOOLS_EXTENSION__;

  return compose(
    applyMiddleware(...middlewares),
    fn ? fn() : DevTools.instrument(), // DevTools
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
  );
};

export default devTools;
