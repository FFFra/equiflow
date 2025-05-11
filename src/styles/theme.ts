export const theme = {
  colors: {
    primary: 'tomato',
    secondary: '#007AFF',
    background: '#f0f0f0',
    card: 'white',
    text: {
      primary: '#333',
      secondary: '#666',
      light: '#999',
      white: 'white',
    },
    action: {
      follow: 'rgba(0, 128, 0, 0.8)',
      hide: 'rgba(255, 0, 0, 0.8)',
    },
    success: 'green',
    error: 'red',
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 20,
    xl: 24,
    xxl: 32,
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 12,
    circle: 25,
  },
  typography: {
    fontSize: {
      xs: 10,
      s: 12,
      m: 14,
      l: 16,
      xl: 18,
      xxl: 20,
      xxxl: 22,
    },
    fontWeight: {
      regular: '400' as const,
      medium: '500' as const,
      semiBold: '600' as const,
      bold: 'bold' as const,
    },
  },
  shadows: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 6,
    },
  },
};
