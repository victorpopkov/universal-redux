/* eslint-disable import/no-extraneous-dependencies */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { clientConfiguration } = require('universal-webpack');
const webpack = require('webpack');
const baseProd = require('./prod.base.config');
const settings = require('./universal-webpack-settings.json');

const config = clientConfiguration(baseProd, settings);

config.plugins.push(
  new CleanWebpackPlugin(),
  new webpack.DefinePlugin({
    __CLIENT__: true,
    __DEVELOPMENT__: false,
    __DEVTOOLS__: false,
    __SERVER__: false,
  }),
);

module.exports = config;
