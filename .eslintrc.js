module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    amd: true
  },
  extends: [
    'airbnb', 'plugin:unicorn/recommended', 'plugin:react/all',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 7,
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true,
    },
    sourceType: 'module',
  },
  plugins: [
    'react',
    'babel',
    'unicorn',
    'jest'
  ],
  rules: {
    indent: [
      'error',
      2,
    ],
    'linebreak-style': [
      'error',
      'unix',
    ],
    "semi": 0,
    "padded-blocks":0,
    "no-multi-spaces":0,
    "global-require":0,
    "no-eval":0,
    quotes: [
      'error',
      'single',
    ],

    strict: 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-no-literals': 0,
    'import/prefer-default-export': 0,
    'react/jsx-one-expression-per-line': 0,
  },
}
