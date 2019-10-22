// https://jestjs.io/docs/en/configuration.html

module.exports = {
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: -5
    }
  },
  modulePathIgnorePatterns: [
    'assets/'
  ],
  setupFilesAfterEnv: ['jest-expect-message'],
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    'node_modules/',
    'vendor/',
    'tests/helpers.js'
  ],
  testMatch: [
    '**/tests/*.js'
  ]
}
