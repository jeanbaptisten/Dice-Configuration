module.exports = {
  "root": true,
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": { "project": ["./tsconfig.json"] },
  "plugins": [
    "@typescript-eslint"
  ],
  "rules": {
    "@typescript-eslint/strict-boolean-expressions": [
      2,
      {
        "allowString" : false,
        "allowNumber" : false
      }
    ],
    "prettier/prettier": [
      "error",
      {
        "semi": false,
        "singleQuote": true,
        "tabWidth": 2,
        "printWidth": 150,
        "trailingComma": "es5"
      }
    ]
  },
  "ignorePatterns": ['.eslintrc.js']
}
