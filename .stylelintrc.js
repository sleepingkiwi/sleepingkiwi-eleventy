/** implements most of the rules from airbnbs css style guide but with a few updates
 *  ------------------------------------------------------------------------------------------------
 *  ref: https://github.com/airbnb/css
**/
module.exports = {
  plugins: [
    'stylelint-value-no-unknown-custom-properties',
  ],
  extends: [
    require.resolve('stylelint-config-standard'),
  ],
  rules: {
    // layout
    indentation: 2,
    'max-empty-lines': 2,
    'string-quotes': 'single',
    'block-opening-brace-space-before': 'always',
    'block-no-empty': true,
    'rule-empty-line-before': ['always', {
      'ignore': ['after-comment'],
    }],
    'comment-empty-line-before': [
      'always',
      {
        ignore: ['after-comment', 'stylelint-commands'],
        except: ['first-nested'],
      },
    ],
    'comment-whitespace-inside': 'always',
    'declaration-colon-space-before': 'never',
    'declaration-colon-space-after': 'always-single-line',
    'declaration-block-single-line-max-declarations': 1,
    'declaration-block-trailing-semicolon': 'always',
    'selector-list-comma-newline-after': 'always',
    'value-list-comma-space-after': 'always-single-line',
    'at-rule-empty-line-before': [
      'always', {
        'ignoreAtRules': ['import', 'first-nested'],
      },
    ],
    'function-comma-space-after': 'always-single-line',
    'function-comma-space-before': 'never',

    // nice in theory - really annoying in practice
    // see https://stylelint.io/user-guide/rules/no-descending-specificity#dom-limitations
    'no-descending-specificity': null,

    'no-duplicate-selectors': true,
    'shorthand-property-no-redundant-values': true,
    'length-zero-no-unit': true,
    'number-no-trailing-zeros': true,
    'color-hex-case': 'lower',
    'color-hex-length': 'long',
    'color-no-invalid-hex': true,
    'at-rule-name-case': 'lower',
    'declaration-no-important': true,
    'declaration-block-no-duplicate-properties': [
      true,
      {
        ignore: [
          'consecutive-duplicates-with-different-values',
        ],
      },
    ],
    // use border: 0 instead pls
    'declaration-property-value-blacklist': {
      '/^border/': ['none'],
    },
    // no ids in styles - disable on a case by case if you need one
    'selector-max-id': 0,
    'selector-max-compound-selectors': 4,
    'selector-no-qualifying-type': [
      true,
      {
        ignore: 'attribute',
      },
    ],
    // if you specifically need one disable per case!
    'value-no-vendor-prefix': true,
    // we enable css nesting through postcss but don't want it to get crazy...
    'max-nesting-depth': 3,
    // custom properties
    'csstools/value-no-unknown-custom-properties': [
      true, {
        'importFrom': [
          'src/styles/settings/_brand.css',
          'src/styles/settings/_breakpoints.css',
          'src/styles/settings/_colours.css',
          'src/styles/settings/_layout.css',
          'src/styles/settings/_modular-scale.css',
          'src/styles/settings/_z-index.css',
          'src/styles/fonts/fonts.css',
        ],
      },
    ],
  }, // rules
}; // config object
