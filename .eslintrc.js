const path = require('path');

module.exports = {
  extends: ['airbnb', 'plugin:prettier/recommended'],
  env: {
    browser: true,
    jest: true,
    node: true,
  },
  globals: {
    __DEVELOPMENT__: true,
    __CLIENT__: true,
    __SERVER__: true,
    __DISABLE_SSR__: true,
    __DEVTOOLS__: true,
    socket: true,
  },
  ignorePatterns: ['build/'],
  parser: '@babel/eslint-parser',
  plugins: ['react', 'import'],
  rules: {
    'import/no-import-module-exports': [
      'error',
      {
        exceptions: [
          path.join(__dirname, 'src/client.jsx'),
          path.join(__dirname, 'src/store/index.js'),
        ],
      },
    ],
    'import/no-unresolved': [2, { ignore: ['@Config'] }],
    'no-console': 0,
    'no-underscore-dangle': [
      'error',
      { allow: ['__PRELOADED_STATE__', '__REDUX_DEVTOOLS_EXTENSION__'] },
    ],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
  },
  settings: {
    'import/resolve': {
      moduleDirectory: ['node_modules', 'src'],
    },
  },
};
