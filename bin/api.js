#!/usr/bin/env node
if (process.env.NODE_ENV !== 'production' && !require('piping')({ // eslint-disable-line global-require
  hook: true,
  ignore: /(\/\.|~$|\.json$)/i,
})) {
  return;
}

require('../server.babel'); // babel registration (runtime transpilation for node)
require('../api/api');
