import { useTheme } from '../../../hooks/useTheme';

export const useStyles = () => {
  const theme = useTheme();

  return theme.createStyles(theme => ({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing.l,
    },
    emptyText: {
      fontSize: theme.typography.fontSize.l,
      color: theme.colors.text.secondary,
      textAlign: 'center',
    },
    errorText: {
      fontSize: theme.typography.fontSize.l,
      color: theme.colors.error,
      textAlign: 'center',
    },
  }));
};
