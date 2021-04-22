module.exports = {
  env: {
    node: true
  },
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    "indent": [
      "error", 2
    ],
    "object-property-newline": [
      "error", { "allowAllPropertiesOnSameLine": false }
    ],
    "array-bracket-newline": [
      "error", "always"
    ],
    "array-element-newline": [
      "error", {
        "ArrayPattern": { "minItems": 3 },
      }
    ]
  },

};
