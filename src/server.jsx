import http from 'http';
import { parse as parseUrl } from 'url';
import { ReduxAsyncConnect, loadOnServer } from 'redux-connect';
import { ConnectedRouter } from 'connected-react-router/immutable';
import Express from 'express';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookiesMiddleware from 'universal-cookie-express';
import config from '@Config';
import ApiClient from './helpers/ApiClient';
import Html from './helpers/Html';
import configureStore from './store';
import routes from './routes';
import setupApiProxy from './server/api-proxy';
import setupStatic from './server/static';
import setupFavicon from './server/favicon';
import setupLogging from './server/logging';

export default ({ chunks }) => {
  const app = new Express();
  const server = new http.Server(app);

  // order is important
  setupApiProxy(app);
  setupLogging(app);
  setupStatic(app);
  setupFavicon(app);

  app
    .use(
      bodyParser.urlencoded({
        extended: false,
        type: 'application/x-www-form-urlencoded',
      }),
    )
    .use(compression())
    .use(cookiesMiddleware())
    .get('*', (req, res) => {
      const url = req.originalUrl || req.url;
      const apiClient = new ApiClient(req);
      const location = parseUrl(url);

      const { history, store } = configureStore(apiClient, {}, req, location);

      const helpers = {
        apiClient,
        history,
      };

      const hydrateOnClient = () => {
        res.send(
          `<!doctype html>\n${ReactDOMServer.renderToString(
            <Html assets={chunks()} store={store} />,
          )}`,
        );
      };

      if (__SERVER__ && __DISABLE_SSR__) {
        hydrateOnClient();
      }

      loadOnServer({
        store,
        location,
        routes,
        helpers,
      }).then(() => {
        const context = {};

        const appHTML = ReactDOMServer.renderToString(
          <Provider key="provider" store={store}>
            <ConnectedRouter history={history}>
              <StaticRouter
                basename={config.appBasePath}
                context={context}
                location={location}
              >
                <ReduxAsyncConnect helpers={helpers} routes={routes} />
              </StaticRouter>
            </ConnectedRouter>
          </Provider>,
        );

        // context.url will contain the URL to redirect to if a <Redirect> was used
        const { url: contextUrl } = context;

        if (contextUrl) {
          res.header('Location', contextUrl);
          return res.sendStatus(302);
        }

        return res.send(
          `<!doctype html>\n${ReactDOMServer.renderToString(
            <Html assets={chunks()} component={appHTML} store={store} />,
          )}`,
        );
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
          config.app.name,
          `${config.appApiProxyPath}`,
          `${config.appApiProxyTarget}`,
        );
      } else {
        console.info(
          '---\n==> %s is running, talking to API server directly (%s).',
          config.app.name,
          `${config.appApiTarget}`,
        );
      }

      console.info(
        '==> Open http://%s:%s in a browser to view the app.\n---',
        config.appHost,
        config.appPort,
      );
    });
  } else {
    console.error(
      '==> ERROR: No APP_PORT environment variable has been specified.',
    );
  }
};
