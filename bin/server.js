#!/usr/bin/env node
require('@babel/polyfill');
require('@babel/register');

const startServer = require('universal-webpack/server');
const settings = require('../webpack/universal-webpack-settings.json');

let configuration;
if (process.env.NODE_ENV === 'production') {
  // eslint-disable-next-line
  configuration = require('../webpack/prod.server.config');
} else {
  // eslint-disable-next-line
  configuration = require('../webpack/dev.server.config');
}

startServer(configuration, settings);
