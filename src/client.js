import 'babel-polyfill';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { ReduxAsyncConnect } from 'redux-connect';
import createHistory from 'history/createBrowserHistory';
import { hydrate } from 'react-dom';
import ApiClient from '@Helpers/ApiClient'; // eslint-disable-line sort-imports
// import DevTools from './containers/DevTools/DevTools';
import createStore from '@ReduxStores';
import routes from './routes';

const apiClient = new ApiClient();
const dest = document.getElementById('content');
const helpers = [apiClient];
const history = createHistory();
const store = createStore(history, apiClient, window.__data); // eslint-disable-line

const reduxAsyncConnect = (
  <ReduxAsyncConnect helpers={helpers} routes={routes} />
);

hydrate(
  <Provider key="provider" store={store}>
    <BrowserRouter>
      {reduxAsyncConnect}
    </BrowserRouter>
  </Provider>,
  dest
);

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  const fc = dest.firstChild;
  if (!dest || !fc || !fc.attributes) { // || !fc.attributes['data-react-checksum']
    console.error('Server-side React render was discarded. ' +
      'Make sure that your initial render does not contain any client-side code.');
  }
}

// noinspection JSUnresolvedVariable
if (__DEVTOOLS__ && !window.devToolsExtension) {
  ReactDOM.render(
    <Provider key="provider" store={store}>
      <BrowserRouter>
        {reduxAsyncConnect}
      </BrowserRouter>
    </Provider>,
    dest,
  );
}
