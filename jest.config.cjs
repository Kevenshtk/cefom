/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',

  testEnvironment: 'jsdom',

  roots: ['<rootDir>/src'],

  testMatch: [
    '**/?(*.)+(spec|test).[tj]s?(x)',
  ],

  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
  ],

  setupFilesAfterEnv: [
    '<rootDir>/jest.setup.ts',
  ],

  clearMocks: true,
};