import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CampaignInteractionState } from '../types/store/campaignStore';
import { STORAGE_KEYS } from '../config/storage';
import { asyncStorageAdapter, setReplacer, setReviver } from '../utils/storage';

export const useCampaignStore = create<CampaignInteractionState>()(
  persist(
    (set, get) => ({
      followedCampaignIds: new Set<number>(),
      hiddenCampaignIds: new Set<number>(),

      followCampaign: id =>
        set(state => ({
          followedCampaignIds: new Set(state.followedCampaignIds).add(id),
        })),

      unfollowCampaign: id =>
        set(state => {
          const newFollowed = new Set(state.followedCampaignIds);
          newFollowed.delete(id);
          return { followedCampaignIds: newFollowed };
        }),

      hideCampaign: id =>
        set(state => ({
          hiddenCampaignIds: new Set(state.hiddenCampaignIds).add(id),
        })),

      unhideCampaign: id =>
        set(state => {
          const newHidden = new Set(state.hiddenCampaignIds);
          newHidden.delete(id);
          return { hiddenCampaignIds: newHidden };
        }),

      isCampaignFollowed: id => get().followedCampaignIds.has(id),
      isCampaignHidden: id => get().hiddenCampaignIds.has(id),
    }),
    {
      name: STORAGE_KEYS.CAMPAIGN_INTERACTIONS,
      storage: createJSONStorage(() => asyncStorageAdapter, {
        replacer: setReplacer,
        reviver: setReviver,
      }),
    }
  )
);
