module.exports = {
  root: true,
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 12,
    sourceType: 'module',
  },

  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/vue',
  ],

  rules: {
    /**
     * 0: off,
     * 1: warn,
     * 2: error
     */
    // '@typescript-eslint/no-explicit-any': 0,
  },
};
