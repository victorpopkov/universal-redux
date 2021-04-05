const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const common = require('./webpack.config.common');
const paths = require('./paths');

const cssLoaders = (mode) => [
  MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      importLoaders: 2,
      modules: {
        localIdentName: '[local]___[hash:base64:5]',
        mode,
      },
      sourceMap: true,
    },
  },
  { loader: 'resolve-url-loader', options: { sourceMap: true } },
  { loader: 'postcss-loader', options: { sourceMap: true } },
];

const scssLoaders = (mode) => [
  ...cssLoaders(mode),
  {
    loader: 'sass-loader',
    options: { sassOptions: { outputStyle: 'expanded' }, sourceMap: true },
  },
  {
    loader: 'sass-resources-loader',
    options: { resources: path.join(paths.assets, 'scss/sass-resources.scss') },
  },
];

module.exports = merge(common, {
  devtool: 'hidden-source-map',
  entry: {
    client: [path.join(paths.src, 'client.jsx')],
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
        test: /\.css?$/,
        include: [/node_modules/],
        use: cssLoaders('global'),
      },
      {
        test: /\.css?$/,
        exclude: [/node_modules/],
        use: cssLoaders('local'),
      },
      {
        test: /\.scss?$/,
        include: [/node_modules/],
        use: scssLoaders('global'),
      },
      {
        test: /\.scss?$/,
        exclude: [/node_modules/],
        use: scssLoaders('local'),
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin(),
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
    new webpack.IgnorePlugin(/\/config$/, /\.\/dev/),
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name]-[chunkhash].css',
      chunkFilename: 'assets/css/[id].css',
    }),
  ],
});
