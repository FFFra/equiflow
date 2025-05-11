export interface CampaignInteractionState {
  followedCampaignIds: Set<number>;
  hiddenCampaignIds: Set<number>;
  followCampaign: (id: number) => void;
  unfollowCampaign: (id: number) => void;
  hideCampaign: (id: number) => void;
  unhideCampaign: (id: number) => void;
  isCampaignFollowed: (id: number) => boolean;
  isCampaignHidden: (id: number) => boolean;
}

export type SerializedSet<T> = {
  dataType: 'Set';
  value: T[];
};
