import { View } from 'react-native';

jest.mock('react-native-reanimated', () => {
  return {
    __esModule: true,
    default: {
      View,
    },
    View,
    useSharedValue: jest.fn().mockReturnValue(0),
    useAnimatedStyle: jest.fn().mockReturnValue({}),
    withTiming: jest.fn().mockImplementation(toValue => toValue),
    withSpring: jest.fn().mockImplementation(toValue => toValue),
    runOnJS: jest.fn().mockImplementation(fn => fn),
  };
});
