const CleanPlugin = require('clean-webpack-plugin');
import { clientConfiguration } from 'universal-webpack';
import webpack from 'webpack';
import baseConfiguration from './webpack.config.prod';
import paths from './paths';
import settings from './universal-webpack-settings';

const config = clientConfiguration(baseConfiguration, settings);

config.plugins.push(
  new CleanPlugin([paths.build], { root: paths.root }),
  new webpack.DefinePlugin({
    __CLIENT__: true,
    __DEVELOPMENT__: true,
    __DEVTOOLS__: true,
    __SERVER__: false,
  }),
);

module.exports = config;
