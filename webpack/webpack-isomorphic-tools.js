const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');

global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production'; // eslint-disable-line no-underscore-dangle

// To learn more:
// https://github.com/catamphetamine/webpack-isomorphic-tools#style-loader-css-stylesheets-with-css-modules-feature
module.exports = {
  // debug: true,
  assets: {
    images: {
      extensions: [
        'jpeg',
        'jpg',
        'png',
        'gif',
      ],
      parser: WebpackIsomorphicToolsPlugin.urlLoaderParser,
    },
    fonts: {
      extensions: [
        'woff',
        'woff2',
        'ttf',
        'eot',
      ],
      parser: WebpackIsomorphicToolsPlugin.urlLoaderParser,
    },
    svg: {
      extension: 'svg',
      parser: WebpackIsomorphicToolsPlugin.urlLoaderParser,
    },
    style_modules: {
      extensions: ['less', 'scss'],
      filter(module, regex, options, log) {
        if (__DEVELOPMENT__) {
          return WebpackIsomorphicToolsPlugin.styleLoaderFilter(module, regex, options, log);
        }

        return regex.test(module.name);
      },
      path(module, options, log) {
        if (__DEVELOPMENT__) {
          return WebpackIsomorphicToolsPlugin.styleLoaderPathExtractor(module, options, log);
        }

        return module.name;
      },
      parser(module, options, log) {
        if (__DEVELOPMENT__) {
          return WebpackIsomorphicToolsPlugin.cssModulesLoaderParser(module, options, log);
        }

        return module.source;
      },
    },
  },
};
