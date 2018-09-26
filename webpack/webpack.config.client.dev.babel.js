import { clientConfiguration } from 'universal-webpack';
import webpack from 'webpack';
import baseConfiguration from './webpack.config.dev';
import settings from './universal-webpack-settings';

const config = clientConfiguration(baseConfiguration, settings);

config.plugins.push(new webpack.DefinePlugin({
  'process.env.NODE_ENV': 'development',
  __CLIENT__: true,
  __DEVELOPMENT__: true,
  __DEVTOOLS__: true,
  __SERVER__: false,
}));

module.exports = config;
