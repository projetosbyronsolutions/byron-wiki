module.exports = {
  plugins: ["@docusaurus"],
  extends: ["plugin:@docusaurus/recommended"],
  rules: {
    '@docusaurus/no-untranslated-text': [
      'warn',
      { ignoredStrings: ['·', '—', '×'] },
    ],
  },
  "env": {
    "es6": true
  }
}