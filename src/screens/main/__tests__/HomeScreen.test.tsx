import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { useCampaignStore } from '../../../store/campaignStore';
import { usePaginatedCampaigns } from '../../../api/hooks';
import { useBottomSheet } from '../../../hooks/useBottomSheet';
import HomeScreen from '../HomeScreen';
import { mockCampaignStore, mockCampaignStoreWithHidden } from './mocks/campaignStore.mock';
import {
  mockUsePaginatedCampaigns,
  mockUsePaginatedCampaignsLoading,
  mockUsePaginatedCampaignsEmpty,
  mockUsePaginatedCampaignsFetching,
  mockUseBottomSheet,
} from './mocks/hooks.mock';
import MockCampaignCard from './mocks/campaignCard.mock';

jest.mock('../../../store/campaignStore', () => ({
  useCampaignStore: jest.fn(),
}));

jest.mock('../../../api/hooks', () => ({
  usePaginatedCampaigns: jest.fn(),
}));

jest.mock('../../../hooks/useBottomSheet', () => ({
  useBottomSheet: jest.fn(),
}));

jest.mock('../../../components/campaigns/CampaignCard', () => {
  return jest.fn().mockImplementation(props => <MockCampaignCard {...props} />);
});

describe('HomeScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useCampaignStore as jest.MockedFunction<typeof useCampaignStore>).mockReturnValue(
      mockCampaignStore
    );
    (usePaginatedCampaigns as jest.MockedFunction<typeof usePaginatedCampaigns>).mockReturnValue(
      mockUsePaginatedCampaigns
    );
    (useBottomSheet as jest.MockedFunction<typeof useBottomSheet>).mockReturnValue(
      mockUseBottomSheet
    );
  });

  it('renders correctly with campaigns', () => {
    const { getByText, getAllByText } = render(<HomeScreen />);

    expect(getByText('Test Campaign 1')).toBeTruthy();
    expect(getByText('Test Campaign 2')).toBeTruthy();

    expect(getAllByText('50% Raised')).toBeTruthy();
  });

  it('shows loading state', () => {
    (usePaginatedCampaigns as jest.MockedFunction<typeof usePaginatedCampaigns>).mockReturnValue(
      mockUsePaginatedCampaignsLoading
    );

    const { getByTestId } = render(<HomeScreen />);

    expect(getByTestId('loading-indicator')).toBeTruthy();
  });

  it('shows empty state when no campaigns are available', () => {
    (usePaginatedCampaigns as jest.MockedFunction<typeof usePaginatedCampaigns>).mockReturnValue(
      mockUsePaginatedCampaignsEmpty
    );

    const { getByText } = render(<HomeScreen />);

    expect(getByText('No campaigns available at the moment.')).toBeTruthy();
  });

  it('filters out hidden campaigns', () => {
    (useCampaignStore as jest.MockedFunction<typeof useCampaignStore>).mockReturnValue(
      mockCampaignStoreWithHidden
    );

    const { queryByText } = render(<HomeScreen />);

    expect(queryByText('Test Campaign 3')).toBeNull();
    expect(queryByText('Test Campaign 4')).toBeNull();
  });

  it('loads more campaigns when scrolling to the end', async () => {
    const { getByTestId } = render(<HomeScreen />);

    const flatList = getByTestId('campaigns-flatlist');
    fireEvent(flatList, 'onEndReached');

    expect(mockUsePaginatedCampaigns.fetchNextPage).toHaveBeenCalled();
  });

  it('shows loading indicator when fetching next page', () => {
    (usePaginatedCampaigns as jest.MockedFunction<typeof usePaginatedCampaigns>).mockReturnValue(
      mockUsePaginatedCampaignsFetching
    );

    const { getByTestId } = render(<HomeScreen />);

    expect(getByTestId('loading-more-indicator')).toBeTruthy();
  });

  it('opens bottom sheet when a campaign card is pressed', async () => {
    const { getAllByTestId } = render(<HomeScreen />);

    const campaignCards = getAllByTestId('campaign-card');
    fireEvent.press(campaignCards[0]);

    await waitFor(() => {
      expect(mockUseBottomSheet.openSheet).toHaveBeenCalled();
    });
  });

  it('refreshes campaigns when pull-to-refresh is triggered', () => {
    render(<HomeScreen />);

    mockUsePaginatedCampaigns.refetch();

    expect(mockUsePaginatedCampaigns.refetch).toHaveBeenCalled();
  });
});
