import { PinInput } from '@/components/atoms/PINInput';
import { supabase } from '@/libs/supabase';
import { HomeNavigationProp, HomeStackParamList } from '@/types/navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  CheckCircleIcon,
  ChevronLeftIcon,
  EnvelopeIcon,
  XCircleIcon,
} from 'react-native-heroicons/outline';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';

const PinVerificationScreen = () => {
  const route = useRoute<RouteProp<HomeStackParamList, 'PinVerificationScreen'>>();
  const navigation = useNavigation<HomeNavigationProp>();
  const { email } = route.params || {}; // Assuming email is passed as a parameter
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    // Start countdown timer
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleVerify = async (pinToVerify: string) => {
    try {
      setIsLoading(true);
      setIsError(false);
      setIsSuccess(false);

      // Simulate API call
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: pinToVerify,
        type: 'email',
      });

      if (error) {
        console.error('Verification failed:', error.message);
        setIsError(true);
        return;
      }

      if (data) {
        setIsSuccess(true);
        // Navigate to next screen or perform further actions
        navigation.reset({
          index: 0,
          routes: [{ name: 'HomeScreen' }], // Adjust this to your home screen
        });

        setTimeout(() => {
          Toast.show({
            type: 'success',
            text1: 'Email Verified',
            text2: "Let's get started!",
          });
        }, 300);
      }
    } catch (error) {
      console.error('Error during verification:', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = () => {
    if (!canResend) return;

    setCanResend(false);
    setResendTimer(60);
    setIsError(false);
    setIsSuccess(false);

    // Restart timer
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        {/* Header */}
        <View className="flex-row items-center px-6 py-4">
          <TouchableOpacity className="p-2 -ml-2" onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size={24} color="white" />
          </TouchableOpacity>
          <Text className="ml-4 text-lg font-semibold text-white">Verify Email</Text>
        </View>

        {/* Content */}
        <View className="flex-1 px-6 py-8">
          {/* Header Section */}
          <View className="items-center mb-4">
            <View className="items-center justify-center w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-600">
              <EnvelopeIcon size={40} color="white" />
            </View>

            <Text className="mb-3 text-2xl font-bold text-center text-white">Check Your Email</Text>

            <Text className="text-base leading-6 text-center text-gray-400">
              We&apos;ve sent a 6-digit verification code to
            </Text>
            <Text className="mt-1 text-base font-medium text-white">{email}</Text>
          </View>

          {/* PIN Input */}
          <View className="mb-8">
            <Text className="mb-4 text-sm font-medium text-center text-gray-300">
              Enter verification code
            </Text>

            <PinInput cellCount={6} onFinish={handleVerify} />
            {/* Status Messages */}
            {isError && (
              <View className="flex-row items-center justify-center mt-4">
                <XCircleIcon size={20} color="#ef4444" />
                <Text className="ml-2 text-sm text-red-400">Invalid code. Please try again.</Text>
              </View>
            )}

            {isSuccess && (
              <View className="flex-row items-center justify-center mt-4">
                <CheckCircleIcon size={20} color="#22c55e" />
                <Text className="ml-2 text-sm text-green-400">Email verified successfully!</Text>
              </View>
            )}

            {isLoading && (
              <Text className="mt-4 text-sm text-center text-blue-400">Verifying code...</Text>
            )}
          </View>

          {/* Verify Button */}
          {/* Sign In Button */}
          <TouchableOpacity onPress={() => {}} disabled={isLoading} className="mb-6">
            <LinearGradient
              colors={['#3b82f6', '#8b5cf6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.submitButton}
            >
              <Text className="text-lg text-white font-center">
                {isLoading ? 'Verifying In...' : 'Verify Email'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          {/* Resend Section */}
          <View className="items-center">
            <Text className="mb-3 text-sm text-gray-400">Didn&apos;t receive the code?</Text>

            {canResend ? (
              <TouchableOpacity onPress={handleResendCode}>
                <Text className="text-sm font-semibold text-blue-400">Resend Code</Text>
              </TouchableOpacity>
            ) : (
              <Text className="text-sm text-gray-500">
                Resend code in {formatTime(resendTimer)}
              </Text>
            )}
          </View>
        </View>

        {/* Footer */}
        <View className="px-6 pb-6">
          <Text className="text-xs text-center text-gray-500">
            Having trouble? Check your spam folder or{' '}
            <Text className="text-blue-400">contact support</Text>
          </Text>
        </View>
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
export { PinVerificationScreen };
