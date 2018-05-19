require('babel-polyfill');

const ip = require('ip');
const packageJson = require('../package.json');

const ipAddress = ip.address();
const appName = packageJson.name;
const appDescription = packageJson.description;

const environment = {
  development: {
    isProduction: false,
  },
  production: {
    isProduction: true,
  },
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || ipAddress,
  port: process.env.PORT,
  apiSchema: process.env.API_SCHEMA || 'http',
  apiHost: process.env.API_HOST || ipAddress,
  apiPort: process.env.API_PORT || 3000,
  apiPrefix: process.env.API_PREFIX || '',
  proxySchema: process.env.PROXY_SCHEMA || 'http',
  proxyHost: process.env.PROXY_HOST || ipAddress,
  proxyPort: process.env.PROXY_PORT || process.env.PORT,
  app: {
    title: appName,
    description: appDescription,
    head: {
      titleTemplate: `${appName} | %s`,
      meta: [
        {
          name: 'description',
          content: appDescription,
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: appName },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: appName },
        {
          property: 'og:description',
          content: appDescription,
        },
      ],
    },
  },
}, environment);
