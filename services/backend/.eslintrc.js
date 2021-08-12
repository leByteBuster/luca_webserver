module.exports = {
  root: true,
  env: {
    commonjs: true,
    es6: true,
    node: true,
    mocha: true,
  },
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended',
    'plugin:node/recommended',
    'plugin:mocha/recommended',
    'plugin:sonarjs/recommended',
    'plugin:unicorn/recommended',
    'plugin:promise/recommended',
    'plugin:security/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['mocha', 'sonarjs', 'security', '@typescript-eslint'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'max-lines': [2, { max: 250, skipBlankLines: true, skipComments: true }],
    complexity: 2,
    'no-await-in-loop': 0,
    'no-process-exit': 0,
    'node/exports-style': [2, 'module.exports'],
    'unicorn/filename-case': [2, { case: 'camelCase' }],
    'promise/always-return': 0,
    'unicorn/no-null': 0,
    'unicorn/no-process-exit': 0,
    'unicorn/no-array-for-each': 0,
    'unicorn/number-literal-case': 0,
    'no-restricted-syntax': ['error', 'LabeledStatement', 'WithStatement'],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'node/no-unsupported-features/es-syntax': [
      'error',
      { ignores: ['modules'] },
    ],
    'import/prefer-default-export': 0,
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/ban-ts-comment': [
      2,
      { 'ts-ignore': 'allow-with-description' },
    ],
    'import/extensions': [1, 'never'],
    'import/no-unresolved': 'error',
    'node/no-missing-import': [
      'error',
      {
        allowModules: [
          'utils',
          'database',
          'middlewares',
          'constants',
          'passport',
          'routes',
        ],
        tryExtensions: ['.js', '.ts'],
      },
    ],
  },
  settings: {
    node: {
      tryExtensions: ['.js', '.ts', '.d.ts'],
    },
    'import/resolver': {
      typescript: {
        extensions: ['.js', '.ts'],
      },
      node: {
        extensions: ['.js', '.ts'],
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
      node: ['.js', '.ts'],
    },
  },
  ignorePatterns: ['config/*.js'],
  overrides: [
    {
      files: ['src/setupTests.js', 'src/testHelper/*.js', '*.test.js'],
      rules: {
        'mocha/no-mocha-arrows': 0,
        'mocha/no-hooks-for-single-case': 0,
        'node/no-unpublished-require': 0,
        'security/detect-object-injection': 0,
        'import/no-extraneous-dependencies': 0,
        'unicorn/no-useless-undefined': 0,
        'sonarjs/no-duplicate-string': 0,
        'no-unused-expressions': 0,
      },
    },
    {
      files: ['*.test.js', 'src/database/seeds/*.js'],
      rules: {
        'max-lines': 0,
        'unicorn/filename-case': 0,
      },
    },
    {
      files: ['src/database/migrations/*.js', 'config/*.js'],
      rules: {
        'unicorn/filename-case': 0,
        'no-console': 0,
        'sonarjs/no-duplicate-string': 0,
      },
    },
    {
      files: ['src/routes/**/*.js'],
      rules: {
        'unicorn/no-reduce': 0,
      },
    },
    {
      files: ['src/**/*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 0,
      },
    },
    {
      files: ['src/database/seeds/**/*'],
      rules: {
        'no-console': 0,
      },
    },
  ],
};