import React, { useCallback } from 'react';
import { View, Text, Image, Alert } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { CampaignCardProps } from '../../../types/components/campaign';
import { useCampaignStore } from '../../../store/campaignStore';
import { calculateDaysLeft } from '../../../utils/date';
import { formatCurrency } from '../../../utils/formatting';
import { impactMedium } from '../../../utils/haptics';
import { ANIMATION_CONSTANTS, GESTURE_CONSTANTS } from '../../../config/constants';
import { useStyles } from './styles';

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, onOpenSheet }) => {
  const styles = useStyles();
  const { followCampaign, unfollowCampaign, hideCampaign, isCampaignFollowed } = useCampaignStore();
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(280);

  const cardScale = useSharedValue(1);
  const rightActionOpacity = useSharedValue(0);
  const leftActionOpacity = useSharedValue(0);

  const isFollowed = isCampaignFollowed(campaign.id);

  const handleHideCampaign = useCallback(
    (id: number) => {
      hideCampaign(id);
      Alert.alert('Hidden', `Campaign "${campaign.name}" has been hidden.`);
    },
    [hideCampaign, campaign.name]
  );

  const toggleFollowStatus = useCallback(
    (id: number) => {
      const currentlyFollowed = isCampaignFollowed(id);
      if (currentlyFollowed) {
        unfollowCampaign(id);
        Alert.alert('Unfollowed', `Campaign "${campaign.name}" has been unfollowed.`);
      } else {
        followCampaign(id);
        Alert.alert('Followed', `Campaign "${campaign.name}" has been followed.`);
      }
      return !currentlyFollowed;
    },
    [followCampaign, unfollowCampaign, isCampaignFollowed, campaign.name]
  );

  const handleOpenDetailSheet = useCallback(() => {
    impactMedium();
    onOpenSheet(campaign);
  }, [campaign, onOpenSheet]);

  const panGesture = Gesture.Pan()
    .activeOffsetX(GESTURE_CONSTANTS.PAN_ACTIVE_OFFSET)
    .onChange(event => {
      translateX.value = event.translationX;

      if (event.translationX > GESTURE_CONSTANTS.OPACITY_THRESHOLD.START) {
        rightActionOpacity.value = Math.min(
          1,
          (event.translationX - GESTURE_CONSTANTS.OPACITY_THRESHOLD.START) /
            GESTURE_CONSTANTS.OPACITY_THRESHOLD.DIVISOR
        );
        leftActionOpacity.value = 0;
      } else if (event.translationX < -GESTURE_CONSTANTS.OPACITY_THRESHOLD.START) {
        leftActionOpacity.value = Math.min(
          1,
          (-event.translationX - GESTURE_CONSTANTS.OPACITY_THRESHOLD.START) /
            GESTURE_CONSTANTS.OPACITY_THRESHOLD.DIVISOR
        );
        rightActionOpacity.value = 0;
      } else {
        rightActionOpacity.value = 0;
        leftActionOpacity.value = 0;
      }
    })
    .onEnd(event => {
      if (event.translationX > GESTURE_CONSTANTS.SWIPE_THRESHOLD.FOLLOW) {
        cardScale.value = withSpring(1.05, ANIMATION_CONSTANTS.SPRING_CONFIG, () => {
          cardScale.value = withSpring(1);
        });
        runOnJS(toggleFollowStatus)(campaign.id);
        translateX.value = withTiming(0, { duration: ANIMATION_CONSTANTS.DURATION.LONG });
        rightActionOpacity.value = withTiming(0, { duration: ANIMATION_CONSTANTS.DURATION.MEDIUM });
      } else if (event.translationX < GESTURE_CONSTANTS.SWIPE_THRESHOLD.HIDE) {
        runOnJS(handleHideCampaign)(campaign.id);
        itemHeight.value = withTiming(0, { duration: ANIMATION_CONSTANTS.DURATION.LONG });
        translateX.value = withTiming(-500, { duration: ANIMATION_CONSTANTS.DURATION.LONG });
        leftActionOpacity.value = withTiming(0, { duration: ANIMATION_CONSTANTS.DURATION.MEDIUM });
      } else {
        translateX.value = withTiming(0, { duration: ANIMATION_CONSTANTS.DURATION.LONG });
        rightActionOpacity.value = withTiming(0, { duration: ANIMATION_CONSTANTS.DURATION.MEDIUM });
        leftActionOpacity.value = withTiming(0, { duration: ANIMATION_CONSTANTS.DURATION.MEDIUM });
      }
    });

  const longPressGesture = Gesture.LongPress()
    .minDuration(GESTURE_CONSTANTS.LONG_PRESS.MIN_DURATION)
    .maxDistance(GESTURE_CONSTANTS.LONG_PRESS.MAX_DISTANCE)
    .onBegin(() => {
      cardScale.value = withTiming(0.97, { duration: ANIMATION_CONSTANTS.DURATION.SHORT });
    })
    .onStart(() => {
      runOnJS(handleOpenDetailSheet)();
    })
    .onFinalize(() => {
      cardScale.value = withTiming(1, { duration: ANIMATION_CONSTANTS.DURATION.MEDIUM });
    });

  const gesture = Gesture.Exclusive(longPressGesture, panGesture);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }, { scale: cardScale.value }] as any,
    height: itemHeight.value,
    opacity: itemHeight.value === 0 ? 0 : 1,
    overflow: 'hidden',
  }));

  const followIndicatorStyle = useAnimatedStyle(() => ({
    opacity: rightActionOpacity.value,
    right: 16,
  }));

  const hideIndicatorStyle = useAnimatedStyle(() => ({
    opacity: leftActionOpacity.value,
    left: 16,
  }));

  return (
    <GestureDetector gesture={gesture}>
      <View style={styles.container}>
        <Animated.View
          style={[styles.actionIndicator, styles.followIndicator, followIndicatorStyle]}
        >
          <Text style={styles.actionText}>{isFollowed ? 'UNFOLLOW' : 'FOLLOW'}</Text>
        </Animated.View>

        <Animated.View style={[styles.actionIndicator, styles.hideIndicator, hideIndicatorStyle]}>
          <Text style={styles.actionText}>HIDE</Text>
        </Animated.View>

        <Animated.View style={[styles.card, animatedStyle]}>
          <Image
            source={{ uri: campaign.cover_image.cropped_location }}
            style={styles.coverImage}
          />
          <View style={styles.logoContainer}>
            <Image source={{ uri: campaign.logo.cropped_location }} style={styles.logo} />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{campaign.name}</Text>
            <Text style={styles.description} numberOfLines={2}>
              {campaign.description}
            </Text>
            <View style={styles.statsContainer}>
              <Text style={styles.statText}>{campaign.percentage_amount_raised}% Raised</Text>
              <Text style={styles.statText}>{calculateDaysLeft(campaign.expires_at)}</Text>
            </View>
            <Text style={styles.valuation}>
              Valuation:{' '}
              {formatCurrency(campaign.pre_money_valuation.amount_in_cents, campaign.currency)}
            </Text>
            {isFollowed && <Text style={styles.followedIndicator}>Following</Text>}
          </View>
        </Animated.View>
      </View>
    </GestureDetector>
  );
};

export default CampaignCard;
