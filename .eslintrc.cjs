module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  ignorePatterns: ['*.cjs'],
  env: {
    es2017: true,
    node: true,
  },
  extends: ['eslint:recommended'],
  rules: {
    'no-unused-vars': 'warn',
  },
  overrides: [
    {
      files: ['*.svelte'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      env: { browser: true, node: false },
      rules: {
        'no-inner-declarations': 'off',
        'no-self-assign': 'off',
      },
    },
    {
      files: ['src/**/*.ts', 'src/**/*.js'],
      env: { browser: true, node: false },
    },
  ],
};
