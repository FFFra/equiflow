import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Alert } from 'react-native';
import NotificationsScreen from '../NotificationsScreen';

// Mock Alert
jest.mock('react-native/Libraries/Alert/Alert', () => ({
  alert: jest.fn(),
}));

describe('NotificationsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { getByText } = render(<NotificationsScreen />);

    expect(getByText('Notifications')).toBeTruthy();
    expect(getByText('This screen is a placeholder for notifications content.')).toBeTruthy();
    expect(
      getByText('The optional feature to enable push notifications would be here.')
    ).toBeTruthy();
    expect(getByText('Enable Push Notifications')).toBeTruthy();
  });

  it('shows alert when requesting permissions', () => {
    const { getByText } = render(<NotificationsScreen />);

    const button = getByText('Enable Push Notifications');
    fireEvent.press(button);

    expect(Alert.alert).toHaveBeenCalledWith(
      'Permissions',
      'Push notification permission handling would be implemented here.'
    );
  });
});
