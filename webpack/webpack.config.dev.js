const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const common = require('./webpack.config.common');
const config = require('../config');
const paths = require('./paths');

module.exports = merge(common, {
  context: paths.root,
  devtool: 'inline-source-map',
  entry: {
    vendor: [
      `webpack-hot-middleware/client?path=__webpack_hmr&dynamicPublicPath=true`,
      'bootstrap-loader',
      path.join(paths.src, 'assets/scss/vendor.scss'),
    ],
    main: [
      `webpack-hot-middleware/client?path=__webpack_hmr&dynamicPublicPath=true`,
      path.join(paths.src, 'client.js'),
    ],
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'eslint-loader',
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              localIdentName: '[local]___[hash:base64:5]',
              modules: true,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'less-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              localIdentName: '[local]___[hash:base64:5]',
              modules: true,
              sourceMap: true,
            },
          },
          {
            loader: 'resolve-url-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              outputStyle: 'expanded',
              sourceMap: true,
              includePaths: [],
            },
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: path.join(paths.src, 'assets/scss/sass-resources.scss'),
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: paths.build,
    publicPath: config.appPublicPath,
  },
  plugins: [
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: true, // <-------- DISABLE redux-devtools HERE
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
  ],
});
