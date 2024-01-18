module.exports = {
  extends: ['stylelint-config-twbs-bootstrap'],
  customSyntax: 'postcss-scss',
  ignoreFiles: ['build/**/*.css'],
  rules: {
    'number-leading-zero': null,
    'selector-pseudo-class-no-unknown': [
      true,
      { ignorePseudoClasses: ['global'] },
    ],
    'value-list-comma-newline-after': null,
    'value-list-comma-space-after': null,
  },
};
