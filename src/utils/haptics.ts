import * as Haptics from 'expo-haptics';
import { Vibration } from 'react-native';

/**
 * Medium impact haptic feedback with fallback to vibration
 */
export const impactMedium = (): void => {
  try {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  } catch (error) {
    Vibration.vibrate(40);
  }
};

/**
 * Light impact haptic feedback with fallback to vibration
 */
export const impactLight = (): void => {
  try {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  } catch (error) {
    Vibration.vibrate(20);
  }
};

/**
 * Selection haptic feedback for UI selections
 */
export const selectionFeedback = (): void => {
  try {
    Haptics.selectionAsync();
  } catch (error) {
    Vibration.vibrate(10);
  }
};

/**
 * Success notification feedback
 */
export const notifySuccess = (): void => {
  try {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  } catch (error) {
    Vibration.vibrate(50);
  }
};

/**
 * Error notification feedback
 */
export const notifyError = (): void => {
  try {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
  } catch (error) {
    Vibration.vibrate([0, 50, 50, 50]);
  }
};
