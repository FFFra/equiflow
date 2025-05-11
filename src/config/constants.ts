export const ANIMATION_CONSTANTS = {
  SPRING_CONFIG: {
    damping: 10,
  },
  DURATION: {
    SHORT: 150,
    MEDIUM: 200,
    LONG: 300,
  },
};

export const GESTURE_CONSTANTS = {
  PAN_ACTIVE_OFFSET: [-20, 20] as [number, number],
  SWIPE_THRESHOLD: {
    FOLLOW: 100,
    HIDE: -100,
  },
  OPACITY_THRESHOLD: {
    START: 50,
    DIVISOR: 100,
  },
  LONG_PRESS: {
    MIN_DURATION: 300,
    MAX_DISTANCE: 20,
  },
};

export const UI_CONSTANTS = {
  BOTTOM_SHEET: {
    SNAP_POINTS: {
      DEFAULT: ['60%', '90%'],
      LIST_SCREENS: ['25%', '50%', '75%'],
    },
    OPEN_DELAY: 100,
  },
};
