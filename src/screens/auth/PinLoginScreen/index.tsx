import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, AppState } from 'react-native';
import { useAuthStore } from '../../../store/authStore';
import * as LocalAuthentication from 'expo-local-authentication';
import { styles } from './styles';

const PinLoginScreen = () => {
  const [pin, setPin] = useState('');
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const {
    loginWithPin,
    isBiometricsEnabled,
    isLoading,
    isAuthenticated,
    pin: storedPin,
  } = useAuthStore();

  useEffect(() => {
    const checkBiometricAvailability = async () => {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      setBiometricAvailable(hasHardware && isEnrolled);
    };
    checkBiometricAvailability();
  }, []);

  const attemptBiometricAuth = async () => {
    if (biometricAvailable && isBiometricsEnabled && storedPin) {
      try {
        const { success } = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Authenticate to access your account',
          fallbackLabel: 'Use PIN',
        });

        if (success && storedPin) {
          await loginWithPin(storedPin);
        }
      } catch (error) {
        console.log('Biometric authentication error:', error);
      }
    }
  };

  useEffect(() => {
    if (biometricAvailable && isBiometricsEnabled && storedPin && !isAuthenticated) {
      attemptBiometricAuth();
    }
  }, [biometricAvailable, isBiometricsEnabled, storedPin, isAuthenticated]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (AppState.currentState.match(/inactive|background/) && nextAppState === 'active') {
        if (!isAuthenticated && biometricAvailable && isBiometricsEnabled && storedPin) {
          attemptBiometricAuth();
        }
      }
    });

    return () => {
      subscription.remove();
    };
  }, [isAuthenticated, biometricAvailable, isBiometricsEnabled, storedPin]);

  const handleAuthenticate = async () => {
    if (pin.length < 4) {
      Alert.alert('Error', 'PIN must be at least 4 digits.');
      return;
    }

    const success = await loginWithPin(pin);
    if (!success) {
      Alert.alert('Error', 'Invalid PIN. Please try again.');
      setPin('');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isAuthenticated) {
    return (
      <View style={styles.container}>
        <Text>You are already authenticated!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter your PIN</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        secureTextEntry
        maxLength={6}
        value={pin}
        onChangeText={setPin}
        placeholder="Enter your PIN"
      />
      <Button title="Login" onPress={handleAuthenticate} />

      {biometricAvailable && isBiometricsEnabled && (
        <Button
          title="Use Biometric Authentication"
          onPress={attemptBiometricAuth}
          color="#3498db"
        />
      )}
    </View>
  );
};

export default PinLoginScreen;
