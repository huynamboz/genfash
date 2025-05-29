import { PinVerificationScreen } from '@/pages/Auth/PinVerificationScreen';
import { SignInScreen } from '@/pages/Auth/SignInScreen';
import { SignUpScreen } from '@/pages/Auth/SignUpScreen';
import { BoardingScreen } from '@/pages/Boarding/BoardingScreen';
import { CollectionDetailScreen } from '@/pages/Collection/CollectionDetailScreen';
import { CollectionScreen } from '@/pages/Collection/CollectionScreen';
import { CreateScreen } from '@/pages/Create/CreateScreen';
import { ResultGeneratedScreen } from '@/pages/Create/ResultGeneratedScreen';
import { HomeScreen } from '@/pages/Home/HomeScreen';
import { ProfileScreen } from '@/pages/Profile/ProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#0c081c' } }}
    >
      <Stack.Screen name="BoardingScreen" component={BoardingScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="CreateScreen" component={CreateScreen} />
      <Stack.Screen name="ResultGeneratedScreen" component={ResultGeneratedScreen} />
      <Stack.Screen name="CollectionScreen" component={CollectionScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="CollectionDetailScreen" component={CollectionDetailScreen} />

      {/* Screen modal */}
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="PinVerificationScreen" component={PinVerificationScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AppNavigation;
