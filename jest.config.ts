/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';
import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  dir: './',
})

const config: Config = {
  clearMocks: true,
  coverageProvider: "v8",
  moduleNameMapper: {
    '^react-modal$': '<rootDir>/__mocks__/react-modal.tsx',
  },
  testEnvironment: "jsdom",
};

export default createJestConfig(config);
