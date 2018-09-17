#!/usr/bin/env node
require('@babel/polyfill');
require('@babel/register');

const dotenv = require('dotenv');
const startServer = require('universal-webpack/server');
const configuration = require('../webpack/webpack.config.server.dev.babel');
const settings = require('../webpack/universal-webpack-settings');

// dotenv
const result = dotenv.config();
if (result.error) {
  throw result.error;
}

startServer(configuration, settings);
