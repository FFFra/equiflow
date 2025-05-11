import React, { useMemo } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { Campaign } from '../../../types/api/campaign';
import CampaignCard from '../../../components/campaigns/CampaignCard';
import { useCampaignStore } from '../../../store/campaignStore';
import { useBottomSheet } from '../../../hooks/useBottomSheet';
import { useAllCampaigns } from '../../../api/hooks';
import { UI_CONSTANTS } from '../../../config/constants';
import { useStyles } from './styles';
import BottomSheet from '../../../components/common/BottomSheet';
import CampaignDetailSheet from '../../../components/campaigns/CampaignDetailSheet';

const FollowedCampaignsScreen = () => {
  const styles = useStyles();
  const { data: allCampaigns, isLoading, error } = useAllCampaigns();
  const { followedCampaignIds } = useCampaignStore();

  const {
    bottomSheetRef,
    data: selectedCampaign,
    openSheet: handleOpenSheet,
    handleSheetClose,
  } = useBottomSheet<Campaign>();

  const snapPoints = useMemo(() => UI_CONSTANTS.BOTTOM_SHEET.SNAP_POINTS.LIST_SCREENS, []);

  const followedCampaigns = useMemo(() => {
    if (!allCampaigns) return [];
    return allCampaigns.filter(campaign => followedCampaignIds.has(campaign.id));
  }, [allCampaigns, followedCampaignIds]);

  const renderItem = ({ item }: { item: Campaign }) => (
    <CampaignCard campaign={item} onOpenSheet={handleOpenSheet} testID="campaign-card" />
  );

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
        <Text style={styles.errorText}>Error loading followed campaigns.</Text>
      </View>
    );
  }

  if (followedCampaigns.length === 0) {
    return (
      <View style={styles.centered} testID="empty-view">
        <Text style={styles.emptyText}>You haven&apos;t followed any campaigns yet.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        testID="followed-campaigns-list"
        data={followedCampaigns}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
      <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints} onClose={handleSheetClose}>
        <CampaignDetailSheet campaign={selectedCampaign} />
      </BottomSheet>
    </View>
  );
};

export default FollowedCampaignsScreen;
