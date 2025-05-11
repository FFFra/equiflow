import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { styles } from './styles';

const NotificationsScreen = () => {
  const handleRequestPermissions = async () => {
    Alert.alert('Permissions', 'Push notification permission handling would be implemented here.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <Text>This screen is a placeholder for notifications content.</Text>
      <Text style={styles.info}>
        The optional feature to enable push notifications would be here.
      </Text>
      <Button title="Enable Push Notifications" onPress={handleRequestPermissions} />
    </View>
  );
};

export default NotificationsScreen;
