module.exports = {
  roots: ['<rootDir>'],
  testMatch: ['**/tests/**/*.+(ts|tsx)', '**/?(*.)+(spec|test).+(ts|tsx)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    'node_modules/uuid/.+\\.js$': [
      'babel-jest',
      {presets: [['@babel/preset-env', {modules: 'commonjs'}]]},
    ],
  },
  transformIgnorePatterns: ['/node_modules/(?!uuid/)'],
  verbose: true,
  collectCoverage: true,
}
