import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PinCreateScreen from '../screens/auth/PinCreateScreen';
import PinLoginScreen from '../screens/auth/PinLoginScreen';
import { AuthStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PinCreate" component={PinCreateScreen} />
      <Stack.Screen name="PinLogin" component={PinLoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
