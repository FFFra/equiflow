import React from 'react';
import { render } from '@testing-library/react-native';
import DiscussionsScreen from '../DiscussionsScreen';

describe('DiscussionsScreen', () => {
  it('renders correctly', () => {
    const { getByText } = render(<DiscussionsScreen />);

    expect(getByText('Discussions')).toBeTruthy();
    expect(getByText('This screen is a placeholder for future discussions content.')).toBeTruthy();
  });
});
