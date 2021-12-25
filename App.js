import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { Platform, UIManager } from "react-native";
import { QueryClient, QueryClientProvider } from 'react-query';

import MainStack from './src/navigation/main/main';

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <QueryClientProvider client={queryClient}>
          <MainStack />
        </QueryClientProvider>
      </NavigationContainer>
    </>
  );
}

export default App