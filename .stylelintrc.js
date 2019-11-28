/** implements most of the rules from airbnbs css style guide but with a few updates
 *  ------------------------------------------------------------------------------------------------
 *  ref: https://github.com/airbnb/css
**/
module.exports = {
  plugins: [
    require.resolve('stylelint-scss'),
    require.resolve('stylelint-selector-bem-pattern'),
  ],
  extends: [
    require.resolve('stylelint-config-standard'),
  ],
  rules: {
    indentation: 2,
    'max-empty-lines': 2,
    'string-quotes': 'single',
    'no-descending-specificity': null,
    'no-duplicate-selectors': true,
    'shorthand-property-no-redundant-values': true,
    'block-opening-brace-space-before': 'always',
    'block-no-empty': true,
    'rule-empty-line-before': ['always', {
      'ignore': ['after-comment']
    }],
    'length-zero-no-unit': true,
    'number-no-trailing-zeros': true,
    'comment-empty-line-before': ['always', {
      'ignore': ['stylelint-commands']
    }],
    'comment-whitespace-inside': 'always',
    'color-hex-case': 'lower',
    'color-hex-length': 'long',
    'color-no-invalid-hex': true,
    'declaration-no-important': true,
    'declaration-colon-space-before': 'never',
    'declaration-colon-space-after': 'always-single-line',
    'declaration-block-single-line-max-declarations': 1,
    'declaration-block-trailing-semicolon': 'always',
    'declaration-block-no-duplicate-properties': [
      true,
      {
        ignore: [
          'consecutive-duplicates-with-different-values'
        ],
      },
    ],
    // use border: 0 instead pls
    'declaration-property-value-blacklist': {
      '/^border/': ['none']
    },
    // no ids in styles
    'selector-max-id': 0,
    'selector-max-compound-selectors': 4,
    'selector-no-qualifying-type': [
      true,
      {
        ignore: 'attribute',
      },
    ],
    'selector-list-comma-newline-after': 'always',
    'value-no-vendor-prefix': true,
    'value-list-comma-space-after': 'always-single-line',
    'at-rule-empty-line-before': [
      'always', {
        'ignoreAtRules': ['import', 'first-nested']
      }],
    'at-rule-name-case': 'lower',
    'function-comma-space-after': 'always-single-line',
    'function-comma-space-before': 'never',
    'plugin/selector-bem-pattern': {
      'componentName': '[A-Z]+',
      'componentSelectors': {
        'initial': '^\\.{componentName}(?:-[a-z]+)?$',
        'combined': '^\\.combined-{componentName}-[a-z]+$'
      },
      'utilitySelectors': '^\\.util-[a-z]+$'
    },
    // scss specific
    'at-rule-blacklist': ['extend'],
    'max-nesting-depth': 3,
    'scss/selector-no-redundant-nesting-selector': true,
    'scss/double-slash-comment-whitespace-inside': 'always',
    'scss/selector-no-redundant-nesting-selector': true,
    // adding in the scss @ rules
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'each',
          'else',
          'extend',
          'for',
          'function',
          'if',
          'include',
          'mixin',
          'return',
          'while',
          'warn',
          'content',
        ],
      },
    ],
  }, // rules
}; // config object
