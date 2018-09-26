const ip = require('ip');
const packageJson = require('../package.json');

const ipAddress = ip.address();

// Environment variables
const appApiPort = Number.parseInt(process.env.APP_API_PORT, 10) || 3030;
const appApiProxyDisabled = !!Number.parseInt(process.env.APP_API_PROXY_DISABLED, 10) || false;
const appApiProxyPath = process.env.APP_API_PROXY_PATH || '/api';
const appApiProxyTarget = process.env.APP_API_PROXY_TARGET;
const appApiTarget = process.env.APP_API_TARGET;
const appDevServerPort = Number.parseInt(process.env.APP_DEV_SERVER_PORT, 10) || 3001;
const appHost = process.env.APP_HOST || ipAddress;
const appPort = Number.parseInt(process.env.APP_PORT, 10) || 3000;
const appPublicPath = process.env.APP_PUBLIC_PATH || '/';

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
  appApiPort,
  appApiProxyDisabled,
  appApiProxyPath,
  appApiProxyTarget,
  appApiTarget,
  appDevServerPort,
  appHost,
  appPort,
  appPublicPath,
};
