import AsyncStorage from '@react-native-async-storage/async-storage';
import { SerializedSet } from '../types/store/campaignStore';

/**
 * Storage helper for Zustand persist middleware
 */
export const asyncStorageAdapter = {
  getItem: async (name: string): Promise<string | null> => {
    return await AsyncStorage.getItem(name);
  },

  setItem: async (name: string, value: string): Promise<void> => {
    await AsyncStorage.setItem(name, value);
  },

  removeItem: async (name: string): Promise<void> => {
    await AsyncStorage.removeItem(name);
  },
};

/**
 * Helper for serializing Set objects to JSON
 */
export const setReplacer = (key: string, value: any): any => {
  if (value instanceof Set) {
    return { dataType: 'Set', value: Array.from(value) } as SerializedSet<any>;
  }
  return value;
};

/**
 * Helper for deserializing Set objects from JSON
 */
export const setReviver = (key: string, value: any): any => {
  if (
    typeof value === 'object' &&
    value !== null &&
    'dataType' in value &&
    value.dataType === 'Set' &&
    'value' in value &&
    Array.isArray(value.value)
  ) {
    return new Set(value.value);
  }
  return value;
};
