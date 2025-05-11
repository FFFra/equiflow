import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthState } from '../types/store/authStore';
import { STORAGE_KEYS } from '../config/storage';

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  pin: null,
  isBiometricsEnabled: false,
  isLoading: true,

  loadStoredAuth: async () => {
    try {
      const storedPin = await SecureStore.getItemAsync(STORAGE_KEYS.PIN);
      const biometricsPref = await SecureStore.getItemAsync(STORAGE_KEYS.BIOMETRICS_PREFERENCE);
      if (storedPin) {
        set({ pin: storedPin, isAuthenticated: true });
      }
      if (biometricsPref) {
        set({ isBiometricsEnabled: biometricsPref === 'true' });
      }
    } catch (error) {
      console.error('Failed to load auth data from secure store', error);
    } finally {
      set({ isLoading: false });
    }
  },

  checkPinExists: async () => {
    const storedPin = await SecureStore.getItemAsync(STORAGE_KEYS.PIN);
    return !!storedPin;
  },

  setPin: async (newPin: string) => {
    try {
      await SecureStore.setItemAsync(STORAGE_KEYS.PIN, newPin);
      set({ pin: newPin, isAuthenticated: true });
    } catch (error) {
      console.error('Failed to save PIN to secure store', error);
    }
  },

  loginWithPin: async (enteredPin: string) => {
    const { pin: storedPin } = get();
    if (storedPin && enteredPin === storedPin) {
      set({ isAuthenticated: true });
      return true;
    }
    return false;
  },

  enableBiometrics: async () => {
    try {
      await SecureStore.setItemAsync(STORAGE_KEYS.BIOMETRICS_PREFERENCE, 'true');
      set({ isBiometricsEnabled: true });
    } catch (error) {
      console.error('Failed to save biometrics preference', error);
    }
  },

  disableBiometrics: async () => {
    try {
      await SecureStore.setItemAsync(STORAGE_KEYS.BIOMETRICS_PREFERENCE, 'false');
      set({ isBiometricsEnabled: false });
    } catch (error) {
      console.error('Failed to save biometrics preference', error);
    }
  },

  logout: async () => {
    try {
      await SecureStore.deleteItemAsync(STORAGE_KEYS.PIN);
      await SecureStore.deleteItemAsync(STORAGE_KEYS.BIOMETRICS_PREFERENCE);

      await AsyncStorage.removeItem(STORAGE_KEYS.CAMPAIGN_INTERACTIONS);

      set({
        isAuthenticated: false,
        pin: null,
        isBiometricsEnabled: false,
      });
    } catch (error) {
      console.error('Error clearing app state:', error);
      set({ isAuthenticated: false });
    }
  },
}));

useAuthStore.getState().loadStoredAuth();
