import { Avatar } from '@/components/atoms/Avatar';
import { SVGIcon } from '@/components/atoms/Icon';
import { Text } from '@/components/atoms/Text';
import { supabase } from '@/libs/supabase';
import { useAuthStore } from '@/stores/auth';
import { HomeNavigationProp } from '@/types/navigation';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import {
  ArrowRightOnRectangleIcon,
  BellIcon,
  ChevronLeftIcon,
  CurrencyDollarIcon,
  InformationCircleIcon,
} from 'react-native-heroicons/outline';

const ProfileScreen = () => {
  const { user, logOut } = useAuthStore();
  const navigation = useNavigation<HomeNavigationProp>();
  const menuItems = [
    {
      id: 2,
      title: 'Payment History',
      icon: CurrencyDollarIcon,
      onPress: () => console.log('Payment History pressed'),
    },
    {
      id: 3,
      title: 'Notification',
      icon: BellIcon,
      onPress: () => console.log('Notification pressed'),
    },
    {
      id: 4,
      title: 'Help & Support',
      icon: InformationCircleIcon,
      onPress: () => console.log('Help & Support pressed'),
    },
    {
      id: 6,
      title: 'Log Out',
      icon: ArrowRightOnRectangleIcon,
      onPress: () => {
        supabase.auth
          .signOut()
          .then(() => {
            console.log('User logged out');
            logOut();
            navigation.reset({
              index: 0,
              routes: [{ name: 'HomeScreen' }],
            });
          })
          .catch((error) => {
            console.error('Error logging out:', error);
          });
      },
      showChevron: false,
    },
  ];

  return (
    <SafeAreaView className="flex-1">
      {/* Header */}
      <View className="flex-row items-center px-6 py-4">
        <TouchableOpacity className="p-2 -ml-2" onPress={() => navigation.goBack()}>
          <ChevronLeftIcon size={24} color="black" />
        </TouchableOpacity>
        <Text className="ml-4 text-lg font-semibold text-black">Profile</Text>
      </View>

      {/* Profile Section */}
      <View className="items-center py-8">
        <View className="relative">
          <Avatar url={user?.avatar} className="size-24" />
          {/* Online indicator */}
          <View className="absolute w-6 h-6 bg-green-500 border-2 rounded-full bottom-1 right-1 border-slate-900" />
        </View>

        <Text className="mt-4 text-xl font-semibold text-black">{user?.name}</Text>
        <Text className="mt-1 text-sm text-gray-600">{user?.email}</Text>
      </View>

      {/* Menu Items */}
      <View className="flex-1 px-4">
        {menuItems.map((item, index) => {
          const isLast = index === menuItems.length - 1;

          return (
            <TouchableOpacity
              key={item.id}
              onPress={item.onPress}
              className={`flex-row items-center py-4 rounded-full bg-gray-200 mb-2 px-4 ${
                !isLast ? '' : ''
              }`}
            >
              <Text className="flex-1 ml-4 text-base text-black">{item.title}</Text>
              <SVGIcon name="chevron_right" className="fill-black" />
              {/* <IconComponent size={24} color="#9ca3af" />
              {item.showChevron !== false && <ChevronRightIcon size={20} color="#9ca3af" />} */}
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export { ProfileScreen };
