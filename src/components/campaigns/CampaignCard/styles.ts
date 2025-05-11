import { useTheme } from '../../../hooks/useTheme';

export const useStyles = () => {
  const theme = useTheme();

  return theme.createStyles(theme => ({
    container: {
      position: 'relative',
      marginVertical: theme.spacing.s,
      marginHorizontal: theme.spacing.m,
    },
    card: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.medium,
      ...theme.shadows.medium,
      overflow: 'hidden',
    },
    coverImage: {
      width: '100%',
      height: 150,
    },
    logoContainer: {
      position: 'absolute',
      top: 130,
      left: theme.spacing.m,
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.circle,
      padding: 5,
      ...theme.shadows.small,
    },
    logo: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
    infoContainer: {
      padding: theme.spacing.m,
      paddingTop: 25,
    },
    name: {
      fontSize: theme.typography.fontSize.xl,
      fontWeight: theme.typography.fontWeight.bold,
      marginBottom: 4,
      color: theme.colors.text.primary,
    },
    description: {
      fontSize: theme.typography.fontSize.m,
      color: theme.colors.text.secondary,
      marginBottom: theme.spacing.s,
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 4,
    },
    statText: {
      fontSize: theme.typography.fontSize.s,
      color: theme.colors.text.primary,
    },
    valuation: {
      fontSize: theme.typography.fontSize.s,
      color: theme.colors.text.primary,
      marginBottom: theme.spacing.s,
    },
    followedIndicator: {
      position: 'absolute',
      top: 10,
      right: 10,
      backgroundColor: theme.colors.success,
      color: theme.colors.text.white,
      paddingHorizontal: 6,
      paddingVertical: 2,
      borderRadius: theme.borderRadius.small,
      fontSize: theme.typography.fontSize.xs,
      fontWeight: theme.typography.fontWeight.bold,
    },
    actionIndicator: {
      position: 'absolute',
      top: '50%',
      marginTop: -15,
      zIndex: 999,
      paddingVertical: 5,
      paddingHorizontal: 12,
      borderRadius: theme.borderRadius.small,
      justifyContent: 'center',
      alignItems: 'center',
    },
    followIndicator: {
      backgroundColor: theme.colors.action.follow,
    },
    hideIndicator: {
      backgroundColor: theme.colors.action.hide,
    },
    actionText: {
      color: theme.colors.text.white,
      fontWeight: theme.typography.fontWeight.bold,
      fontSize: theme.typography.fontSize.m,
    },
  }));
};
