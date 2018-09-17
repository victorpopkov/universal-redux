#!/usr/bin/env node
require('@babel/polyfill');
require('@babel/register');

const dotenv = require('dotenv');

// dotenv
const result = dotenv.config();
if (result.error) {
  throw result.error;
}

if (process.env.NODE_ENV !== 'production' && !require('piping')({ // eslint-disable-line global-require
  hook: true,
  ignore: /(\/\.|~$|\.json$)/i,
})) {
  return;
}

require('../api/api');
