import { ConnectedRouter } from 'connected-react-router/immutable';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { ReduxAsyncConnect } from 'redux-connect';
import { BrowserRouter as Router } from 'react-router-dom';
import config from '@Config';
import ApiClient from './helpers/ApiClient';
import configureStore from './store/configureStore';
import routes from './routes';

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

const apiClient = new ApiClient();
const dest = document.getElementById('content');

const { store, history } = configureStore(apiClient, preloadedState);

const helpers = {
  apiClient,
  history,
};

const render = (Component) => {
  ReactDOM.hydrate(
    <Provider key="provider" store={store}>
      <ConnectedRouter history={history}>
        <Router basename={config.appBasePath}>{Component}</Router>
      </ConnectedRouter>
    </Provider>,
    dest,
  );
};

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  const fc = dest.firstChild;
  if (!dest || !fc || !fc.attributes) {
    // || !fc.attributes['data-react-checksum']
    console.error(
      'Server-side React render was discarded. Make sure that your initial ' +
        'render does not contain any client-side code.',
    );
  }
}

render(<ReduxAsyncConnect helpers={helpers} routes={routes} />);

if (module.hot) {
  module.hot.accept('./routes', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./routes').default;
    render(<ReduxAsyncConnect helpers={helpers} routes={NextApp} />);
  });
}
