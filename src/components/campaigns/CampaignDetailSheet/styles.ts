import { useTheme } from '../../../hooks/useTheme';

export const useStyles = () => {
  const theme = useTheme();

  return theme.createStyles(theme => ({
    container: {
      flex: 1,
      padding: theme.spacing.l,
      backgroundColor: theme.colors.card,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.l,
    },
    logo: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: 15,
      borderWidth: 2,
      borderColor: theme.colors.background,
    },
    headerText: {
      flex: 1,
    },
    title: {
      fontSize: theme.typography.fontSize.xxxl,
      fontWeight: theme.typography.fontWeight.bold,
      marginBottom: 4,
      color: theme.colors.text.primary,
    },
    subtitle: {
      fontSize: theme.typography.fontSize.m,
      color: theme.colors.text.secondary,
    },
    description: {
      fontSize: 15,
      lineHeight: 22,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.l,
    },
    detailsContainer: {
      backgroundColor: theme.colors.background,
      borderRadius: theme.borderRadius.large,
      padding: 15,
      marginBottom: 20,
      ...theme.shadows.small,
    },
    sectionTitle: {
      fontSize: theme.typography.fontSize.xl,
      fontWeight: theme.typography.fontWeight.semiBold,
      marginBottom: 15,
      color: theme.colors.text.primary,
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    detailLabel: {
      fontSize: 15,
      color: theme.colors.text.secondary,
      fontWeight: theme.typography.fontWeight.medium,
    },
    detailValue: {
      fontSize: 15,
      color: theme.colors.text.primary,
      fontWeight: theme.typography.fontWeight.bold,
      textAlign: 'right',
    },
    emptyText: {
      textAlign: 'center',
      marginTop: 50,
      fontSize: theme.typography.fontSize.l,
      color: theme.colors.text.light,
    },
  }));
};
