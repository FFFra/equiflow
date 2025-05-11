import { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { theme } from '../styles/theme';
import { Theme, UseThemeResult } from '../types/hooks/theme';

export const useTheme = (): UseThemeResult => {
  const createStyles = useCallback(
    <T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>>(
      stylesCallback: (theme: Theme) => T
    ): T => {
      return StyleSheet.create(stylesCallback(theme));
    },
    []
  );

  return {
    ...theme,
    createStyles,
  };
};
