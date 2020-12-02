import { ConnectedRouter } from 'connected-react-router/immutable';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { ReduxAsyncConnect } from 'redux-connect';
import { BrowserRouter as Router } from 'react-router-dom';
import ApiClient from './helpers/ApiClient'; // eslint-disable-line sort-imports
import config from '../config';
import configureStore from './store/configureStore';
import routes from './routes';

/* eslint-disable no-underscore-dangle */
const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;
/* eslint-enable no-underscore-dangle */

const apiClient = new ApiClient();
const dest = document.getElementById('content');

const { store, history } = configureStore(apiClient, preloadedState);

const helpers = {
  apiClient,
  history,
};

const reduxAsyncConnect = (
  <ReduxAsyncConnect helpers={helpers} routes={routes} />
);

ReactDOM.hydrate(
  <Provider key="provider" store={store}>
    <ConnectedRouter history={history}>
      <Router basename={config.appBasePath}>{reduxAsyncConnect}</Router>
    </ConnectedRouter>
  </Provider>,
  dest,
);

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  const fc = dest.firstChild;
  if (!dest || !fc || !fc.attributes) {
    // || !fc.attributes['data-react-checksum']
    console.error(
      'Server-side React render was discarded. Make sure that your initial render does ' +
        'not contain any client-side code.',
    );
  }
}

// noinspection JSUnresolvedVariable
if (__DEVTOOLS__ && !window.devToolsExtension) {
  ReactDOM.render(
    <Provider key="provider" store={store}>
      <ConnectedRouter history={history}>
        <Router>{reduxAsyncConnect}</Router>
      </ConnectedRouter>
    </Provider>,
    dest,
  );
}
