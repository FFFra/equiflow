import 'react-native-gesture-handler/jestSetup';
import '@testing-library/jest-native/extend-expect';
import { jest } from '@jest/globals';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

jest.mock('../../../utils/haptics', () => ({
  impactLight: jest.fn(),
  impactMedium: jest.fn(),
  impactHeavy: jest.fn(),
  notificationSuccess: jest.fn(),
  notificationWarning: jest.fn(),
  notificationError: jest.fn(),
}));

// Mock the React Native Gesture Handler
jest.mock('react-native-gesture-handler', () => ({
  GestureHandlerRootView: 'View',
  GestureDetector: 'View',
  Gesture: {
    Pan: () => ({
      onStart: jest.fn().mockReturnThis(),
      onUpdate: jest.fn().mockReturnThis(),
      onEnd: jest.fn().mockReturnThis(),
      onFinalize: jest.fn().mockReturnThis(),
      enabled: jest.fn().mockReturnThis(),
      activeOffsetX: jest.fn().mockReturnThis(),
      onChange: jest.fn().mockReturnThis(),
    }),
  },
}));

// Mock React Native Reanimated
jest.mock('react-native-reanimated', () => ({
  __esModule: true,
  default: {
    View: 'View',
  },
  View: 'View',
  useSharedValue: jest.fn().mockReturnValue(0),
  useAnimatedStyle: jest.fn().mockReturnValue({}),
  withTiming: jest.fn().mockImplementation(toValue => toValue),
  withSpring: jest.fn().mockImplementation(toValue => toValue),
  runOnJS: jest.fn().mockImplementation(fn => fn),
}));

// Mock Bottom Sheet
jest.mock('@gorhom/bottom-sheet', () => {
  const mockComponent = function (props: any) {
    return {
      type: 'View',
      props: {
        children: props.children,
      },
    };
  };

  mockComponent.displayName = 'BottomSheet';

  return {
    __esModule: true,
    default: mockComponent,
  };
});
