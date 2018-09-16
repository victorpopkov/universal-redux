#!/usr/bin/env node
require('@babel/polyfill');
require('@babel/register');

if (process.env.NODE_ENV !== 'production' && !require('piping')({ // eslint-disable-line global-require
  hook: true,
  ignore: /(\/\.|~$|\.json$)/i,
})) {
  return;
}

require('../api/api');
