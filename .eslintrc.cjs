module.exports = {
  env: {
    browser: true,
    node: true
  },
  globals: {
    chrome: true
  },
  parserOptions: {
    ecmaVersion: 2022
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-strongly-recommended',
  ],
  rules: {
    'vue/multi-word-component-names': ['off'],
    'no-unused-vars': ['error', { 
      'argsIgnorePattern': '^_' 
    }],
    'quotes': [
      'error',
      'single',
      { 'allowTemplateLiterals': true }
    ],
    'semi'                             : ['error', 'always'],
    'vue/html-closing-bracket-newline' : ['error', {
      'multiline'  : 'never',
      'singleline' : 'never'
    }],
    'vue/max-attributes-per-line': ['error', {
      'multiline': {
        'max': 4
      },
      'singleline': {
        'max': 4
      },
    }],
    'vue/static-class-names-order': 'error',
  }
};