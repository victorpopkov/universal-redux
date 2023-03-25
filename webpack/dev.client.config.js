/* eslint-disable import/no-extraneous-dependencies */
const { clientConfiguration } = require('universal-webpack');
const webpack = require('webpack');
const baseDev = require('./dev.base.config');
const settings = require('./universal-webpack-settings.json');

const config = clientConfiguration(baseDev, settings);

config.plugins.push(
  new webpack.DefinePlugin({
    __CLIENT__: true,
    __DEVELOPMENT__: true,
    __DEVTOOLS__: true,
    __SERVER__: false,
  }),
);

module.exports = config;
