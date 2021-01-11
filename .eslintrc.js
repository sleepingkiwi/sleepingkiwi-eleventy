module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb-base'],
  plugins: [
    'svelte3',
  ],
  overrides: [
    {
      files: ['**/*.svelte'],
      processor: 'svelte3/svelte3',
      rules: {
        'import/first': 'off',
        'import/no-mutable-exports': 'off',
        'import/no-duplicates': 'off',
        'import/prefer-default-export': 'off',
      },
    },
  ],
  rules: {
    // two line breaks max - airbnb says one but I like having two to help divide bigger files
    'no-multiple-empty-lines': [
      'error',
      {
        max: 2,
      },
    ],
    // don't throw an error for `/*****lol` but do for `//lol`
    'spaced-comment': [
      'error',
      'always',
      {
        exceptions: [
          '*',
        ],
      },
    ],
    'function-paren-newline': [
      'error',
      'consistent',
    ],
    // allow us to import from svelte even though it's a dev dependency
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    // I don't like the ambiguity of unwrapped strings in jsx
    // 'react/jsx-curly-brace-presence': [
    //   'error',
    //   {
    //     props: 'never',
    //     children: 'never',
    //   },
    // ],
    // // I want to use .js as the extension for everything. airbnb default is to only allow .jsx
    // 'react/jsx-filename-extension': [
    //   'error',
    //   {
    //     extensions: [
    //       '.js',
    //     ],
    //   },
    // ],
  },
  settings: {
    // react: {
    //   pragma: 'h',
    // },
  },
  env: {
    browser: true,
    // needed for globals like `require` and `process` (i.e. process.env.NODE_ENV)
    node: true,
  },
}; // returned config object
