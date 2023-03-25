const path = require('path');

module.exports = (api) => {
  api.cache(true);
  api.assertVersion('^7.4.5');

  const presets = [
    ['@babel/env', { targets: { browsers: ['last 2 versions'] } }],
    '@babel/react',
  ];

  const plugins = [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: false }],
    [
      'webpack-alias',
      { config: path.join(__dirname, 'webpack.base.config.js') },
    ],
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-function-bind',
    '@babel/plugin-syntax-export-default-from',
    '@babel/plugin-transform-react-display-name',
    '@babel/plugin-transform-runtime',
    'react-hot-loader/babel',
    [
      'inline-react-svg',
      {
        svgo: {
          plugins: [
            {
              name: 'removeAttrs',
              params: { attrs: '(data-name)' },
            },
            'cleanupIDs',
          ],
        },
      },
    ],
    [
      'prismjs',
      {
        languages: ['bash', 'markdown'],
        theme: 'default',
        css: true,
      },
    ],
  ];

  return {
    compact: false,
    presets,
    plugins,
  };
};
