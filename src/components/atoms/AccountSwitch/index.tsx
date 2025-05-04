import React, { Pressable, View } from 'react-native';
import { Avatar } from '../Avatar';
import Text from '../Text';

interface AccountSwitchProps {
  avatar: string;
  name: string;
  active?: boolean;
  onSwitch?: () => void;
}

const AccountSwitch = ({ avatar, name, active, onSwitch }: AccountSwitchProps) => {
  return (
    <Pressable
      onPress={onSwitch}
      className="max-w-[58px] flex-col overflow-hidden items-center gap-[3px]"
    >
      <View
        className={`${active ? 'border-[2px] border-primary-9 p-[2px] rounded-full' : 'px-[5px]'}`}
      >
        <Avatar src={avatar} />
      </View>
      <Text
        numberOfLines={1}
        className={`truncate text-sm md:text-base ${active ? 'text-primary-9 font-semibold ' : ''}`}
      >
        {name}
      </Text>
    </Pressable>
  );
};

export { AccountSwitch, type AccountSwitchProps };
