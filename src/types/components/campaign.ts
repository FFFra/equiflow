import { Campaign } from '../api/campaign';

export interface CampaignCardProps {
  campaign: Campaign;
  onOpenSheet: (campaign: Campaign) => void;
  testID?: string;
}
