import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import Express from 'express';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import StaticRouter from 'react-router-dom/StaticRouter';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookiesMiddleware from 'universal-cookie-express';
import createHistory from 'history/createMemoryHistory';
import favicon from 'serve-favicon';
import http from 'http';
import httpProxy from 'http-proxy';
import { parse as parseUrl } from 'url';
import path from 'path';
import ApiClient from '@Helpers/ApiClient'; // eslint-disable-line sort-imports
import Html from '@Helpers/Html';
import config from '@Config';
import createStore from '@ReduxStores';
import routes from './routes';

const targetUrl = `${config.apiSchema}://${config.apiHost}:${config.apiPort + config.apiPrefix}`;
const app = new Express();
const server = new http.Server(app);
const proxy = httpProxy.createProxyServer({
  changeOrigin: true,
  target: targetUrl,
  ws: false,
});

// paths
const pathBuild = path.resolve(__dirname, '../build/');
const pathFavicon = __DEVELOPMENT__ ? path.resolve(__dirname, 'assets/favicon/favicon.ico') : path.resolve(pathBuild, 'assets/favicon/favicon.ico');

app
  .use('/api', (req, res) => {
    proxy.web(req, res);
  })
  .use(bodyParser.urlencoded({
    extended: false,
    type: 'application/x-www-form-urlencoded',
  }))
  .use(compression())
  .use(cookiesMiddleware())
  .use(Express.static(pathBuild))
  .use(favicon(pathFavicon))
  .get('*', (req, res) => {
    // clear require() cache if in development mode (makes asset hot reloading work).
    if (__DEVELOPMENT__) {
      webpackIsomorphicTools.refresh();
    }

    const url = req.originalUrl || req.url;
    const apiClient = new ApiClient(req);
    const helpers = [apiClient];
    const location = parseUrl(url);
    const memoryHistory = createHistory(url);
    const store = createStore(memoryHistory, apiClient, {}, req);

    function hydrateOnClient() {
      res.send(`<!doctype html>\n${ReactDOMServer.renderToString(<Html
        assets={webpackIsomorphicTools.assets()}
        store={store}
      />)}`);
    }

    if (__DISABLE_SSR__) {
      hydrateOnClient();
    }

    // 1. load data
    loadOnServer({
      store,
      location,
      routes,
      helpers,
    })
      .then(() => {
        const context = {};

        // 2. use `ReduxAsyncConnect` to render component tree
        const appHTML = ReactDOMServer.renderToString(
          <Provider key="provider" store={store}>
            <StaticRouter context={context} location={location}>
              <ReduxAsyncConnect helpers={helpers} routes={routes} />
            </StaticRouter>
          </Provider>
        );

        // context.url will contain the URL to redirect to if a <Redirect> was used
        if (context.url) {
          req.header('Location', context.url);
          return res.send(302);
        }

        // 3. render the Redux initial data into the server markup
        return res.send(`<!doctype html>\n${ReactDOMServer.renderToString(<Html
          assets={webpackIsomorphicTools.assets()}
          component={appHTML}
          store={store}
        />)}`);
      });
  });

if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }

    console.info(
      '----\n==> %s is running, talking to API server (%s).',
      config.app.title,
      `${config.apiHost}:${config.apiPort}`
    );

    console.info('==> Open http://%s:%s in a browser to view the app.', config.host, config.port);
  });
} else {
  console.error('==> ERROR: No PORT environment variable has been specified');
}
