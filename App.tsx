import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from 'react-query';
import AppNavigator from './src/navigation/AppNavigator';
import * as SplashScreen from 'expo-splash-screen';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { View } from 'react-native';
import { appStyles } from './src/styles/appStyles';
import { Ionicons } from '@expo/vector-icons';

// Prevent auto-hide of splash screen
SplashScreen.preventAutoHideAsync().catch(() => {});

const queryClient = new QueryClient();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load assets, make any API calls here
        await Asset.loadAsync([require('./assets/icon.png')]);

        // Load fonts
        await Font.loadAsync({
          ...Ionicons.font,
        });

        // Artificially delay for development mode testing
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  useEffect(() => {
    if (appIsReady) {
      // If app is ready, hide the splash screen
      SplashScreen.hideAsync().catch(e => {
        console.log('Error hiding splash screen:', e);
      });
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return <View />;
  }

  return (
    <GestureHandlerRootView style={appStyles.flexContainer}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
