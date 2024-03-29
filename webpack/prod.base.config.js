const path = require('path');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { merge } = require('webpack-merge');
const base = require('../webpack.base.config');
const paths = require('./paths');

const performanceSize = 256 * 4 * 1000;

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

module.exports = merge(base, {
  devtool: 'hidden-source-map',
  entry: {
    vendor: [path.join(paths.src, 'assets/scss/vendor.scss')],
    client: [
      path.join(paths.src, 'client.jsx'),
      path.join(paths.scss, 'app.scss'),
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
        include: [/node_modules|src\/assets/],
        use: cssLoaders('global'),
      },
      {
        test: /\.css?$/,
        exclude: [/node_modules|src\/assets/],
        use: cssLoaders('local'),
      },
      {
        test: /\.scss?$/,
        include: [/node_modules|src\/assets/],
        use: scssLoaders('global'),
      },
      {
        test: /\.scss?$/,
        exclude: [/node_modules|src\/assets/],
        use: scssLoaders('local'),
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
      }),
    ],
  },
  output: {
    filename: '[name].[chunkhash].js',
  },
  performance: {
    maxAssetSize: performanceSize,
    maxEntrypointSize: performanceSize,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'assets/css/[name].[chunkhash].css',
      chunkFilename: 'assets/css/[id].css',
    }),
  ],
});
