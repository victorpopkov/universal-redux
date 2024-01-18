# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Bump [Node.js] requirement from `v14` to `v18`.
- Bump dependencies
- Change `css-loader` mode from `local` to `global`
- Migrate [Bootstrap] from `v4` to `v5`
- Rename output CSS and JS files
- Replace [optimize-css-assets-webpack-plugin] with [css-minimizer-webpack-plugin]
- Replace SCSS division slashes with `sass:math`

### Removed

- Remove [babel-plugin-react-css-modules] in favour of using `className` instead
- Remove [bootstrap-loader] in favour of custom [Bootstrap] SCSS imports
- Remove [generic-names] as we no longer use [babel-plugin-react-css-modules]

## [0.2.0] - 2021-04-07

### Added

- Add navbar [GitHub] buttons
- Add website version and revision in jumbotron

### Changed

- Bump [Node.js] requirement from `v10` to `v14`.
- Bump `UNIVERSAL_WEBPACK_CSS_LOADER_V3` to `UNIVERSAL_WEBPACK_CSS_LOADER_V4`
- Bump dependencies
- Change [babel-plugin-inline-react-svg] configurations
- Change [ESLint] and [stylelint] configurations to work with [Prettier]
- Change [webpack-dev-middleware] configurations
- Change footer [GitHub] buttons
- Change homepage badges
- Hide sidebar on tablets
- Improve differentiation between `dependencies` and `devDependencies`
- Migrate [copy-webpack-plugin] from `v4` to `v8`
- Migrate [webpack-merge] from `v4` to `v5`
- Rename `app.title` to `app.name`
- Rename `JS` extension to `JSX` where appropriate
- Replace [react-progress-2] with [react-redux-loading-bar]
- Replace [remark] with [Prettier]
- Replace deprecated [better-npm-run] with [env-cmd]
- Replace deprecated [eslint-loader] with [eslint-webpack-plugin]
- Replace deprecated [uglifyjs-webpack-plugin] with [terser-webpack-plugin]
- Replace deprecated `window.devToolsExtension` with `window.__REDUX_DEVTOOLS_EXTENSION__`

### Removed

- Remove `.babelrc` in favour of `babel.config.js`
- Remove `.env.dist` in favour of `.env.dev` and `.env.prod`
- Remove `process.env.NODE_ENV` from `webpack.DefinePlugin()`

### Fixed

- Fix `@babel/plugin-proposal-decorators` order in `.babelrc`
- Fix `configuration` require in `bin/server.js`

## 0.1.0 - 2018-10-12

First release.

[0.2.0]: https://github.com/victorpopkov/universal-redux/compare/v0.1.0...v0.2.0
[babel-plugin-inline-react-svg]: https://github.com/airbnb/babel-plugin-inline-react-svg
[babel-plugin-react-css-modules]: https://github.com/gajus/babel-plugin-react-css-modules
[better-npm-run]: https://github.com/benoror/better-npm-run
[bootstrap-loader]: https://github.com/shakacode/bootstrap-loader
[bootstrap]: https://getbootstrap.com/
[copy-webpack-plugin]: https://github.com/webpack-contrib/copy-webpack-plugin
[css-minimizer-webpack-plugin]: https://github.com/webpack-contrib/css-minimizer-webpack-plugin
[env-cmd]: https://github.com/toddbluhm/env-cmd
[eslint-loader]: https://github.com/webpack-contrib/eslint-loader
[eslint-webpack-plugin]: https://github.com/webpack-contrib/eslint-webpack-plugin
[eslint]: https://eslint.org/
[generic-names]: https://github.com/css-modules/generic-names
[github actions]: https://github.com/features/actions
[github]: https://github.com/
[node.js]: https://nodejs.org/en
[optimize-css-assets-webpack-plugin]: https://github.com/NMFR/optimize-css-assets-webpack-plugin
[prettier]: https://prettier.io/
[react-progress-2]: https://github.com/milworm/react-progress-2
[react-redux-loading-bar]: https://github.com/mironov/react-redux-loading-bar
[remark]: https://remark.js.org/
[stylelint]: https://stylelint.io/
[terser-webpack-plugin]: https://github.com/webpack-contrib/terser-webpack-plugin
[travis ci]: https://travis-ci.org/
[uglifyjs-webpack-plugin]: https://github.com/webpack-contrib/uglifyjs-webpack-plugin
[unreleased]: https://github.com/victorpopkov/universal-redux/compare/v0.2.0...HEAD
[webpack-dev-middleware]: https://github.com/webpack/webpack-dev-middleware
[webpack-merge]: https://github.com/survivejs/webpack-merge
[webpack]: https://webpack.js.org/
