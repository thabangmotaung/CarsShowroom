module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  testMatch: ['**/__tests__/**/*.test.ts'],
  moduleFileExtensions: ['ts', 'js'],
  collectCoverageFrom: [
    'tests/**/*.ts',
    '!tests/**/*.spec.ts',
    '!tests/pages/**',
    '!tests/fixtures/**'
  ]
};