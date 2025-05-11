export interface AuthState {
  isAuthenticated: boolean;
  pin: string | null;
  isBiometricsEnabled: boolean;
  isLoading: boolean;
  setPin: (pin: string) => Promise<void>;
  loginWithPin: (enteredPin: string) => Promise<boolean>;
  enableBiometrics: () => Promise<void>;
  disableBiometrics: () => Promise<void>;
  logout: () => Promise<void>;
  loadStoredAuth: () => Promise<void>;
  checkPinExists: () => Promise<boolean>;
}
