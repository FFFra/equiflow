import React, { useMemo } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useCampaignStore } from '../../../store/campaignStore';
import CampaignCard from '../../../components/campaigns/CampaignCard';
import { useAllCampaigns } from '../../../api/hooks';
import { styles } from './styles';

const HiddenCampaignsScreen = () => {
  const { data: allCampaigns, isLoading, error } = useAllCampaigns();
  const { hiddenCampaignIds, unhideCampaign } = useCampaignStore();

  const hiddenCampaigns = useMemo(() => {
    if (!allCampaigns) return [];
    return allCampaigns.filter(campaign => hiddenCampaignIds.has(campaign.id));
  }, [allCampaigns, hiddenCampaignIds]);

  const handleUnhideCampaign = (id: number) => {
    unhideCampaign(id);
  };

  if (isLoading) {
    return (
      <View style={styles.centered} testID="loading-indicator">
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered} testID="error-view">
        <Text style={styles.errorText}>Error loading hidden campaigns.</Text>
      </View>
    );
  }

  if (hiddenCampaigns.length === 0) {
    return (
      <View style={styles.centered} testID="empty-view">
        <Text style={styles.emptyText}>You haven&apos;t hidden any campaigns yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        testID="hidden-campaigns-list"
        data={hiddenCampaigns}
        renderItem={({ item }) => (
          <View style={styles.itemContainer} testID={`hidden-campaign-${item.id}`}>
            <CampaignCard campaign={item} onOpenSheet={() => {}} testID="campaign-card" />
            <TouchableOpacity
              style={styles.unhideButton}
              onPress={() => handleUnhideCampaign(item.id)}
              testID={`unhide-button-${item.id}`}
            >
              <Text style={styles.unhideButtonText}>Unhide Campaign</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default HiddenCampaignsScreen;
