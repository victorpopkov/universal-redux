# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Bump dependencies
- Change `css-loader` mode from `local` to `global`
- Migrate Bootstrap from `4.6.0` to `5.1.0`
- Rename output CSS and JS
- Replace SCSS division slashes with `sass:math`
- Replace `bootstrap-loader` with a custom Bootstrap import
- Replace `optimize-css-assets-webpack-plugin` with `css-minimizer-webpack-plugin`
- Replace `styleName` with `className`

### Removed

- Remove `babel-plugin-react-css-modules`
- Remove `generic-names`

## [0.2.0] - 2021-04-07

### Added

- **[maintenance]** Add [GitHub Actions] workflow
- **[maintenance]** Add [Prettier] integration
- **[maintenance]** Add `CHANGELOG.md`
- **[maintenance]** Add `audit:fix`, `deduplicate` and `lint:prettier` scripts
- Add jumbotron website version and revision
- Add navbar [GitHub] buttons

### Changed

- Bump dependencies
- Change [ESLint] and [stylelint] configurations to work with [Prettier]
- Change `babel-plugin-inline-react-svg` configurations
- Change `copy-webpack-plugin` configurations
- Change `dotenv-webpack` configurations
- Change `webpack-dev-middleware` configurations
- Change footer [GitHub] buttons
- Change homepage badges
- Hide sidebar on tablets
- Move most `devDependencies` to `dependencies`
- Rename `app.title` to `app.name`
- Reorder `api.js` `config` import
- Reorder `webpack-merge` import
- Replace [remark] with [Prettier]
- Replace `.babelrc` with `babel.config.js`
- Replace `.env.dist` with `.env.dev` and `.env.prod`
- Replace `JS` extension with `JSX` where appropriate
- Replace `UNIVERSAL_WEBPACK_CSS_LOADER_V3` to `UNIVERSAL_WEBPACK_CSS_LOADER_V4`
- Replace `react-progress-2` with `react-redux-loading-bar`
- Replace deprecated `better-npm-run` with `env-cmd`
- Replace deprecated `eslint-loader` with `eslint-webpack-plugin`
- Replace deprecated `uglifyjs-webpack-plugin` with `terser-webpack-plugin`
- Replace deprecated `window.devToolsExtension` with `window.__REDUX_DEVTOOLS_EXTENSION__`

### Removed

- Remove `process.env.NODE_ENV` from `webpack.DefinePlugin()`
- Remove obsolete `Progress` component
- Remove unused `mini-css-extract-plugin` from webpack dev configurations

### Fixed

- **[maintenance]** Fix `package.json` author email
- Fix `.babelrc` `@babel/plugin-proposal-decorators` order
- Fix `bin/server.js` `configuration` require
- Fix some `dependencies` and `devDependencies` differentiation

## 0.1.0 - 2018-10-12

First release.

[unreleased]: https://github.com/victorpopkov/universal-redux/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/victorpopkov/universal-redux/compare/v0.1.0...v0.2.0
[eslint]: https://eslint.org/
[github actions]: https://github.com/features/actions
[github]: https://github.com/
[prettier]: https://prettier.io/
[remark]: https://remark.js.org/
[stylelint]: https://stylelint.io/
[travis ci]: https://travis-ci.org/
[webpack]: https://webpack.js.org/
