import nodeConfig from '@atlas/eslint-config/node';

export default [
  ...nodeConfig,
  {
    ignores: ['eslint.config.mjs', 'dist'],
  },
];
