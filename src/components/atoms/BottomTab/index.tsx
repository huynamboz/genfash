import { HomeNavigationProp } from '@/types/navigation';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { SVGIcon, SVGIconType } from '../Icon';

const BottomTab = () => {
  const route = useRoute();
  const navigation = useNavigation<HomeNavigationProp>();
  const tabs: Array<{ id: SVGIconType; label: string; className: string; routeName: string }> = [
    { id: 'solar_home_2_outline', label: 'Home', className: 'fill-white', routeName: 'HomeScreen' },
    {
      id: 'solar_folder_2_linear',
      label: 'Collection',
      className: 'stroke-white',
      routeName: 'CollectionScreen',
    },
    {
      id: 'solar_user_linear',
      label: 'List',
      className: 'stroke-white',
      routeName: 'ProfileScreen',
    },
  ];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  useFocusEffect(
    React.useCallback(() => {
      const currentRoute = route.name;
      const currentTab = tabs.find((tab) => tab.routeName === currentRoute);
      if (currentTab) {
        setSelectedTab(currentTab);
      }
    }, [route.name]),
  );

  return (
    <View className="absolute flex-row justify-around gap-2 items-center px-2 py-2 bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#1f1f1f] rounded-full">
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          onPress={() => {
            setSelectedTab(tab);
            navigation.navigate(tab.routeName as any);
          }}
          className={`flex-col size-[35px] justify-center items-center ${
            selectedTab.id === tab.id ? 'bg-[#363636] rounded-full' : ''
          }`}
        >
          <SVGIcon name={tab.id} size={18} className={tab.className} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export { BottomTab };
