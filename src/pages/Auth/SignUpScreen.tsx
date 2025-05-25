import { SVGIcon } from '@/components/atoms/Icon';
import { FullScreenLoading } from '@/components/atoms/Loading/FullScreenLoading';
import Text from '@/components/atoms/Text';
import { supabase } from '@/libs/supabase';
import { HomeNavigationProp } from '@/types/navigation';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
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
  UserIcon,
} from 'react-native-heroicons/outline';
import LinearGradient from 'react-native-linear-gradient';

const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation<HomeNavigationProp>();
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async () => {
    navigation.navigate('PinVerificationScreen', {
      email: email,
    });
    setError(null); // Reset error state
    if (!name || !email || !password || !confirmPassword) {
      console.log('Please fill all fields');
      return;
    }

    if (password !== confirmPassword) {
      console.log('Passwords do not match');
      return;
    }

    setIsLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name,
        },
      },
    });
    console.log('Sign up successful', data);
    navigation.navigate('PinVerificationScreen', {
      email: email,
    });
    if (error) {
      console.error('Error signing up:', error.message);
      setError(error.message);
    }
    setIsLoading(false);
  };

  const handleSocialSignUp = (provider: string) => {
    console.log(`Sign up with ${provider}`);
  };

  const getPasswordStrength = () => {
    if (password.length === 0) return { strength: 0, text: '', color: '' };
    if (password.length < 6) return { strength: 1, text: 'Weak', color: 'text-red-400' };
    if (password.length < 8) return { strength: 2, text: 'Fair', color: 'text-yellow-400' };
    if (password.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return { strength: 3, text: 'Strong', color: 'text-green-400' };
    }
    return { strength: 2, text: 'Good', color: 'text-blue-400' };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <FullScreenLoading isVisible={isLoading} />
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />

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
          <LinearGradient colors={['#1e293b', '#0f172a']} className="px-6 pt-12 pb-8">
            <View className="items-center">
              <View className="items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-600"></View>
              <Text className="mb-2 text-3xl font-bold text-white">Create Account</Text>
              <Text className="text-base text-center text-gray-400">
                Join us and start your journey today
              </Text>
            </View>
          </LinearGradient>

          {/* Form Section */}
          <View className="flex-1 px-6 py-8">
            {/* Name Input */}
            <View className="mb-6">
              <Text className="mb-2 text-sm font-medium text-gray-300">Full Name</Text>
              <View className="relative">
                <View className="absolute z-10 left-4 top-4">
                  <UserIcon size={20} color="#9ca3af" />
                </View>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter your full name"
                  placeholderTextColor="#6b7280"
                  autoCapitalize="words"
                  className="py-4 pl-12 pr-4 text-white border bg-slate-800 rounded-xl border-slate-700 focus:border-purple-500"
                />
              </View>
            </View>

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
                  className="py-4 pl-12 pr-4 text-white border bg-slate-800 rounded-xl border-slate-700 focus:border-purple-500"
                />
              </View>
            </View>

            {/* Password Input */}
            <View className="mb-4">
              <Text className="mb-2 text-sm font-medium text-gray-300">Password</Text>
              <View className="relative">
                <View className="absolute z-10 left-4 top-4">
                  <LockClosedIcon size={20} color="#9ca3af" />
                </View>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Create a password"
                  placeholderTextColor="#6b7280"
                  secureTextEntry={!showPassword}
                  className="py-4 pl-12 pr-12 text-white border bg-slate-800 rounded-xl border-slate-700 focus:border-purple-500"
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

            {/* Password Strength Indicator */}
            {password.length > 0 && (
              <View className="mb-6">
                <View className="flex-row items-center mb-2">
                  <Text className="mr-2 text-xs text-gray-400">Password strength:</Text>
                  <Text className={`text-xs font-medium ${passwordStrength.color}`}>
                    {passwordStrength.text}
                  </Text>
                </View>
                <View className="flex-row space-x-1">
                  {[1, 2, 3].map((level) => (
                    <View
                      key={level}
                      className={`flex-1 h-1 rounded ${
                        level <= passwordStrength.strength
                          ? level === 1
                            ? 'bg-red-400'
                            : level === 2
                              ? 'bg-yellow'
                              : 'bg-green-400'
                          : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </View>
              </View>
            )}

            {/* Confirm Password Input */}
            <View className="mb-6">
              <Text className="mb-2 text-sm font-medium text-gray-300">Confirm Password</Text>
              <View className="relative">
                <View className="absolute z-10 left-4 top-4">
                  <LockClosedIcon size={20} color="#9ca3af" />
                </View>
                <TextInput
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirm your password"
                  placeholderTextColor="#6b7280"
                  secureTextEntry={!showConfirmPassword}
                  className="py-4 pl-12 pr-12 text-white border bg-slate-800 rounded-xl border-slate-700 focus:border-purple-500"
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-4"
                >
                  {showConfirmPassword ? (
                    <EyeSlashIcon size={20} color="#9ca3af" />
                  ) : (
                    <EyeIcon size={20} color="#9ca3af" />
                  )}
                </TouchableOpacity>
              </View>
              {confirmPassword.length > 0 && password !== confirmPassword && (
                <Text className="mt-2 text-xs text-red-400">Passwords do not match</Text>
              )}

              {error && <Text className="mt-2 text-xs !text-red-400">{error}</Text>}
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity onPress={handleSignUp} disabled={isLoading} className="mb-6">
              <LinearGradient
                colors={['#8b5cf6', '#ec4899']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.submitButton}
              >
                <Text className="text-lg font-semibold text-white">
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center mb-6">
              <View className="flex-1 h-px bg-slate-700" />
              <Text className="mx-4 text-sm text-gray-400">Or sign up with</Text>
              <View className="flex-1 h-px bg-slate-700" />
            </View>

            {/* Social Sign Up Buttons */}
            <View className="flex-row mb-8 space-x-4">
              <TouchableOpacity
                onPress={() => handleSocialSignUp('Google')}
                className="items-center flex-1 py-3 border bg-slate-800 border-slate-700 rounded-xl"
              >
                <Text className="font-medium text-white">Google</Text>
              </TouchableOpacity>
            </View>

            {/* Sign In Link */}
            <View className="flex-row items-center justify-center pb-20">
              <Text className="text-sm text-gray-400">Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text className="text-sm font-semibold text-purple-400">Sign In</Text>
              </TouchableOpacity>
            </View>
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

export { SignUpScreen };
