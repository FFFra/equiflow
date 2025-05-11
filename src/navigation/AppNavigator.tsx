import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStackNavigator from './AuthStackNavigator';
import MainTabNavigator from './MainTabNavigator';
import { useAuthStore } from '../store/authStore';
import { AppStackParamList } from '../types/navigation';

const AppStack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  const { isAuthenticated, isLoading, loadStoredAuth } = useAuthStore();

  useEffect(() => {
    loadStoredAuth();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <AppStack.Screen name="MainApp" component={MainTabNavigator} />
      ) : (
        <AppStack.Screen name="AuthStack" component={AuthStackNavigator} />
      )}
    </AppStack.Navigator>
  );
};

export default AppNavigator;
