module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "airbnb-typescript",
    "prettier",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  plugins: ["react", "prettier"],
  rules: {
    "prettier/prettier": ["error"],
    "@typescript-eslint/no-use-before-define": "off",
    "no-param-reassign": [
      "error",
      {
        props: true,
        ignorePropertyModificationsFor: ["state", "ref"],
      },
    ],
    "react/require-default-props": "off",
    "react/jsx-props-no-spreading": "off",
    "no-restricted-syntax": "off",
    "no-continue": "off",
    "import/no-cycle": "off",
    "no-nested-ternary": "off",
    "import/no-extraneous-dependencies": "off",
    "prefer-destructuring": ["error", { object: true, array: false }],
  },
};
