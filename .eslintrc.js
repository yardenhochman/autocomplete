module.exports = {
    env: {
      browser: true,
      es6: true
    },
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:prettier/recommended",
      "airbnb-base",
      "prettier"
    ],
    plugins: ["react", "react-hooks","prettier"],
    "settings": {
      "react": {
        "version": "detect",
      },
    },
    globals: {
      Atomics: "readonly",
      SharedArrayBuffer: "readonly"
    },
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      },
      ecmaVersion: 2018,
      sourceType: "module"
    },
    rules: {
      "arrow-parens":["error","as-needed"],
      "prettier/prettier": [
        "error",
        {
          singleQuote: true,
          semi: true,
          trailingComma: "all",
          jsxBracketSameLine: true,
          printWidth: 100
        }
      ]
    }
  };
  