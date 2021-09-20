#!/usr/bin/env node
require('@babel/polyfill');
require('@babel/register');

const startServer = require('universal-webpack/server');
const settings = require('../webpack/universal-webpack-settings.json');

let configuration;
if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line
  configuration = require('../webpack/webpack.config.server.prod.babel');
} else {
  // eslint-disable-next-line
  configuration = require('../webpack/webpack.config.server.dev.babel');
}

startServer(configuration, settings);
