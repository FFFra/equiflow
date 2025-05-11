export const mockAuthStore = {
  loginWithPin: jest.fn().mockResolvedValue(true),
  setPin: jest.fn().mockResolvedValue(undefined),
  enableBiometrics: jest.fn().mockResolvedValue(undefined),
  loadStoredAuth: jest.fn().mockResolvedValue(undefined),
  isBiometricsEnabled: false,
  isLoading: false,
  isAuthenticated: false,
  pin: '1234',
};

export const mockAuthStoreWithBiometrics = {
  ...mockAuthStore,
  isBiometricsEnabled: true,
};

export const mockAuthStoreAuthenticated = {
  ...mockAuthStore,
  isAuthenticated: true,
};

export const mockAuthStoreLoading = {
  ...mockAuthStore,
  isLoading: true,
};

export const mockAuthStoreFailedLogin = {
  ...mockAuthStore,
  loginWithPin: jest.fn().mockResolvedValue(false),
};
