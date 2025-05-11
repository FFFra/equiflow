import { useInfiniteQuery, useQuery } from 'react-query';
import { fetchAllCampaigns, fetchCampaignById, fetchCampaignsByPage } from './campaigns';
import { Campaign } from '../types/api/campaign';

/**
 * React Query hook for paginated campaigns
 */
export const usePaginatedCampaigns = () => {
  return useInfiniteQuery('campaigns', ({ pageParam = 1 }) => fetchCampaignsByPage(pageParam), {
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 5 ? allPages.length + 1 : undefined;
    },
  });
};

/**
 * React Query hook for all campaigns (used for filtering locally)
 */
export const useAllCampaigns = () => {
  return useQuery<Campaign[]>('all-campaigns', fetchAllCampaigns);
};

/**
 * React Query hook for a single campaign by ID
 */
export const useCampaign = (id: number) => {
  return useQuery<Campaign>(['campaign', id], () => fetchCampaignById(id), {
    enabled: !!id,
  });
};
