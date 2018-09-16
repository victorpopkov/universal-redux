#!/usr/bin/env node
require('@babel/polyfill');
require('@babel/register');

const path = require('path');

// paths
const pathRoot = path.resolve(__dirname, '..');

/**
 * Define isomorphic constants.
 */
/* eslint-disable no-underscore-dangle, global-require */
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = false;
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';

if (__DEVELOPMENT__ && !require('piping')({
  hook: true,
  ignore: /(\/\.|~$|\.json|\.scss$)/i,
})) {
  return;
}

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
const WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/webpack-isomorphic-tools'))
  .server(pathRoot, () => {
    require('../src/server');
  });
