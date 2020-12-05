# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased][]

### Added

- **[maintenance]** Integration with "Code Climate" for code quality and test coverage reports
- **[maintenance]** Integration with "Codecov" for test coverage reports
- **[maintenance]** Integration with Prettier
- **[maintenance]** Scripts `audit:fix`, `deduplicate` and `lint:prettier` in `package.json`
- **[maintenance]** This `CHANGELOG.md`

### Changed

- **[maintenance]** Configurations for ESLint to work with Prettier and become simpler
- **[maintenance]** Configurations for stylelint to work with Prettier and become simpler
- **[maintenance]** Import of `webpack-merge` in webpack configurations
- **[maintenance]** Replace `uglifyjs-webpack-plugin` with `terser-webpack-plugin`
- **[maintenance]** Usage of `copy-webpack-plugin` in webpack common configurations
- **[maintenance]** Usage of `webpack-dev-middleware` in webpack configurations
- Dependencies to match the latest ones
- Extension `JS` to `JSX` where appropriate
- Website homepage badges

### Removed

- **[maintenance]** Integration with remark in favour of Prettier
- **[maintenance]** Obsolete dependency `eslint-loader` in favour of `eslint-webpack-plugin`
- **[maintenance]** Usage of `mini-css-extract-plugin` in webpack dev configurations
- Dependency `better-npm-run` in favour of `env-cmd`
- Environment file `.env.dist` in favour of `.env.dev` and `.env.prod`

### Fixed

- **[maintenance]** Author email in `package.json`
- Differentiation between some `dependencies` and `devDependencies` in `package.json`
- Plugin `@babel/plugin-proposal-decorators` order in Babel configurations
- Plugin `dotenv-webpack` webpack common configurations

## 0.1.0 - 2018-10-12

First release.

[unreleased]: https://github.com/victorpopkov/react-ui-icheck/compare/v0.1.0...HEAD
