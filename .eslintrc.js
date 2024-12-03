module.exports = {
    parser: 'vue-eslint-parser',
    parserOptions: {
      parser: '@typescript-eslint/parser',
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    extends: [
      'eslint:recommended',
      'plugin:vue/essential',
      'plugin:@typescript-eslint/recommended',
    ],
    plugins: ['vue', '@typescript-eslint'],
    rules: {
      'no-unused-vars': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn'],
      'vue/no-unused-vars': 'warn',
    },
  };
  