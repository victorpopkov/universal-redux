const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const config = require('../config');
const path = require('path');
const paths = require('./paths');

const useFonts = [
  {
    loader: 'url-loader',
    options: {
      limit: 512,
      name: 'assets/fonts/[name].[ext]',
      publicPath: config.appPublicPath,
    },
  },
];

const useImages = [
  {
    loader: 'url-loader',
    options: {
      limit: 512,
      name: 'assets/images/[name].[ext]',
      publicPath: config.appPublicPath,
    },
  },
];

module.exports = {
  context: paths.root,
  module: {
    rules: [
      {
        test: /\.(woff|woff2|ttf|eot|otf)$/,
        use: useFonts,
      },
      {
        test: /fonts\/.*\.svg/,
        use: useFonts,
      },
      {
        test: /\.svg$/,
        use: [
          ...useImages,
          {
            loader: 'svgo-loader',
            options: {
              plugins: [
                { cleanupIDs: false },
                { removeAttrs: { attrs: '(data-name)' } },
              ],
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: useImages,
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: paths.build,
    publicPath: config.appPublicPath,
  },
  resolve: {
    modules: ['node_modules', 'src'],
    alias: {
      '@Config': path.resolve(paths.root, 'config/'),
      '@Root': path.resolve(paths.root),
    },
    extensions: ['.json', '.js', '.jsx'],
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.resolve(paths.src, 'assets/favicon/'),
        to: path.resolve(paths.build, 'assets/favicon/'),
      },
    ]),
    new Dotenv({
      path: path.resolve(paths.root, '.env'),
      safe: false,
      silent: true,
      systemvars: true,
    }),
  ],
};
