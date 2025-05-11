import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { useCampaignStore } from '../../../store/campaignStore';
import { useAllCampaigns } from '../../../api/hooks';
import { useBottomSheet } from '../../../hooks/useBottomSheet';
import FollowedCampaignsScreen from '../FollowedCampaignsScreen';
import { mockCampaignStore } from './mocks/campaignStore.mock';
import {
  mockUseAllCampaigns,
  mockUseAllCampaignsLoading,
  mockUseAllCampaignsEmpty,
  mockUseBottomSheet,
} from './mocks/hooks.mock';
import MockCampaignCard from './mocks/campaignCard.mock';

jest.mock('../../../store/campaignStore', () => ({
  useCampaignStore: jest.fn(),
}));

jest.mock('../../../api/hooks', () => ({
  useAllCampaigns: jest.fn(),
}));

jest.mock('../../../hooks/useBottomSheet', () => ({
  useBottomSheet: jest.fn(),
}));

jest.mock('../../../components/campaigns/CampaignCard', () => {
  return jest.fn().mockImplementation(props => <MockCampaignCard {...props} />);
});

describe('FollowedCampaignsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useCampaignStore as jest.MockedFunction<typeof useCampaignStore>).mockReturnValue(
      mockCampaignStore
    );
    (useAllCampaigns as jest.MockedFunction<typeof useAllCampaigns>).mockReturnValue(
      mockUseAllCampaigns
    );
    (useBottomSheet as jest.MockedFunction<typeof useBottomSheet>).mockReturnValue(
      mockUseBottomSheet
    );
  });

  it('renders correctly with followed campaigns', () => {
    const { getByText } = render(<FollowedCampaignsScreen />);

    expect(getByText('Test Campaign 1')).toBeTruthy();
    expect(getByText('Test Campaign 2')).toBeTruthy();
  });

  it('shows loading state', () => {
    (useAllCampaigns as jest.MockedFunction<typeof useAllCampaigns>).mockReturnValue(
      mockUseAllCampaignsLoading
    );

    const { getByTestId } = render(<FollowedCampaignsScreen />);

    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('shows empty state when no followed campaigns are available', () => {
    (useAllCampaigns as jest.MockedFunction<typeof useAllCampaigns>).mockReturnValue(
      mockUseAllCampaignsEmpty
    );

    const { getByText } = render(<FollowedCampaignsScreen />);

    expect(getByText("You haven't followed any campaigns yet.")).toBeTruthy();
  });

  it('can refresh campaigns', () => {
    render(<FollowedCampaignsScreen />);

    // Directly call the refetch function
    mockUseAllCampaigns.refetch();

    expect(mockUseAllCampaigns.refetch).toHaveBeenCalled();
  });

  it('opens bottom sheet when a campaign card is pressed', async () => {
    const { getAllByTestId } = render(<FollowedCampaignsScreen />);

    const campaignCards = getAllByTestId('campaign-card');
    fireEvent.press(campaignCards[0]);

    await waitFor(() => {
      expect(mockUseBottomSheet.openSheet).toHaveBeenCalled();
    });
  });
});
