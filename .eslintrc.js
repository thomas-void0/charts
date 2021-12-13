module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  rules: {
    'import/prefer-default-export': 0,
  },
  ignore: [
    "./__test__/*",
    "./jest.config.js",
    "./rollup.config.js"
  ]
};