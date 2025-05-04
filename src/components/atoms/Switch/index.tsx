import React from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
}

const Switch: React.FC<SwitchProps> = ({ value, onValueChange, label, disabled }) => {
  const translateX = new Animated.Value(value ? 17 : 0);

  Animated.timing(translateX, {
    toValue: value ? 17 : 0,
    duration: 200,
    useNativeDriver: true,
  }).start();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => onValueChange(!value)}
      className={`flex-row items-center ${disabled ? 'opacity-50' : ''}`}
      disabled={disabled}
    >
      {label && <Text className="mr-2 text-gray-900">{label}</Text>}
      <View
        className={`w-12 h-7 rounded-full pl-[2px] flex-row items-center ${value ? 'bg-blue-500' : 'bg-gray-300'}`}
      >
        <Animated.View
          className="w-6 h-6 bg-white rounded-full shadow-md"
          style={{ transform: [{ translateX }] }}
        />
      </View>
    </TouchableOpacity>
  );
};

export { Switch };
