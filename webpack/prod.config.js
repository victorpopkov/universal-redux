/* eslint-disable global-require, import/no-extraneous-dependencies */
require('babel-polyfill');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

// paths
const pathRoot = path.resolve(__dirname, '..');
const pathSrc = path.resolve(__dirname, '../src');
const pathBuild = path.resolve(__dirname, '../build');

// https://github.com/halt-hammerzeit/webpack-isomorphic-tools
// when running concurrently, I had some 'You must specify "assets" parameter' issues without
// removing the require cache first.
delete require.cache[require.resolve('./webpack-isomorphic-tools')];
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

module.exports = {
  context: pathRoot,
  entry: {
    vendor: [
      'bootstrap-loader',
      path.join(pathSrc, 'assets/scss/vendor.scss'),
    ],
    main: [
      path.join(pathSrc, 'client.js'),
    ],
  },
  mode: 'production',
  output: {
    filename: '[name]-[hash].js',
    path: pathBuild,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 2,
                localIdentName: '[local]___[hash:base64:5]',
              },
            },
            {
              loader: 'postcss-loader',
            },
            {
              loader: 'less-loader',
              options: {
                outputStyle: 'expanded',
              },
            },
          ],
        }),
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                localIdentName: '[local]___[hash:base64:5]',
                modules: true,
              },
            },
            {
              loader: 'resolve-url-loader',
              options: {
                attempts: 1,
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
              },
            },
            {
              loader: 'sass-resources-loader',
              options: {
                resources: path.join(pathSrc, 'assets/scss/sass-resources.scss'),
              },
            },
          ],
        }),
      },
      {
        test: /\.woff$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff',
              name: '[name].[ext]',
              outputPath: './assets/fonts/',
            },
          },
        ],
      },
      {
        test: /\.woff2$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'font/woff2',
              name: '[name].[ext]',
              outputPath: './assets/fonts/',
            },
          },
        ],
      },
      {
        test: /\.ttf$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-sfnt',
              name: '[name].[ext]',
              outputPath: './assets/fonts/',
            },
          },
        ],
      },
      {
        test: /\.eot$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/vnd.ms-fontobject',
              name: '[name].[ext]',
              outputPath: './assets/fonts/',
            },
          },
        ],
      },
      {
        test: /\.otf$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-sfnt',
              name: '[name].[ext]',
              outputPath: './assets/fonts/',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'image/svg+xml',
              name: '[name].[ext]',
              outputPath: './assets/images/',
            },
          },
          {
            loader: 'svgo-loader',
          },
        ],
      },
      {
        test: webpackIsomorphicToolsPlugin.regularExpression('images'),
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name].[ext]',
              outputPath: './assets/images/',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: [
      'src',
      'node_modules',
    ],
    alias: {
      theme: path.resolve(pathSrc, './theme'), // use with "~theme" in SCSS
      '@Config': path.resolve(pathSrc, './config.js'),
      '@Components': path.resolve(pathSrc, './components'),
      '@Containers': path.resolve(pathSrc, './containers'),
      '@Helpers': path.resolve(pathSrc, './helpers'),
      '@ReduxActions': path.resolve(pathSrc, './redux/actions'),
      '@ReduxConstants': path.resolve(pathSrc, './redux/constants'),
      '@ReduxEvents': path.resolve(pathSrc, './redux/events'),
      '@ReduxMiddlewares': path.resolve(pathSrc, './redux/middlewares'),
      '@ReduxReducers': path.resolve(pathSrc, './redux/reducers'),
      '@ReduxStores': path.resolve(pathSrc, './redux/stores'),
      '@ReduxUtils': path.resolve(pathSrc, './redux/utils'),
    },
    extensions: ['.json', '.js', '.jsx'],
  },
  plugins: [
    new CleanPlugin([pathBuild], { root: pathRoot }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(pathSrc, 'assets/favicon/'),
        to: path.resolve(pathBuild, 'assets/favicon/'),
      },
    ]),
    new ExtractTextPlugin({
      filename: 'assets/css/[name]-[chunkhash].css',
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,
    }),
    new webpack.IgnorePlugin(/\/config$/, /\.\/dev/),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          drop_console: true,
          warnings: false,
        },
      },
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: false,
    }),
    webpackIsomorphicToolsPlugin,
  ],
};
