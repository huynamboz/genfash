import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface RadioProps {
  label: string;
  value: string;
  selected: boolean;
  onPress: () => void;
}

const Radio: React.FC<RadioProps> = ({ label, selected, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} className="flex-row items-center mb-2">
      <View
        className={`w-6 h-6 p-[2px] rounded-full border-2 ${selected ? 'border-blue-500' : 'border-gray-400'} flex items-center justify-center`}
      >
        {selected && <View className="w-full h-full bg-blue-500 rounded-full" />}
      </View>
      <Text className="ml-2 text-gray-900">{label}</Text>
    </TouchableOpacity>
  );
};

interface RadioGroupProps {
  options: { label: string; value: string }[];
  selectedValue: string;
  onValueChange: (value: string) => void;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ options, selectedValue, onValueChange }) => {
  return (
    <View>
      {options.map((option) => (
        <Radio
          key={option.value}
          label={option.label}
          value={option.value}
          selected={selectedValue === option.value}
          onPress={() => onValueChange(option.value)}
        />
      ))}
    </View>
  );
};

export { Radio, RadioGroup };
