import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import { useAuthStore } from '../../../store/authStore';
import { mockAuthStore } from './mocks/authStore.mock';
import { mockLocalAuthentication } from './mocks/localAuthentication.mock';
import PinCreateScreen from '../PinCreateScreen/index';

jest.mock('expo-local-authentication', () => mockLocalAuthentication);
jest.mock('../../../store/authStore', () => ({
  useAuthStore: jest.fn(),
}));
jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

describe('PinCreateScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useAuthStore as unknown as jest.Mock).mockReturnValue(mockAuthStore);
  });

  it('renders correctly', () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(<PinCreateScreen />);

    expect(getByTestId('create-pin-title')).toBeTruthy();
    expect(getByPlaceholderText('Enter 4-6 digit PIN')).toBeTruthy();
    expect(getByPlaceholderText('Confirm PIN')).toBeTruthy();
    expect(getByText('Enable Biometric Authentication?')).toBeTruthy();
    expect(getByTestId('create-pin-button')).toBeTruthy();
  });

  it('validates PIN length', async () => {
    const { getByPlaceholderText, getByTestId } = render(<PinCreateScreen />);

    const pinInput = getByPlaceholderText('Enter 4-6 digit PIN');
    const confirmPinInput = getByPlaceholderText('Confirm PIN');

    fireEvent.changeText(pinInput, '123');
    fireEvent.changeText(confirmPinInput, '123');

    const createButton = getByTestId('create-pin-button');
    fireEvent.press(createButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'PIN must be between 4 and 6 digits.');
    });
  });

  it('validates PIN match', async () => {
    const { getByPlaceholderText, getByTestId } = render(<PinCreateScreen />);

    const pinInput = getByPlaceholderText('Enter 4-6 digit PIN');
    const confirmPinInput = getByPlaceholderText('Confirm PIN');

    fireEvent.changeText(pinInput, '1234');
    fireEvent.changeText(confirmPinInput, '5678');

    const createButton = getByTestId('create-pin-button');
    fireEvent.press(createButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'PINs do not match.');
    });
  });

  it('creates PIN successfully without biometrics', async () => {
    const { getByPlaceholderText, getByTestId } = render(<PinCreateScreen />);

    const pinInput = getByPlaceholderText('Enter 4-6 digit PIN');
    const confirmPinInput = getByPlaceholderText('Confirm PIN');

    fireEvent.changeText(pinInput, '1234');
    fireEvent.changeText(confirmPinInput, '1234');

    const createButton = getByTestId('create-pin-button');
    fireEvent.press(createButton);

    await waitFor(() => {
      expect(mockAuthStore.setPin).toHaveBeenCalledWith('1234');
      expect(Alert.alert).toHaveBeenCalledWith('Success', 'PIN created successfully!');
      expect(mockAuthStore.loadStoredAuth).toHaveBeenCalled();
    });
  });

  it('creates PIN with biometrics when available', async () => {
    const { getByPlaceholderText, getByTestId } = render(<PinCreateScreen />);

    const pinInput = getByPlaceholderText('Enter 4-6 digit PIN');
    const confirmPinInput = getByPlaceholderText('Confirm PIN');

    fireEvent.changeText(pinInput, '1234');
    fireEvent.changeText(confirmPinInput, '1234');

    const switchComponent = getByTestId('biometrics-switch');
    fireEvent(switchComponent, 'valueChange', true);

    const createButton = getByTestId('create-pin-button');
    fireEvent.press(createButton);

    await waitFor(() => {
      expect(mockAuthStore.setPin).toHaveBeenCalledWith('1234');
      expect(mockLocalAuthentication.hasHardwareAsync).toHaveBeenCalled();
      expect(mockLocalAuthentication.supportedAuthenticationTypesAsync).toHaveBeenCalled();
      expect(mockLocalAuthentication.isEnrolledAsync).toHaveBeenCalled();
      expect(mockAuthStore.enableBiometrics).toHaveBeenCalled();
      expect(Alert.alert).toHaveBeenCalledWith('Success', 'PIN created and biometrics enabled!');
      expect(mockAuthStore.loadStoredAuth).toHaveBeenCalled();
    });
  });
});
