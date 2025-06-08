import Images from '@/assets/images';
import { FullScreenLoading } from '@/components/atoms/Loading/FullScreenLoading';
import { updateProfile } from '@/services/auth';
import { useAuthStore } from '@/stores/auth';
import { HomeNavigationProp } from '@/types/navigation';
import { uploadToSupabase } from '@/utils/supabase';
import { useNavigation } from '@react-navigation/native';
import type React from 'react';
import { useMemo, useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
  MediaType,
} from 'react-native-image-picker';

export const UpdateProfileScreen = () => {
  const navigation = useNavigation<HomeNavigationProp>();
  const { user, setUser } = useAuthStore();
  const [name, setName] = useState(user?.name);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const displayAvatar = useMemo(() => {
    if (avatar) {
      return { uri: avatar };
    }
    if (user?.avatar) {
      return { uri: user.avatar };
    }
    return Images.defaultAvatar;
  }, [avatar, user?.avatar]);

  const pickImage = async (from: 'camera' | 'gallery') => {
    const options = {
      mediaType: 'photo' as MediaType,
      quality: 0.8,
    };

    const result =
      from === 'camera'
        ? await launchCamera(options as CameraOptions)
        : await launchImageLibrary(options as ImageLibraryOptions);

    if (result.didCancel || !result.assets || result.assets.length === 0) return;

    const imageUri = result.assets[0].uri;

    console.log(imageUri);
    if (!imageUri) return;

    setAvatar(imageUri);
  };

  const handleSave = async () => {
    if (!name?.trim()) {
      Alert.alert('Error', 'Name is required');
      return;
    }

    setIsLoading(true);
    try {
      console.log('avatar', avatar);
      if (avatar) {
        const newAvatar = await uploadToSupabase(avatar);
        if (newAvatar) {
          setAvatar(newAvatar);
        }
      }
      await updateProfile(name?.trim() || '', avatar || '');
      setUser({ name: name?.trim() || '', avatar: avatar || '' });
      Alert.alert('Success', 'Profile updated successfully');
      navigation.goBack();
    } catch {
      Alert.alert('Error', 'Failed to update profile', [
        {
          text: 'OK',
          onPress: () => setIsLoading(false),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarPress = () => {
    Alert.alert('Change Avatar', 'Choose an option', [
      { text: 'Camera', onPress: () => pickImage('camera') },
      { text: 'Gallery', onPress: () => pickImage('gallery') },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FullScreenLoading isVisible={isLoading} />
      <ScrollView className="flex-1 px-6 py-4">
        {/* Header */}
        <View className="mb-8">
          <Text className="text-2xl font-bold text-center text-gray-900">Update Profile</Text>
          <Text className="mt-2 text-center text-gray-600">Update your profile information</Text>
        </View>

        {/* Avatar Section */}
        <View className="items-center mb-8">
          <TouchableOpacity onPress={handleAvatarPress} className="relative" activeOpacity={0.7}>
            <Image
              source={displayAvatar}
              className="border-4 border-gray-200 rounded-full"
              style={{ width: 120, height: 120 }}
              resizeMode="cover"
            />
            <View className="absolute bottom-0 right-0 items-center justify-center w-8 h-8 bg-blue-500 border-2 border-white rounded-full">
              <Text className="text-xs font-bold text-white">✎</Text>
            </View>
          </TouchableOpacity>
          <Text className="mt-3 text-sm text-gray-600">Tap to change avatar</Text>
        </View>

        {/* Form Fields */}
        <View className="space-y-6">
          {/* Name Field */}
          <View>
            <Text className="mb-2 text-base font-medium text-gray-700">Full Name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              // placeholder="Enter your full name"
              placeholderTextColor="#000"
              keyboardType="email-address"
              autoCapitalize="none"
              className="py-4 pl-4 pr-4 text-black bg-gray-100 border rounded-xl border-slate-700 focus:border-blue-500"
            />
          </View>

          {/* Email Field (Read-only for display) */}
          <View>
            <Text className="mb-2 text-base font-medium text-gray-700">Email</Text>
            <View className="px-4 py-4 bg-gray-100 border border-gray-200 rounded-xl">
              <Text className="text-base text-gray-500">{user?.email}</Text>
            </View>
            <Text className="mt-1 text-xs text-gray-500">Email cannot be changed</Text>
          </View>
        </View>
      </ScrollView>

      {/* Save Button - Fixed at bottom */}
      <View className="px-6 py-4 bg-white border-t border-gray-100">
        <TouchableOpacity
          onPress={handleSave}
          disabled={isLoading}
          className={`rounded-xl py-4 items-center ${isLoading ? 'bg-gray-400' : 'bg-blue-500'}`}
          activeOpacity={0.8}
        >
          <Text className="text-lg font-semibold text-white">
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
