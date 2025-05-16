import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type AuthStackParamList = {
  LoginScreen: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  CreateScreen: undefined;
  ResultGeneratedScreen: {
    job_id: string;
  };
  EditProfileScreen: undefined;
  ProfileScreen: undefined;
  SettingScreen: undefined;
  CollectionScreen: undefined;
};

export type SubscriptionStackParamList = {
  SubscriptionScreen: undefined;
};

// Type for navigation of each Stack
export type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList>;
export type HomeNavigationProp = NativeStackNavigationProp<HomeStackParamList>;
export type SubscriptionNavigationProp = NativeStackNavigationProp<SubscriptionStackParamList>;

// Type for Tab Navigator
export type RootTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
};

// Type for navigation of Tab Navigator
// export type RootTabNavigationProp = BottomTabNavigationProp<RootTabParamList>;
