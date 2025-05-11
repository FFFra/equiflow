import { View } from 'react-native';

jest.mock('react-native-gesture-handler', () => {
  return {
    GestureHandlerRootView: View,
    GestureDetector: View,
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
  };
});
