import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { CampaignCardProps } from '../../../../types/components/campaign';

// Simple mock for CampaignCard that doesn't use gestures
const MockCampaignCard: React.FC<CampaignCardProps> = ({ campaign, onOpenSheet, testID }) => {
  return (
    <TouchableOpacity
      testID={testID}
      onPress={() => onOpenSheet(campaign)}
      style={{ padding: 10, margin: 5, backgroundColor: '#f0f0f0', borderRadius: 8 }}
    >
      <Text>{campaign.name}</Text>
      <Text>{campaign.description}</Text>
      <Text>{campaign.percentage_amount_raised}% Raised</Text>
    </TouchableOpacity>
  );
};

export default MockCampaignCard;
