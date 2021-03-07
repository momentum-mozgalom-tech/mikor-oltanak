module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:react/recommended",
    // "plugin:@typescript-eslint/recommended",
    // "plugin:@typescript-eslint/recommended-requiring-type-checking",
    // "prettier",
    // "prettier/@typescript-eslint",
  ],
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "import",
    "eslint-comments"
  ],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    project: ["./packages/*/tsconfig.json", "./firebase/tsconfig.json"],
    tsconfigRootDir: __dirname,
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    // RULES TO TURN ON EVENTUALLY
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/require-await": "off",
    "no-inner-declarations": "off",
    "react/no-unescaped-entities": "off",
    "no-case-declarations": "off",
    
    //
    // our rules
    //

    "indent": ["error", 4],
    "semi": [2, "always"],
    "@typescript-eslint/interface-name-prefix": "off",
    "object-curly-spacing": ["error", "always"],
    "quotes": ["error", "double"],
    "sort-imports": ["error", {
      "ignoreCase": false,
      "ignoreDeclarationSort": true,
      "ignoreMemberSort": false,
      "memberSyntaxSortOrder": ["none", "all", "multiple", "single"]
    }],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["warn", {
      "varsIgnorePattern": "^_",
      "argsIgnorePattern": "^_"
    }],
    "react/prop-types": "off",
    "react/require-default-props": "off",

    //
    // loaded rules
    //

    "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
    // "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-throw-literal": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/prefer-nullish-coalescing": "error",
    "@typescript-eslint/prefer-optional-chain": "error",
    "@typescript-eslint/unbound-method": "off",
    "@typescript-eslint/explicit-function-return-type": "off",

    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function": [
      "error",
      { allow: ["arrowFunctions"] },
    ],

    //
    // eslint base
    //

    "comma-dangle": ["error", "always-multiline"],
    "constructor-super": "off",
    curly: ["error", "all"],
    "no-mixed-operators": "error",
    // "no-console": ["error", { allow: ["warn", "error"] }],
    "no-process-exit": "error",

    //
    // eslint-plugin-eslint-comment
    //

    // require a eslint-enable comment for every eslint-disable comment
    "eslint-comments/disable-enable-pair": [
      "error",
      {
        allowWholeFile: true,
      },
    ],
    // disallow a eslint-enable comment for multiple eslint-disable comments
    "eslint-comments/no-aggregating-enable": "error",
    // disallow duplicate eslint-disable comments
    "eslint-comments/no-duplicate-disable": "error",
    // disallow eslint-disable comments without rule names
    "eslint-comments/no-unlimited-disable": "error",
    // disallow unused eslint-disable comments
    "eslint-comments/no-unused-disable": "error",
    // disallow unused eslint-enable comments
    "eslint-comments/no-unused-enable": "error",
    // disallow ESLint directive-comments
    "eslint-comments/no-use": [
      "error",
      {
        allow: [
          "eslint-disable",
          "eslint-disable-line",
          "eslint-disable-next-line",
          "eslint-enable",
        ],
      },
    ],

    //
    // eslint-plugin-import
    //

    // disallow non-import statements appearing before import statements
    "import/first": "error",
    // Require a newline after the last import/require in a group
    "import/newline-after-import": "error",
    // Forbid import of modules using absolute paths
    "import/no-absolute-path": "error",
    // disallow AMD require/define
    "import/no-amd": "error",
    // forbid default exports
    "import/no-default-export": "error",
    // Forbid the use of extraneous packages
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: true,
        peerDependencies: true,
        optionalDependencies: false,
      },
    ],
    // Forbid mutable exports
    "import/no-mutable-exports": "error",
    // Prevent importing the default as if it were named
    "import/no-named-default": "error",
    // Prohibit named exports
    "import/no-named-export": "off", // we want everything to be a named export
    // Forbid a module from importing itself
    "import/no-self-import": "error",
    // Require modules with a single export to use a default export
    "import/prefer-default-export": "off" // we want everything to be named
  },
};
