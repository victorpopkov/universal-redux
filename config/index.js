const merge = require('lodash/merge');
const config = require('./common');
const dev = require('./dev');
const prod = require('./prod');

switch (process.env.NODE_ENV) {
  case 'production':
    merge(config, prod);
    break;
  default:
    merge(config, dev);
    break;
}

module.exports = config;
