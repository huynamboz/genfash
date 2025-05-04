// @@iconify-code-gen
import { ConfirmDialogProvider } from '@/components/atoms/ConfirmDialog';
import AppNavigation from '@/navigation/AppNavigation';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import './global.css';

// Settings.setAppID(FACEBOOK_APP_ID);

const App = () => {
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <ConfirmDialogProvider>
          <AppNavigation />
        </ConfirmDialogProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
