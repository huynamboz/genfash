import { SVGIcon } from '@/components/atoms/Icon';
import { Text } from '@/components/atoms/Text';
import { supabase } from '@/libs/supabase';
import { HomeNavigationProp } from '@/types/navigation';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
} from 'react-native-heroicons/outline';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignInScreen = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    console.log('Sign in successful', data);
    if (error) {
      console.error('Error signing in:', error.message);
      setError(error.message);
    }
    setIsLoading(false);
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Sign in with ${provider}`);
  };

  return (
    <SafeAreaView edges={['bottom']} className="flex-1 bg-slate-900">
      {/* Header */}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-0 z-10 flex-row items-center justify-center right-2 size-12"
          >
            <SVGIcon name="x_01" size={18} className="fill-white" />
          </TouchableOpacity>

          {/* Header with Gradient */}
          <LinearGradient colors={['#1e293b', '#0f172a']} className="px-6 pb-8">
            <View className="items-center">
              <View className="items-center justify-center w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600"></View>
              <Text className="mb-2 text-3xl font-bold text-white">Welcome Back</Text>
              <Text className="text-base text-center text-gray-400">
                Sign in to continue to your account
              </Text>
            </View>
          </LinearGradient>

          {/* Form Section */}
          <View className="flex-1 px-6 py-8">
            {/* Email Input */}
            <View className="mb-6">
              <Text className="mb-2 text-sm font-medium text-gray-300">Email Address</Text>
              <View className="relative">
                <View className="absolute z-10 left-4 top-4">
                  <EnvelopeIcon size={20} color="#9ca3af" />
                </View>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  placeholderTextColor="#6b7280"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="py-4 pl-12 pr-4 text-white border bg-slate-800 rounded-xl border-slate-700 focus:border-blue-500"
                />
              </View>
            </View>

            {/* Password Input */}
            <View className="mb-6">
              <Text className="mb-2 text-sm font-medium text-gray-300">Password</Text>
              <View className="relative">
                <View className="absolute z-10 left-4 top-4">
                  <LockClosedIcon size={20} color="#9ca3af" />
                </View>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Enter your password"
                  placeholderTextColor="#6b7280"
                  secureTextEntry={!showPassword}
                  className="py-4 pl-12 pr-12 text-white border bg-slate-800 rounded-xl border-slate-700 focus:border-blue-500"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4"
                >
                  {showPassword ? (
                    <EyeSlashIcon size={20} color="#9ca3af" />
                  ) : (
                    <EyeIcon size={20} color="#9ca3af" />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {error && <Text className="text-red-500">{error}</Text>}

            {/* Remember Me & Forgot Password */}
            <View className="flex-row items-center justify-end mb-8">
              <TouchableOpacity>
                <Text className="text-sm font-medium text-blue-400">Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            {/* Sign In Button */}
            <TouchableOpacity onPress={handleSignIn} disabled={isLoading} className="mb-6">
              <LinearGradient
                colors={['#3b82f6', '#8b5cf6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.submitButton}
              >
                <Text className="text-lg text-white font-center">
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center mb-6">
              <View className="flex-1 h-px bg-slate-700" />
              <Text className="mx-4 text-sm text-gray-400">Or continue with</Text>
              <View className="flex-1 h-px bg-slate-700" />
            </View>

            {/* Social Login Buttons */}
            <View className="flex-row gap-2 mb-8 space-x-4">
              <TouchableOpacity
                onPress={() => handleSocialLogin('Google')}
                className="items-center flex-1 py-3 border bg-slate-800 border-slate-700 rounded-xl"
              >
                <Text className="font-medium text-white">Google</Text>
              </TouchableOpacity>

              {/* <TouchableOpacity
                onPress={() => handleSocialLogin('Apple')}
                className="items-center flex-1 py-3 border bg-slate-800 border-slate-700 rounded-xl"
              >
                <Text className="font-medium text-white">Apple</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => handleSocialLogin('Facebook')}
                className="items-center flex-1 py-3 border bg-slate-800 border-slate-700 rounded-xl"
              >
                <Text className="font-medium text-white">Facebook</Text>
              </TouchableOpacity> */}
            </View>

            {/* Sign Up Link */}
            <View className="flex-row items-center justify-center">
              <Text className="text-sm text-gray-400">Don&apos;t have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
                <Text className="text-sm font-semibold text-blue-400">Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View className="px-6 pb-20">
            <Text className="text-xs text-center text-gray-500">
              By signing in, you agree to our{' '}
              <Text className="text-blue-400">Terms of Service</Text> and{' '}
              <Text className="text-blue-400">Privacy Policy</Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    borderRadius: 10000,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
});

export { SignInScreen };
