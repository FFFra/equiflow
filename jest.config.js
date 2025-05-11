module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)',
  ],
  setupFiles: ['<rootDir>/jest-setup.js'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect', '<rootDir>/src/setupTests.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: false,
  testPathIgnorePatterns: [
    '/node_modules/',
    '/__tests__/mocks/',
    '/__tests__/setup.ts',
    '/src/screens/main/__tests__/mocks/reactNativeGestureHandler.mock.ts',
    '/src/screens/main/__tests__/mocks/reactNativeReanimated.mock.ts',
    '/src/screens/main/__tests__/mocks/gorhomBottomSheet.mock.ts',
  ],
};
