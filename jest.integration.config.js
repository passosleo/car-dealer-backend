/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: [
    '<rootDir>/src/application/use-cases/**/__tests__/integration/**/*.spec.ts',
    '<rootDir>/src/application/use-cases/**/__tests__/integration/**/*.test.ts',
  ],
  setupFilesAfterEnv: ['<rootDir>/src/test/integration/jest.integration.setup.ts'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/__tests__/**',
    '!src/**/*.spec.ts',
    '!src/**/*.test.ts',
    '!src/main.ts',
    '!src/**/index.ts',
    '!src/test/**',
  ],
  coverageDirectory: 'coverage/integration',
  coverageReporters: ['text', 'lcov'],
};
