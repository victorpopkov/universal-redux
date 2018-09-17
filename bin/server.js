#!/usr/bin/env node
require('@babel/polyfill');
require('@babel/register');

const dotenv = require('dotenv');
const path = require('path');

// dotenv
const result = dotenv.config();
if (result.error) {
  throw result.error;
}

/**
 * Define isomorphic constants.
 */
/* eslint-disable no-underscore-dangle, global-require */
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = false;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/webpack-isomorphic-tools'))
  .server(path.resolve(__dirname, '..'), () => {
    require('../src/server');
  });
