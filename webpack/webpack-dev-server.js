require('@babel/register');

/* eslint-disable import/no-extraneous-dependencies */
const Express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const devClient = require('./dev.client.config');
const config = require('../config');
/* eslint-enable import/no-extraneous-dependencies */

const app = new Express();
const compiler = webpack(devClient);
const port = config.appDevServerPort;

const setCorsHeaders = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  );
  res.header(
    'Access-Control-Allow-Headers',
    'X-Requested-With, Content-Type, Authorization',
  );
  next();
};

app.use(setCorsHeaders);
app.use(webpackDevMiddleware(compiler));
app.use(webpackHotMiddleware(compiler, { path: '/__webpack_hmr' }));

app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.info('==> webpack-dev-server listening on port %s', port);
  }
});
