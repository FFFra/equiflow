import { API_CONFIG } from '../config/api';
import { Campaign } from '../types/api/campaign';

/**
 * Fetch campaigns with pagination
 * @param page Page number to fetch (starts at 1)
 * @param limit Number of campaigns per page
 * @returns Promise with campaigns data
 */
export const fetchCampaignsByPage = async (
  page = 1,
  limit = API_CONFIG.DEFAULT_PAGE_SIZE
): Promise<Campaign[]> => {
  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CAMPAIGNS}?_page=${page}&_limit=${limit}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Network response was not ok (${response.status})`);
  }

  return response.json();
};

/**
 * Fetch all campaigns without pagination
 * @returns Promise with all campaigns data
 */
export const fetchAllCampaigns = async (): Promise<Campaign[]> => {
  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CAMPAIGNS}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Network response was not ok (${response.status})`);
  }

  return response.json();
};

/**
 * Fetch a single campaign by ID
 * @param id Campaign ID
 * @returns Promise with campaign data
 */
export const fetchCampaignById = async (id: number): Promise<Campaign> => {
  const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CAMPAIGNS}/${id}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Campaign not found (${response.status})`);
  }

  return response.json();
};
