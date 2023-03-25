const packageJson = require('../package.json');

const removeTrailingSlash = (s) => s.replace(/\/$/, '');

// Environment variables
const appApiPort = Number.parseInt(process.env.APP_API_PORT, 10) || 3030;
const appApiProxyDisabled =
  !!Number.parseInt(process.env.APP_API_PROXY_DISABLED, 10) || false;
const appApiProxyPath = process.env.APP_API_PROXY_PATH
  ? removeTrailingSlash(process.env.APP_API_PROXY_PATH)
  : '/api';
const appApiProxyTarget = process.env.APP_API_PROXY_TARGET
  ? removeTrailingSlash(process.env.APP_API_PROXY_TARGET)
  : 'http://localhost:3030';
const appApiTarget = process.env.APP_API_TARGET
  ? removeTrailingSlash(process.env.APP_API_TARGET)
  : 'http://localhost:3030';
const appBasePath = process.env.APP_BASE_PATH
  ? removeTrailingSlash(process.env.APP_BASE_PATH)
  : '';
const appDevServerPort =
  Number.parseInt(process.env.APP_DEV_SERVER_PORT, 10) || 3001;
const appHost = process.env.APP_HOST || '0.0.0.0';
const appMorganFormat = process.env.APP_MORGAN_FORMAT
  ? process.env.APP_MORGAN_FORMAT
  : 'combined';
const appPort = Number.parseInt(process.env.APP_PORT, 10) || 3000;
const appPublicPath = process.env.APP_PUBLIC_PATH
  ? `${removeTrailingSlash(process.env.APP_PUBLIC_PATH)}/`
  : '/';

// Other
const appName = packageJson.name;
const appDescription = packageJson.description;
const githubRef = packageJson.repository.url.replace(/^github:/, '');

module.exports = {
  app: {
    name: appName,
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
      link: [{ rel: 'shortcut icon', href: `${appBasePath}/favicon.ico` }],
    },
    revision: process.env.APP_REVISION,
    version: process.env.APP_VERSION || packageJson.version,
  },
  package: {
    dependencies: packageJson.dependencies,
    description: packageJson.description,
    homepage: packageJson.homepage,
    name: packageJson.name,
    repository: `https://github.com/${githubRef}`,
    version: packageJson.version,
    githubRef,
  },
  appApiPort,
  appApiProxyDisabled,
  appApiProxyPath,
  appApiProxyTarget,
  appApiTarget,
  appBasePath,
  appDevServerPort,
  appHost,
  appMorganFormat,
  appPort,
  appPublicPath,
};
