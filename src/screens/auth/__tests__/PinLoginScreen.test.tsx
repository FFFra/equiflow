import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { useAuthStore } from '../../../store/authStore';
import {
  mockAuthStore,
  mockAuthStoreWithBiometrics,
  mockAuthStoreAuthenticated,
  mockAuthStoreLoading,
  mockAuthStoreFailedLogin,
} from './mocks/authStore.mock';
import { mockLocalAuthentication } from './mocks/localAuthentication.mock';
import PinLoginScreen from '../PinLoginScreen/index';

jest.mock('expo-local-authentication', () => mockLocalAuthentication);
jest.mock('../../../store/authStore', () => ({
  useAuthStore: jest.fn(),
}));
jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

describe('PinLoginScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useAuthStore as unknown as jest.Mock).mockReturnValue(mockAuthStore);
  });

  it('renders correctly', () => {
    const { getByText, getByPlaceholderText } = render(<PinLoginScreen />);

    expect(getByText('Enter your PIN')).toBeTruthy();
    expect(getByPlaceholderText('Enter your PIN')).toBeTruthy();
    expect(getByText('Login')).toBeTruthy();
  });

  it('shows loading state', () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue(mockAuthStoreLoading);

    const { getByText } = render(<PinLoginScreen />);

    expect(getByText('Loading...')).toBeTruthy();
  });

  it('shows authenticated state', () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue(mockAuthStoreAuthenticated);

    const { getByText } = render(<PinLoginScreen />);

    expect(getByText('You are already authenticated!')).toBeTruthy();
  });

  it('shows biometric authentication button when available', async () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue(mockAuthStoreWithBiometrics);

    const { findByText } = render(<PinLoginScreen />);

    const biometricButton = await findByText('Use Biometric Authentication');
    expect(biometricButton).toBeTruthy();
  });

  it('handles PIN submission correctly', async () => {
    const { getByPlaceholderText, getByText } = render(<PinLoginScreen />);

    const pinInput = getByPlaceholderText('Enter your PIN');
    fireEvent.changeText(pinInput, '1234');

    const loginButton = getByText('Login');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(mockAuthStore.loginWithPin).toHaveBeenCalledWith('1234');
    });
  });

  it('shows error for short PIN', async () => {
    const { getByPlaceholderText, getByText } = render(<PinLoginScreen />);

    const pinInput = getByPlaceholderText('Enter your PIN');
    fireEvent.changeText(pinInput, '123');

    const loginButton = getByText('Login');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'PIN must be at least 4 digits.');
    });
  });

  it('shows error for invalid PIN', async () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue(mockAuthStoreFailedLogin);

    const { getByPlaceholderText, getByText } = render(<PinLoginScreen />);

    const pinInput = getByPlaceholderText('Enter your PIN');
    fireEvent.changeText(pinInput, '1234');

    const loginButton = getByText('Login');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'Invalid PIN. Please try again.');
    });
  });

  it('attempts biometric authentication on mount when available', async () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue(mockAuthStoreWithBiometrics);

    render(<PinLoginScreen />);

    await waitFor(() => {
      expect(mockLocalAuthentication.authenticateAsync).toHaveBeenCalled();
    });
  });
});
