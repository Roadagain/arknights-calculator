module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  env: {
    node: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
}
