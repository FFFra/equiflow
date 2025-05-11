export const mockCampaignStore = {
  followedCampaignIds: new Set<number>([1, 2]),
  hiddenCampaignIds: new Set<number>([3, 4]),
  followCampaign: jest.fn(),
  unfollowCampaign: jest.fn(),
  hideCampaign: jest.fn(),
  unhideCampaign: jest.fn(),
  isCampaignFollowed: jest.fn().mockImplementation((id: number) => [1, 2].includes(id)),
  isCampaignHidden: jest.fn().mockImplementation((id: number) => [3, 4].includes(id)),
};

export const mockCampaignStoreEmpty = {
  followedCampaignIds: new Set<number>(),
  hiddenCampaignIds: new Set<number>(),
  followCampaign: jest.fn(),
  unfollowCampaign: jest.fn(),
  hideCampaign: jest.fn(),
  unhideCampaign: jest.fn(),
  isCampaignFollowed: jest.fn().mockReturnValue(false),
  isCampaignHidden: jest.fn().mockReturnValue(false),
};

export const mockCampaignStoreWithFollowed = {
  ...mockCampaignStoreEmpty,
  followedCampaignIds: new Set<number>([1, 2]),
  isCampaignFollowed: jest.fn().mockImplementation((id: number) => [1, 2].includes(id)),
};

export const mockCampaignStoreWithHidden = {
  ...mockCampaignStoreEmpty,
  hiddenCampaignIds: new Set<number>([3, 4]),
  isCampaignHidden: jest.fn().mockImplementation((id: number) => [3, 4].includes(id)),
};
