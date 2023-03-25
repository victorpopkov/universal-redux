const { serverConfiguration } = require('universal-webpack');
const webpack = require('webpack');
const baseProd = require('./webpack.config.prod');
const settings = require('./universal-webpack-settings.json');

const config = serverConfiguration(baseProd, settings);

config.plugins.push(
  new webpack.DefinePlugin({
    __CLIENT__: false,
    __DEVELOPMENT__: false,
    __DEVTOOLS__: false,
    __DISABLE_SSR__: false,
    __SERVER__: true,
  }),
);

module.exports = config;
