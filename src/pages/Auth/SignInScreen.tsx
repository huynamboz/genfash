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
      <View className="flex-1 justify-center px-6">
        <Text className="text-4xl font-extrabold text-white text-center mb-10 tracking-tight">
          Welcome Back
        </Text>
        <View className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl">
          <TextInput
            className="bg-gray-800/50 border border-gray-600 rounded-xl p-4 mb-4 text-white placeholder-gray-400"
            placeholder="Email"
            placeholderTextColor="#9ca3af"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            className="bg-gray-800/50 border border-gray-600 rounded-xl p-4 mb-1 text-white placeholder-gray-400"
            placeholder="Password"
            placeholderTextColor="#9ca3af"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />
          {/* Error */}
          <Text>
            {error && <Text className="text-red-500 text-sm font-medium mt-2">{error}</Text>}
          </Text>
          <Button
            disabled={loading}
            text="Sign In"
            onPress={() => {
              signInWithEmail();
            }}
            className="bg-blue-600 rounded-xl py-3 mt-5 text-white font-semibold text-lg"
          />
        </View>
        <TouchableOpacity className="mt-6 items-center" onPress={() => navigation.goBack()}>
          <Text className="text-blue-300 text-base font-medium">Back to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export { SignInScreen };
