import React, { useCallback, useMemo } from 'react';
import { View, Text, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { Campaign } from '../../../types/api/campaign';
import CampaignCard from '../../../components/campaigns/CampaignCard';
import { useCampaignStore } from '../../../store/campaignStore';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useBottomSheet } from '../../../hooks/useBottomSheet';
import { usePaginatedCampaigns } from '../../../api/hooks';
import { UI_CONSTANTS } from '../../../config/constants';
import { useStyles } from './styles';
import CampaignDetailSheet from '../../../components/campaigns/CampaignDetailSheet';
import BottomSheet from '../../../components/common/BottomSheet';

const HomeScreen = () => {
  const styles = useStyles();
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage, refetch, isRefetching } =
    usePaginatedCampaigns();

  const { hiddenCampaignIds } = useCampaignStore();

  const campaigns = useMemo(() => {
    const allCampaigns = data?.pages.flatMap(page => page) ?? [];
    return allCampaigns.filter(campaign => !hiddenCampaignIds.has(campaign.id));
  }, [data, hiddenCampaignIds]);

  const {
    bottomSheetRef,
    data: selectedCampaign,
    openSheet: handleOpenSheet,
    handleSheetClose,
  } = useBottomSheet<Campaign>();

  const snapPoints = useMemo(() => UI_CONSTANTS.BOTTOM_SHEET.SNAP_POINTS.DEFAULT, []);

  const renderItem = useCallback(
    ({ item }: { item: Campaign }) => (
      <CampaignCard campaign={item} onOpenSheet={handleOpenSheet} testID="campaign-card" />
    ),
    [handleOpenSheet]
  );

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading && !data) {
    return (
      <View style={styles.centered} testID="loading-indicator">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <FlatList
        testID="campaigns-flatlist"
        data={campaigns}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator testID="loading-more-indicator" style={styles.loadingIndicator} />
          ) : null
        }
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No campaigns available at the moment.</Text>
        }
      />
      <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints} onClose={handleSheetClose}>
        <CampaignDetailSheet campaign={selectedCampaign} />
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default HomeScreen;
