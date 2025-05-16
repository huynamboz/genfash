import { BoardingScreen } from '@/pages/Boarding/BoardingScreen';
import { CollectionScreen } from '@/pages/Collection/CollectionScreen';
import { CreateScreen } from '@/pages/Create/CreateScreen';
import { ResultGeneratedScreen } from '@/pages/Create/ResultGeneratedScreen';
import { HomeScreen } from '@/pages/Home/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
// import AuthNavigvation from './AuthNavigvation';
// import TabNavigation from './TabNavigation';

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
    </Stack.Navigator>
  );
};

export default AppNavigation;
