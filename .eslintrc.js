module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    '@nuxtjs/eslint-config-typescript'
  ],
  plugins: [],
  ignorePatterns: ['dist/', '__mocks__/', 'lib/'],
  // add your custom rules here
  rules: {}
}
