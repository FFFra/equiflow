import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { useCampaignStore } from '../../../store/campaignStore';
import { useAllCampaigns } from '../../../api/hooks';
import HiddenCampaignsScreen from '../HiddenCampaignsScreen';
import { mockCampaignStoreWithHidden } from './mocks/campaignStore.mock';
import { mockUseAllCampaigns } from './mocks/hooks.mock';
import MockCampaignCard from './mocks/campaignCard.mock';

jest.mock('../../../store/campaignStore', () => ({
  useCampaignStore: jest.fn(),
}));

jest.mock('../../../api/hooks', () => ({
  useAllCampaigns: jest.fn(),
}));

jest.mock('../../../components/campaigns/CampaignCard', () => {
  return jest.fn().mockImplementation(props => <MockCampaignCard {...props} />);
});

describe('HiddenCampaignsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useCampaignStore as jest.MockedFunction<typeof useCampaignStore>).mockReturnValue(
      mockCampaignStoreWithHidden
    );
    (useAllCampaigns as jest.MockedFunction<typeof useAllCampaigns>).mockReturnValue(
      mockUseAllCampaigns
    );
  });

  it('renders correctly with hidden campaigns', () => {
    const { getByText } = render(<HiddenCampaignsScreen />);

    expect(getByText('Test Campaign 3')).toBeTruthy();
    expect(getByText('Test Campaign 4')).toBeTruthy();
  });

  it('shows empty state when no hidden campaigns', () => {
    (useCampaignStore as jest.MockedFunction<typeof useCampaignStore>).mockReturnValue({
      ...mockCampaignStoreWithHidden,
      hiddenCampaignIds: new Set(),
    });

    const { getByText } = render(<HiddenCampaignsScreen />);

    expect(getByText("You haven't hidden any campaigns yet.")).toBeTruthy();
  });

  it('unhides a campaign when unhide button is pressed', () => {
    const { getAllByTestId } = render(<HiddenCampaignsScreen />);

    const unhideButton = getAllByTestId('unhide-button-3')[0];
    fireEvent.press(unhideButton);

    expect(mockCampaignStoreWithHidden.unhideCampaign).toHaveBeenCalled();
  });
});
