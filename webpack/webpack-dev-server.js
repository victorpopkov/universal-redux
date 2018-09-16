/* eslint-disable import/no-extraneous-dependencies */
const Express = require('express');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.dev');
const config = require('../src/config');

const app = new Express();
const compiler = webpack(webpackConfig);
const host = config.host || 'localhost';
const port = (Number(config.port) + 1) || 3001;

const serverOptions = {
  contentBase: `http://${host}:${port}`,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true },
};

app
  .use(require('webpack-dev-middleware')(compiler, serverOptions))
  .use(require('webpack-hot-middleware')(compiler))
  .listen(port, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.info('==> Webpack development server listening on port %s', port);
    }
  });
