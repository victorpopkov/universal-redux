require('@babel/register');

const Express = require('express');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.client.dev.babel');
const config = require('../config');

const app = new Express();
const compiler = webpack(webpackConfig);
const port = config.appDevServerPort;

app
  .use(
    require('webpack-dev-middleware')(compiler, {
      headers: { 'Access-Control-Allow-Origin': '*' },
    }),
  )
  .use(require('webpack-hot-middleware')(compiler))
  .listen(port, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.info('==> webpack-dev-server listening on port %s', port);
    }
  });
