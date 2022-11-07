module.exports = {
  env: {
    browser : true,
    node    : true
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
  plugins : ['import'],
  rules   : {
    'indent'       : ['error', 2],
    'import/order' : ['error', {
      groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type']
    }],
    'key-spacing': ['error', {
      'align': {
        'afterColon'  : true,
        'beforeColon' : true,
        'on'          : 'colon'
      }
    }
    ],
    'no-unused-vars'                   : ['error', { 'argsIgnorePattern': '^_' }],
    'semi'                             : ['error', 'always'],
    'quotes'                           : [ 'error', 'single', { 'allowTemplateLiterals': true }],
    'vue/multi-word-component-names'   : ['off'],
    'vue/html-closing-bracket-newline' : ['error', {
      'multiline'  : 'never',
      'singleline' : 'never'
    }],
    'vue/max-attributes-per-line': ['error', {
      'multiline'  : { 'max': 4 },
      'singleline' : { 'max': 4 },
    }],
    'vue/static-class-names-order': 'error',
  }
};