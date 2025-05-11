import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export type Theme = typeof theme;

export interface UseThemeResult extends Theme {
  createStyles: <T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>>(
    stylesCallback: (theme: Theme) => T
  ) => T;
}
