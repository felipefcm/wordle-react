module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@next/next/recommended",
  ],

  parser: "@typescript-eslint/parser",
  parserOptions: { "project": ["./tsconfig.json"] },

  plugins: [
    "@typescript-eslint"
  ],

  ignorePatterns: ["tests/", "**/*.js"],

  rules: {
    "@typescript-eslint/no-empty-function": "off",
    "quotes": ["error", "single"],
    "semi": ["error", "never"],
  }
}
