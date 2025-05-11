import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Switch } from 'react-native';
import { useAuthStore } from '../../../store/authStore';
import * as LocalAuthentication from 'expo-local-authentication';
import { styles } from './styles';

const PinCreateScreen = () => {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [enableBiometrics, setEnableBiometrics] = useState(false);
  const {
    setPin: savePin,
    enableBiometrics: saveBiometricsPreference,
    loadStoredAuth,
  } = useAuthStore();

  const handleCreatePin = async () => {
    if (pin.length < 4 || pin.length > 6) {
      Alert.alert('Error', 'PIN must be between 4 and 6 digits.');
      return;
    }
    if (pin !== confirmPin) {
      Alert.alert('Error', 'PINs do not match.');
      return;
    }

    await savePin(pin);
    if (enableBiometrics) {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();

      if (hasHardware && supportedTypes.length > 0 && isEnrolled) {
        await saveBiometricsPreference();
        Alert.alert('Success', 'PIN created and biometrics enabled!');
      } else {
        Alert.alert('Info', 'PIN created. Biometrics not available or not set up on this device.');
      }
    } else {
      Alert.alert('Success', 'PIN created successfully!');
    }
    await loadStoredAuth();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} testID="create-pin-title">
        Create PIN
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter 4-6 digit PIN"
        keyboardType="numeric"
        secureTextEntry
        maxLength={6}
        value={pin}
        onChangeText={setPin}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm PIN"
        keyboardType="numeric"
        secureTextEntry
        maxLength={6}
        value={confirmPin}
        onChangeText={setConfirmPin}
      />
      <View style={styles.switchContainer}>
        <Text>Enable Biometric Authentication?</Text>
        <Switch
          value={enableBiometrics}
          onValueChange={setEnableBiometrics}
          testID="biometrics-switch"
        />
      </View>
      <Button title="Create PIN" onPress={handleCreatePin} testID="create-pin-button" />
    </View>
  );
};

export default PinCreateScreen;
