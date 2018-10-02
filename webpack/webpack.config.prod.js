const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const common = require('./webpack.config.common');
const paths = require('./paths');

module.exports = merge(common, {
  devtool: 'hidden-source-map',
  entry: {
    vendor: [
      'bootstrap-loader',
      path.join(paths.src, 'assets/scss/vendor.scss'),
    ],
  },
  mode: 'production',
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
        test: /\.css/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
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
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
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
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: {
            drop_console: true,
            warnings: false,
          },
        },
        sourceMap: true,
      }),
      new OptimizeCssAssetsPlugin({
        canPrint: false,
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          discardComments: {
            removeAll: true,
          },
        },
      }),
    ],
  },
  output: {
    filename: '[name]-[hash].js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name]-[chunkhash].css',
      chunkFilename: 'assets/css/[id].css',
    }),
    new webpack.IgnorePlugin(/\/config$/, /\.\/dev/),
  ],
});
