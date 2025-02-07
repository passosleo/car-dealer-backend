/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/src/application/use-cases/**/__tests__/unit/**/*.spec.ts',
    '<rootDir>/src/application/use-cases/**/__tests__/unit/**/*.test.ts',
  ],
  setupFilesAfterEnv: [],
  collectCoverageFrom: [
    'src/application/use-cases/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/__tests__/**',
    '!src/**/*.spec.ts',
    '!src/**/*.test.ts',
    '!src/main.ts',
    '!src/**/index.ts',
  ],
  coverageDirectory: 'coverage/unit',
  coverageReporters: ['text', 'lcov'],
};
