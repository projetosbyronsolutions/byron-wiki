module.exports = {
  plugins: ['@docusaurus'],
  extends: ['plugin:@docusaurus/recommended'],
  rules: {
    '@docusaurus/no-untranslated-text': ['warn', { ignoredStrings: ['·', '—', '×'] }],
  },
  parserOptions: {
    sourceType: 'module',
  },
  env: {
    es6: true,
  },
};
