require('@babel/register');

const Express = require('express');
const middleware = require('webpack-dev-middleware'); // eslint-disable-line import/no-extraneous-dependencies
const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies
const devClient = require('./dev.client.config');
const config = require('../config');

const app = new Express();
const compiler = webpack(devClient);
const port = config.appDevServerPort;

app
  .use(
    middleware(compiler, {
      headers: { 'Access-Control-Allow-Origin': '*' },
    }),
  )
  .use(middleware(compiler))
  .listen(port, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.info('==> webpack-dev-server listening on port %s', port);
    }
  });
