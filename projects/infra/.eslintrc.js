module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
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
