const { rules } = require("../.eslintrc");

module.exports = {
  extends: [
    "airbnb",
    "airbnb/hooks",
  ],
  env: {
    browser: true,
  },
  settings: {
    react: {
      version: "detect"
    },
    "import/parsers": {
      "@typescript-eslint/parser": [".ts",".tsx"],
      },
      "import/resolver": {
          "node": {
              "extensions": [".js",".jsx",".ts",".tsx"],
          }
      }
  },
  rules: {
    // Copy rules from main ESLint config not to overwrite custom rules with AirBnB's
    ...rules,

    // Our rules
    "no-console": ["error", { allow: ["warn", "error"] }],

    // Typescript Eslint Rules
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-useless-constructor": "error",
    "import/extensions": ["error", "ignorePackages", {
        "js": "never",
        "mjs": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never",
    }],
    "no-unused-vars": "off",
    "no-useless-constructor": "off",
    "react/jsx-filename-extension": ["error", {
        "extensions": [".jsx", ".tsx"],
    }],

    // AirBnB Rule Overrides
    "no-plusplus": 0,
    "no-alert": 0,
    "no-use-before-define": 0,

    "react/jsx-indent": ["error", 4],
    "react/jsx-indent-props": ["error", 4],

    // Use AirBnB config rule with length of 120
    "max-len": ["error", 120, 2, {
      ignoreUrls: true,
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],

    // Removed ForOfStatement restriction from default AirBnB restricted syntaxes
    "no-restricted-syntax": [
      "error",
      {
        selector: "ForInStatement",
        message: "for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.",
      },
      {
        selector: "LabeledStatement",
        message: "Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.",
      },
      {
        selector: "WithStatement",
        message: "`with` is disallowed in strict mode because it makes code impossible to predict and optimize.",
      },
    ],
  },
};
