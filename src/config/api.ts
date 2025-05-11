import { Platform } from 'react-native';

export const API_CONFIG = {
  BASE_URL: Platform.OS === 'android' ? 'http://10.0.2.2:3000' : 'http://localhost:3000',
  ENDPOINTS: {
    AUTH: '/auth/login',
    CAMPAIGNS: '/api/campaigns',
    FOLLOW_CAMPAIGN: (id: number) => `/api/campaigns/${id}/follow`,
    UNFOLLOW_CAMPAIGN: (id: number) => `/api/campaigns/${id}/unfollow`,
  },
  DEFAULT_PAGE_SIZE: 5,
};
