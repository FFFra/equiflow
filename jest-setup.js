// Mock React Native Gesture Handler
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
  const mockComponent = function (props) {
    return props.children;
  };

  mockComponent.displayName = 'BottomSheet';

  return {
    __esModule: true,
    default: mockComponent,
  };
});

// Mock API hooks
jest.mock('./src/api/hooks', () => ({
  usePaginatedCampaigns: jest.fn(),
  useAllCampaigns: jest.fn(),
  useCampaign: jest.fn(),
}));

// Mock jest-expo setup
jest.mock('jest-expo/src/preset/setup', () => ({}));

// Mock Animated
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock Haptics
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: 'light',
    Medium: 'medium',
    Heavy: 'heavy',
  },
  notificationAsync: jest.fn(),
  NotificationFeedbackType: {
    Success: 'success',
    Warning: 'warning',
    Error: 'error',
  },
  selectionAsync: jest.fn(),
}));

// Mock Local Authentication
jest.mock('expo-local-authentication', () => ({
  authenticateAsync: jest.fn().mockResolvedValue({ success: true }),
  hasHardwareAsync: jest.fn().mockResolvedValue(true),
  isEnrolledAsync: jest.fn().mockResolvedValue(true),
  supportedAuthenticationTypesAsync: jest.fn().mockResolvedValue([1, 2]),
}));
