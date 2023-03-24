module.exports = {
  extends: ['stylelint-config-twbs-bootstrap'],
  customSyntax: 'postcss-scss',
  ignoreFiles: ['build/**/*.css'],
  rules: {
    'number-leading-zero': false,
    'selector-pseudo-class-no-unknown': [
      true,
      { ignorePseudoClasses: ['global'] },
    ],
  },
};
