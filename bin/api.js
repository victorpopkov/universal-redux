#!/usr/bin/env node
require('@babel/polyfill');
require('@babel/register');

const dotenv = require('dotenv');

// dotenv
const result = dotenv.config();
if (result.error) {
  console.info('==> Failed to load .env');
}

require('../api/api');
