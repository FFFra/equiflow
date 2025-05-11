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
    },
    emptyText: {
      textAlign: 'center',
      marginTop: 50,
      fontSize: theme.typography.fontSize.l,
      color: theme.colors.text.light,
    },
    loadingIndicator: {
      marginVertical: 20,
    },
  }));
};
