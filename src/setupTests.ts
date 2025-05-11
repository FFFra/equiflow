import '@testing-library/jest-native/extend-expect';
import { jest } from '@jest/globals';

global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
};
