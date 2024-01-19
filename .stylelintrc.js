module.exports = {
  extends: ['stylelint-config-twbs-bootstrap'],
  customSyntax: 'postcss-scss',
  ignoreFiles: ['build/**/*.css'],
  rules: {
    '@stylistic/declaration-colon-newline-after': null,
    '@stylistic/number-leading-zero': null,
    '@stylistic/string-quotes': 'single',
    '@stylistic/value-list-comma-newline-after': null,
    '@stylistic/value-list-comma-space-after': null,
    'selector-pseudo-class-no-unknown': [
      true,
      { ignorePseudoClasses: ['global'] },
    ],
  },
};
