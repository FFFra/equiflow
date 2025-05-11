import { jest } from '@jest/globals';
import { mockCampaigns } from './campaigns.mock';

// Mock for usePaginatedCampaigns hook
export const mockUsePaginatedCampaigns = {
  data: {
    pages: [mockCampaigns.slice(0, 2), mockCampaigns.slice(2, 4)],
  },
  fetchNextPage: jest.fn(),
  hasNextPage: true,
  isLoading: false,
  isFetchingNextPage: false,
  refetch: jest.fn(),
  isRefetching: false,
  isError: false,
  isIdle: false,
  isLoadingError: false,
  isRefetchError: false,
  isSuccess: true,
  status: 'success',
};

export const mockUsePaginatedCampaignsLoading = {
  ...mockUsePaginatedCampaigns,
  isLoading: true,
  data: undefined,
  status: 'loading',
  isSuccess: false,
};

export const mockUsePaginatedCampaignsEmpty = {
  ...mockUsePaginatedCampaigns,
  data: {
    pages: [],
  },
  hasNextPage: false,
};

export const mockUsePaginatedCampaignsFetching = {
  ...mockUsePaginatedCampaigns,
  isFetchingNextPage: true,
};

// Mock for useAllCampaigns hook
export const mockUseAllCampaigns = {
  data: mockCampaigns,
  isLoading: false,
  error: null,
  refetch: jest.fn(),
  isError: false,
  isIdle: false,
  isLoadingError: false,
  isRefetchError: false,
  isSuccess: true,
  status: 'success',
};

export const mockUseAllCampaignsLoading = {
  data: undefined,
  isLoading: true,
  error: null,
  refetch: jest.fn(),
  isError: false,
  isIdle: false,
  isLoadingError: false,
  isRefetchError: false,
  isSuccess: false,
  status: 'loading',
};

export const mockUseAllCampaignsError = {
  data: undefined,
  isLoading: false,
  error: new Error('Failed to fetch campaigns'),
  refetch: jest.fn(),
  isError: true,
  isIdle: false,
  isLoadingError: false,
  isRefetchError: false,
  isSuccess: false,
  status: 'error',
};

export const mockUseAllCampaignsEmpty = {
  data: [],
  isLoading: false,
  error: null,
  refetch: jest.fn(),
  isError: false,
  isIdle: false,
  isLoadingError: false,
  isRefetchError: false,
  isSuccess: true,
  status: 'success',
};

// Mock for useBottomSheet hook
export const mockUseBottomSheet = {
  bottomSheetRef: { current: { open: jest.fn(), close: jest.fn() } },
  data: null,
  isOpen: false,
  openSheet: jest.fn(),
  closeSheet: jest.fn(),
  handleSheetClose: jest.fn(),
};
