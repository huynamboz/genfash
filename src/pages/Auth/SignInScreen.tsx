// src/screens/SignInScreen.tsx
import { Button } from '@/components/atoms/Button';
import { supabase } from '@/libs/supabase';
import { useAuthStore } from '@/stores/auth';
import { HomeNavigationProp } from '@/types/navigation';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignInScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<HomeNavigationProp>();
  const [loading, setLoading] = useState(false);
  const { setSession } = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  async function signInWithEmail() {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (data && data.session) {
        console.log('Sign in successful:', data);
        setSession(data.session);
        navigation.goBack();
      }
      if (error) {
        console.error('Error signing in:', error.message);
        setError(error.message);
      }
    } catch (error) {
      console.error('Error signing in:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <LinearGradient colors={['#1e3a8a', '#3b82f6']} className="absolute inset-0 opacity-50" />
      <View className="justify-center flex-1 px-6">
        <Text className="mb-10 text-4xl font-extrabold tracking-tight text-center ">
          Welcome Back
        </Text>
        <View className="p-6 shadow-xl bg-white/10 backdrop-blur-lg rounded-2xl">
          <TextInput
            className="p-4 mb-4  placeholder-gray-400 border border-gray-600 bg-gray-800/50 rounded-xl"
            placeholder="Email"
            placeholderTextColor="#9ca3af"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            className="p-4 mb-1  placeholder-gray-400 border border-gray-600 bg-gray-800/50 rounded-xl"
            placeholder="Password"
            placeholderTextColor="#9ca3af"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />
          {/* Error */}
          <Text>
            {error && <Text className="mt-2 text-sm font-medium text-red-500">{error}</Text>}
          </Text>
          <Button
            disabled={loading}
            text="Sign In"
            onPress={() => {
              signInWithEmail();
            }}
            className="py-3 mt-5 text-lg font-semibold  bg-blue-600 rounded-xl"
          />
        </View>
        <TouchableOpacity className="items-center mt-6" onPress={() => navigation.goBack()}>
          <Text className="text-base font-medium text-blue-300">Back to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export { SignInScreen };
