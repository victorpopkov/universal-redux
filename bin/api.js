#!/usr/bin/env node
require('@babel/polyfill');
require('@babel/register');

const dotenv = require('dotenv');

// dotenv
const result = dotenv.config();
if (result.error) {
  throw result.error;
}

require('../api/api');
