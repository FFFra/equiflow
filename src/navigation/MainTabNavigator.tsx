import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DiscussionsScreen from '../screens/main/DiscussionsScreen/index';
import NotificationsScreen from '../screens/main/NotificationsScreen/index';
import InvestStackNavigator from './InvestStackNavigator';
import { Ionicons } from '@expo/vector-icons';
import { MainTabParamList } from '../types/navigation';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'InvestStack') {
            iconName = focused ? 'cash' : 'cash-outline';
          } else if (route.name === 'Discussions') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          }
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="InvestStack"
        component={InvestStackNavigator}
        options={{ tabBarLabel: 'Invest' }}
      />
      <Tab.Screen name="Discussions" component={DiscussionsScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
