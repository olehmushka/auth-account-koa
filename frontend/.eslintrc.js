module.exports = {
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  plugins: ['@typescript-eslint', 'jest'],
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:react/recommended', // Uses the recommended rules from @eslint-plugin-react
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'prettier/@typescript-eslint', // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    'plugin:jest/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true // Allows for the parsing of JSX
    }
  },
  rules: {
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', ',jsx', '.tsx'] }
    ],
    'no-console': 2,
    '@typescript-eslint/explicit-function-return-type': 1,
    'no-nested-ternary': 1,
    'no-shadow': 0,
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 1,
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'error',
    'react/prop-types': 'off',
    '@typescript-eslint/interface-name-prefix': [1, 'always'],
    '@typescript-eslint/no-empty-function': 'off',
    'react/jsx-props-no-spreading': 0,
    'react/display-name': 1,
    'no-unneeded-ternary': 1,
    'no-param-reassign': 1,
    'no-unused-expressions': 'off',
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['**/*.test.ts', '**/*.test.tsx'] }
    ],
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'react/state-in-constructor': 'off',
    'no-empty': 'off',
    'no-underscore-dangle': 'off',
    'react/jsx-indent': 'off',
    'consistent-return': 'off',
    'lines-between-class-members': 'off',
    'no-dupe-class-members': 'off',
    'class-methods-use-this': 'off',
    'import/no-named-as-default-member': 'off',
    'no-console': ['error', { allow: ['warn', 'error'] }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    'import/prefer-default-export': 'off',
    'eact/jsx-wrap-multilines': 'off',
    'jsx-a11y/aria-role': [
      2,
      {
        ignoreNonDOM: true
      }
    ],
    'react/jsx-curly-newline': 'off',
    'react/sort-comp': 'off',
    'import/no-named-as-default': 'off',
    'react/jsx-fragments': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'no-plusplus': 'off'
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    },
    react: {
      version: 'detect' // Tells eslint-plugin-react to automatically detect the version of React to use
    }
  },
  env: {
    browser: true,
    node: true
  }
};
