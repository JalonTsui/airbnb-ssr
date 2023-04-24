module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'standard-with-typescript'
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser'
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  rules: {
    "indent": 0,
    "space-before-function-paren": 0,
    "quotes": 0,
    "quote-props": 0,
    "eol-last": 0,
    "no-trailing-spaces": 0,
    "no-useless-return": 0
  }
}
