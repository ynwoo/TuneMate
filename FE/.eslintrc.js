module.exports = {
  root: true,
  extends: [
    '@react-native',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
    'plugin:jsx-a11y/recommended',
    'airbnb',
    'airbnb-typescript',
    'prettier',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: true,
    tsconfigRootDir: __dirname,
  },
  plugins: [
    'testing-library',
    'prettier',
    'react',
    '@typescript-eslint',
    'jsx-a11y',
    'react-hooks',
    'react-refresh',
  ],
  overrides: [
    {
      files: [
        '*.ts',
        '*.tsx',
        '**/__tests__/**/*.[jt]s?(x)',
        '**/?(*.)+(spec|test).[jt]s?(x)',
      ],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',

        'react/function-component-definition': 0,
        'react/no-unstable-nested-components': ['off'],
        '@typescript-eslint/no-use-before-define': 'off',
        'import/extensions': ['off'],
        '@typescript-eslint/ban-types': 'off',
        'react/require-default-props': [
          'off',
          {
            forbidDefaultForRequired: false,
          },
        ],

        // testing-library
        'testing-library/await-async-queries': 'error',
        'testing-library/no-await-sync-queries': 'error',
        'testing-library/no-debugging-utils': 'warn',
        'testing-library/no-dom-import': 'off',
      },
      extends: ['plugin:testing-library/react'],
    },
  ],
};
