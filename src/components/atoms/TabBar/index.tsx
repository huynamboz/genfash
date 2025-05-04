import Text from '@/components/atoms/Text';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

interface InviteTabBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: string[];
}

const InviteTabBar: React.FC<InviteTabBarProps> = ({ activeTab, setActiveTab, tabs }) => {
  return (
    <View className="mt-6 mx-6 flex-row bg-neutral-alpha-4 rounded-[12px]">
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          className={`flex-1 py-2 px-[10px] ${
            activeTab === tab ? 'bg-white rounded-[12px] border border-neutral-alpha-4' : ''
          }`}
          onPress={() => setActiveTab(tab)}
        >
          <Text className="text-center text-[16px] font-[500px]" i18nKey={tab} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default InviteTabBar;
