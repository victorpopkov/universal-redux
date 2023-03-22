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
  parser: '@babel/eslint-parser',
  plugins: ['react', 'import'],
  rules: {
    'import/no-unresolved': [2, { ignore: ['@Config'] }],
    'no-console': 0,
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
