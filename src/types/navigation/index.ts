import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type AuthStackParamList = {
  LoginScreen: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  CreateScreen:
    | {
        prompt: string;
      }
    | undefined;
  ResultGeneratedScreen: {
    collection_id: string;
    isPublic: boolean;
    style: string;
    description?: string;
    name?: string;
  };
  CollectionScreen: undefined;
  CollectionDetailScreen: {
    collection_id: string;
  };
  SignInScreen: undefined;
  ProfileScreen: undefined;
  UpdateProfileScreen: undefined;
  SignUpScreen: undefined;
  PinVerificationScreen: {
    email: string;
  };
};

// Type for navigation of each Stack
export type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList>;
export type HomeNavigationProp = NativeStackNavigationProp<HomeStackParamList>;

// Type for Tab Navigator
export type RootTabParamList = {
  HomeTab: NavigatorScreenParams<HomeStackParamList>;
};
