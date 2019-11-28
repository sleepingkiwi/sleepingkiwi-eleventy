module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'airbnb/hooks'],
  rules: {
    // don't throw an error for `/*****lol` but do for `//lol`
    'spaced-comment': [
      'error',
      'always',
      {
        exceptions: [
          '*'
        ]
      }
    ],
    'function-paren-newline': [
      'error',
      'consistent'
    ],
    // I don't like the ambiguity of unwrapped strings in jsx
    'react/jsx-curly-brace-presence': [
      'error',
      {
        props: 'never',
        children: 'never'
      }
    ],
    // I want to use .js as the extension for everything. airbnb default is to only allow .jsx
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: [
          '.js',
        ],
      },
    ],
  },
  settings: {
    react: {
      pragma: 'h',
    },
  },
  env: {
    browser: true,
    // needed for globals like `require` and `process` (i.e. process.env.NODE_ENV)
    node: true,
  }
}; // returned config object
