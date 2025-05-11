import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/main/HomeScreen/index';
import FollowedCampaignsScreen from '../screens/main/FollowedCampaignsScreen/index';
import HiddenCampaignsScreen from '../screens/main/HiddenCampaignsScreen/index';
import { useAuthStore } from '../store/authStore';
import { navigationStyles } from './styles';

const InvestStack = createNativeStackNavigator();

const InvestStackNavigator = () => {
  const { logout } = useAuthStore();

  const handleLogout = () => {
    Alert.alert(
      'Debug: Clear App State',
      'This will log you out and return to the login screen. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => logout() },
      ]
    );
  };

  return (
    <InvestStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
        },
        headerTintColor: '#333',
      }}
    >
      <InvestStack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation: _navigation }) => ({
          title: 'Campaigns',
          headerRight: () => (
            <View style={navigationStyles.headerButtonsContainer}>
              <TouchableOpacity
                onPress={() => _navigation.navigate('FollowedCampaigns')}
                style={navigationStyles.headerButtonMarginRight15}
              >
                <Ionicons name="bookmark-outline" size={24} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => _navigation.navigate('HiddenCampaigns')}
                style={navigationStyles.headerButtonMarginRight15}
              >
                <Ionicons name="eye-off-outline" size={24} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleLogout}
                style={navigationStyles.headerButtonMarginRight5}
              >
                <Ionicons name="key-outline" size={24} color="#333" />
              </TouchableOpacity>
            </View>
          ),
        })}
      />
      <InvestStack.Screen
        name="FollowedCampaigns"
        component={FollowedCampaignsScreen}
        options={{ title: 'Followed Campaigns' }}
      />
      <InvestStack.Screen
        name="HiddenCampaigns"
        component={HiddenCampaignsScreen}
        options={{ title: 'Hidden Campaigns' }}
      />
    </InvestStack.Navigator>
  );
};

export default InvestStackNavigator;
