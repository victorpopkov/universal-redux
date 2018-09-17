const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const paths = require('./paths');

// Fix 'You must specify "assets" parameter' issue when running concurrently
delete require.cache[require.resolve('./webpack-isomorphic-tools')];
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

const useFonts = [
  {
    loader: 'url-loader',
    options: {
      limit: 512,
      name: 'assets/fonts/[name].[ext]',
      publicPath: '../',
    },
  },
];

const useImages = [
  {
    loader: 'url-loader',
    options: {
      limit: 512,
      name: 'assets/images/[name].[ext]',
      publicPath: '../',
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
        test: /images\/.*\.svg$/,
        use: [
          ...useImages,
          {
            loader: 'svgo-loader',
          },
        ],
      },
      {
        test: webpackIsomorphicToolsPlugin.regularExpression('images'),
        use: useImages,
      },
    ],
  },
  resolve: {
    modules: [
      'src',
      'node_modules',
    ],
    alias: {
      '@Config': path.resolve(paths.root, './config'),
      '@Components': path.resolve(paths.src, './components'),
      '@Containers': path.resolve(paths.src, './containers'),
      '@Helpers': path.resolve(paths.src, './helpers'),
      '@ReduxActions': path.resolve(paths.src, './redux/actions'),
      '@ReduxConstants': path.resolve(paths.src, './redux/constants'),
      '@ReduxEvents': path.resolve(paths.src, './redux/events'),
      '@ReduxMiddlewares': path.resolve(paths.src, './redux/middlewares'),
      '@ReduxReducers': path.resolve(paths.src, './redux/reducers'),
      '@ReduxStores': path.resolve(paths.src, './redux/stores'),
      '@ReduxUtils': path.resolve(paths.src, './redux/utils'),
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
    webpackIsomorphicToolsPlugin,
  ],
};
