# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased][]

## [0.2.0][] - 2021-04-07

### Added

- **[maintenance]** Integration with "GitHub Actions" for CI building and linting
- **[maintenance]** Integration with "GitHub Actions" for production deploying
- **[maintenance]** Integration with Prettier
- **[maintenance]** Scripts `audit:fix`, `deduplicate` and `lint:prettier` in `package.json`
- **[maintenance]** This `CHANGELOG.md`
- Common `GitHub` component
- GitHub buttons in the common `Header` component

### Changed

- App configuration `app.title` to `app.name`
- Configurations for `babel-plugin-inline-react-svg`
- Configurations for `copy-webpack-plugin`
- Configurations for `dotenv-webpack`
- Configurations for `eslint` to work with Prettier
- Configurations for `stylelint` to work with Prettier
- Configurations for `webpack-dev-middleware`
- Dependencies to match the latest ones
- Environment variable `UNIVERSAL_WEBPACK_CSS_LOADER_V3` to `UNIVERSAL_WEBPACK_CSS_LOADER_V4`
- Extension `JS` to `JSX` where appropriate
- GitHub buttons in the common `Footer` component
- Import of `config` in `api.js`
- Import of `webpack-merge` in webpack configurations
- Jumbotron to include the version and revision
- Most `devDependencies` to be inside `dependencies` in `package.json`
- Sidebar to become hidden on tablets
- Website homepage badges

### Removed

- Configurations `.babelrc` in favour of `babel.config.js`
- Dependency `react-progress-2` in favour of `react-redux-loading-bar`
- Deprecated `better-npm-run` in favour of `env-cmd`
- Deprecated `eslint-loader` in favour of `eslint-webpack-plugin`
- Deprecated `uglifyjs-webpack-plugin` with `terser-webpack-plugin`
- Deprecated `window.devToolsExtension` in favour of `window.__REDUX_DEVTOOLS_EXTENSION__`
- Environment file `.env.dist` in favour of `.env.dev` and `.env.prod`
- Integration with remark in favour of Prettier
- Obsolete common `Progress` component
- Usage of `mini-css-extract-plugin` in webpack dev configurations
- Usage of `process.env.NODE_ENV` in `webpack.DefinePlugin()`

### Fixed

- **[maintenance]** Author email in `package.json`
- Differentiation between some `dependencies` and `devDependencies` in `package.json`
- Order of `@babel/plugin-proposal-decorators` in Babel configurations
- Require of `configuration` in `bin/server.js`

## 0.1.0 - 2018-10-12

First release.

[unreleased]: https://github.com/victorpopkov/universal-redux/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/victorpopkov/universal-redux/compare/v0.1.0...v0.2.0
