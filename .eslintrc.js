'use strict';
module.exports = {
  'env': {
    'es6' : true,
    'node': true,
  },
  'extends': ['eslint:recommended'],
  'rules'  : {
    'strict': [
      2,
      'global',
    ],
    'indent': [
      'error',
      2,
    ],
    'linebreak-style': [
      'error',
      'unix',
    ],
    'quotes': [
      'error',
      'single',
    ],
    'semi': [
      'error',
      'always',
    ],
    'comma-dangle': [
      'error',
      'always-multiline',
    ],
    'key-spacing': [
      'error',
      {
        'multiLine': {
          'beforeColon': false,
          'afterColon' : true,
        },
        'align': {
          'beforeColon': false,
          'afterColon' : true,
          'on'         : 'colon',
          'mode'       : 'strict',
        },
      },
    ],
    'no-var': [
      'error',
    ],
    'prefer-arrow-callback': [
      'error', {
        'allowNamedFunctions': true,
      },
    ],
    'prefer-const': [
      'error',
      {
        'destructuring'         : 'any',
        'ignoreReadBeforeAssign': false,
      },
    ],
  },
};
