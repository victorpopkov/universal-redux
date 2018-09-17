const ip = require('ip');
const packageJson = require('../package.json');

const ipAddress = ip.address();

// Environment variables
const apiHost = process.env.API_HOST;
const apiPort = Number.parseInt(process.env.API_PORT, 10) || 3030;
const apiSchema = process.env.API_SCHEMA;
const appDevServerPort = Number.parseInt(process.env.APP_DEV_SERVER_PORT, 10) || 3001;
const appHost = process.env.APP_HOST || ipAddress;
const appPort = Number.parseInt(process.env.APP_PORT, 10) || 3000;
const appPublicPath = process.env.APP_PUBLIC_PATH || '/';
const proxyApiTarget = process.env.PROXY_API_TARGET;

// Other
const appName = packageJson.name;
const appDescription = packageJson.description;

module.exports = {
  app: {
    title: appName,
    description: appDescription,
    head: {
      titleTemplate: `${appName} | %s`,
      meta: [
        { name: 'description', content: appDescription },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { charset: 'utf-8' },
        { property: 'og:site_name', content: appName },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: appName },
        { property: 'og:description', content: appDescription },
      ],
      link: [
        { rel: 'shortcut icon', href: '/favicon.ico' },
      ],
    },
  },
  apiHost,
  apiPort,
  apiSchema,
  appDevServerPort,
  appHost,
  appPort,
  appPublicPath,
  proxyApiTarget,
};
