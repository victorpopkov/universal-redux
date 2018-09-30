import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import Express from 'express';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookiesMiddleware from 'universal-cookie-express';
import createHistory from 'history/createMemoryHistory';
import favicon from 'serve-favicon';
import http from 'http';
import httpProxy from 'http-proxy';
import { parse as parseUrl } from 'url';
import path from 'path';
import ApiClient from './helpers/ApiClient'; // eslint-disable-line sort-imports
import Html from './helpers/Html';
import config from '@Config';
import createStore from './store';
import routes from './routes';

export default ({ chunks }) => {
  const app = new Express();
  const server = new http.Server(app);
  const proxy = httpProxy.createProxyServer({
    changeOrigin: true,
    target: config.appApiProxyTarget,
    ws: false,
  });

  // paths
  const pathBuild = path.resolve(__dirname, '../build/');
  const pathFavicon = __DEVELOPMENT__ ? path.resolve(__dirname, 'assets/favicon/favicon.ico') : path.resolve(pathBuild, 'assets/favicon/favicon.ico');

  if (!config.appApiProxyDisabled) {
    app.use(config.appApiProxyPath, (req, res) => {
      proxy.web(req, res);
    });
  }

  app
    .use(bodyParser.urlencoded({
      extended: false,
      type: 'application/x-www-form-urlencoded',
    }))
    .use(compression())
    .use(cookiesMiddleware())
    .use(Express.static(pathBuild))
    .use(favicon(pathFavicon))
    .get('*', (req, res) => {
      const url = req.originalUrl || req.url;
      const apiClient = new ApiClient(req);
      const history = createHistory(url);
      const location = parseUrl(url);
      const store = createStore(history, apiClient, {}, req);

      const helpers = {
        apiClient,
        history,
      };

      function hydrateOnClient() {
        res.send(`<!doctype html>\n${ReactDOMServer.renderToString(<Html
          assets={chunks()}
          store={store}
        />)}`);
      }

      if (__SERVER__ && __DISABLE_SSR__) {
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
              <Router context={context} location={location}>
                <ReduxAsyncConnect helpers={helpers} routes={routes} />
              </Router>
            </Provider>
          );

          // context.url will contain the URL to redirect to if a <Redirect> was used
          const { url: contextUrl } = context;

          if (contextUrl) {
            res.header('Location', contextUrl);
            return res.sendStatus(302);
          }

          // 3. render the Redux initial data into the server markup
          return res.send(`<!doctype html>\n${ReactDOMServer.renderToString(<Html
            assets={chunks()}
            component={appHTML}
            store={store}
          />)}`);
        });
    });

  if (config.appPort) {
    server.listen(config.appPort, (err) => {
      if (err) {
        console.error(err);
      }

      if (!config.appApiProxyDisabled) {
        console.info(
          '---\n==> %s is running, talking to API server through proxy (%s => %s).',
          config.app.title,
          `${config.appApiProxyPath}`,
          `${config.appApiProxyTarget}`
        );
      } else {
        console.info(
          '---\n==> %s is running, talking to API server directly (%s).',
          config.app.title,
          `${config.appApiTarget}`
        );
      }

      console.info('==> Open http://%s:%s in a browser to view the app.', config.appHost, config.appPort);
    });
  } else {
    console.error('==> ERROR: No APP_PORT environment variable has been specified.');
  }
};
