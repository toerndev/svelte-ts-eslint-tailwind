module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  ignorePatterns: ['*.cjs'],
  env: {
    es2017: true,
    node: true, // for config files
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
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
        'no-unused-vars': 'off',
        'no-self-assign': 'off'
      },
    },
    {
      files: ['src/**/*.ts', 'src/**/*.js'],
      env: { browser: true, node: false },
    },
    {
      files: ['*.spec.ts'],
      env: {
        jest: true,
      },
    },
  ],
}
